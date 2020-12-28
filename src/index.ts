import { promises as fs } from 'fs';
import * as path from 'path';

import { ExitCode, getInput, info as logInfo, setFailed } from '@actions/core';
import { getOctokit, context as githubContext } from '@actions/github';
import { Octokit } from '@octokit/core';

import { createCheck, ICheck, listChecks, updateCheck } from './github-checks';
import { ANNOTATION_LEVEL_FAILURE, ANNOTATION_LEVEL_NOTICE, ANNOTATION_LEVEL_WARNING, IAnnotation, IResult } from './model';

const generateSummary = (failureCount: number, warningCount: number, noticeCount: number): string => {
  const messages = [];
  if (failureCount > 0) {
    messages.push(`${failureCount} failure(s).`);
  }
  if (warningCount > 0) {
    messages.push(`${warningCount} warning(s).`);
  }
  if (noticeCount > 0) {
    messages.push(`${noticeCount} notice(s).`);
  }
  return messages.length > 0 ? messages.join(' ') : 'All good.';
};

const generateConclusion = (failureCount: number, warningCount: number): string => {
  if (failureCount > 0) {
    return 'failure';
  }
  if (warningCount > 0) {
    return 'neutral';
  }
  return 'success';
};

const processAnnotations = async (octokit: Octokit, annotations: IAnnotation[], checkName: string, pathPrefix: string): Promise<IResult> => {
  const cleanedAnnotations = annotations.map((annotation: IAnnotation): IAnnotation => {
    return {
      ...annotation,
      path: path.join(pathPrefix, annotation.path),
    }
  })
  const failureCount = cleanedAnnotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_FAILURE).length;
  const warningCount = cleanedAnnotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_WARNING).length;
  const noticeCount = cleanedAnnotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_NOTICE).length;
  const summary = generateSummary(failureCount, warningCount, noticeCount);
  const conclusion = generateConclusion(failureCount, warningCount);
  logInfo(`Summary: ${summary}`);
  logInfo(`Conclusion: ${conclusion}`);

  const ref = githubContext.payload.pull_request ? githubContext.payload.pull_request.head.sha : githubContext.sha;
  const currentChecks = await listChecks(octokit, githubContext.repo.owner, githubContext.repo.repo, ref);
  let currentCheck = currentChecks.find((check: ICheck): boolean => check.name === checkName);
  if (!currentCheck) {
    currentCheck = await createCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, checkName, ref);
  }

  const updatePromises = [];
  const chunkSize = 50;
  for (let index = 0; index < cleanedAnnotations.length; index += chunkSize) {
    const annotationsBatch = cleanedAnnotations.slice(index, index + chunkSize);
    updatePromises.push(updateCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, currentCheck.id, conclusion, summary, '', annotationsBatch));
  }
  // TODO(krishan711): the above won't run if there are no annotations, figure out how to clean this up.
  if (cleanedAnnotations.length === 0) {
    updatePromises.push(updateCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, currentCheck.id, conclusion, summary, '', []));
  }
  await Promise.all(updatePromises);
  return { failureCount, warningCount, noticeCount };
};

async function run(): Promise<void> {
  try {
    const githubToken: string = getInput('github-token', { required: true });
    const jsonFilePath: string = getInput('json-file-path', { required: true });
    const failOnError: boolean = /^(true|1)$/.test(getInput('fail-on-error', { required: false }));
    const checkName: string = getInput('check-name', { required: false }) || githubContext.job;
    const pathPrefix: string = getInput('path-prefix', { required: false }) || '';
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const annotations = JSON.parse(fileContent) as IAnnotation[];
    const octokit = getOctokit(githubToken);

    const result = await processAnnotations(octokit, annotations, checkName, pathPrefix);
    if (failOnError && result.failureCount > 0) {
      process.exitCode = ExitCode.Failure;
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();
