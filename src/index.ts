import { promises as fs } from 'node:fs';
import path from 'node:path';

import { ExitCode, getInput, info as logInfo, setFailed } from '@actions/core';
import { getOctokit, context as githubContext } from '@actions/github';

import { createCheck, findCheck, ICheckOutput, Octokit, updateCheck } from './github-checks';
import { ANNOTATION_LEVEL_FAILURE, ANNOTATION_LEVEL_NOTICE, ANNOTATION_LEVEL_WARNING, CheckConclusion, IAnnotation, IResult } from './model';

const MAX_ANNOTATIONS_PER_REQUEST = 50;

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

const generateConclusion = (failureCount: number, warningCount: number): CheckConclusion => {
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
    };
  });
  const failureCount = cleanedAnnotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_FAILURE).length;
  const warningCount = cleanedAnnotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_WARNING).length;
  const noticeCount = cleanedAnnotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_NOTICE).length;
  const summary = generateSummary(failureCount, warningCount, noticeCount);
  const conclusion = generateConclusion(failureCount, warningCount);
  logInfo(`Summary: ${summary}`);
  logInfo(`Conclusion: ${conclusion}`);

  const annotationBatches: IAnnotation[][] = [];
  for (let index = 0; index < cleanedAnnotations.length; index += MAX_ANNOTATIONS_PER_REQUEST) {
    annotationBatches.push(cleanedAnnotations.slice(index, index + MAX_ANNOTATIONS_PER_REQUEST));
  }
  const [firstAnnotations = [], ...remainingAnnotationBatches] = annotationBatches;
  const buildOutput = (batchAnnotations: IAnnotation[]): ICheckOutput => ({ conclusion, title: summary, summary: '', annotations: batchAnnotations });

  const { owner, repo } = githubContext.repo;
  const ref = githubContext.payload.pull_request ? githubContext.payload.pull_request.head.sha : githubContext.sha;
  const existingCheck = await findCheck(octokit, owner, repo, ref, checkName);
  let checkRunId: number;
  if (existingCheck) {
    checkRunId = existingCheck.id;
    await updateCheck(octokit, owner, repo, checkRunId, buildOutput(firstAnnotations));
  } else {
    checkRunId = (await createCheck(octokit, owner, repo, checkName, ref, buildOutput(firstAnnotations))).id;
  }
  // NOTE(krishan711): each update appends its annotations to the check, so batches go one after another
  await remainingAnnotationBatches.reduce(async (previousUpdate: Promise<void>, batchAnnotations: IAnnotation[]): Promise<void> => {
    await previousUpdate;
    await updateCheck(octokit, owner, repo, checkRunId, buildOutput(batchAnnotations));
  }, Promise.resolve());
  return { failureCount, warningCount, noticeCount };
};

const run = async (): Promise<void> => {
  try {
    const githubToken = getInput('github-token', { required: true });
    const jsonFilePath = getInput('json-file-path', { required: true });
    const failOnError = /^(true|1)$/.test(getInput('fail-on-error', { required: false }));
    const checkName = getInput('check-name', { required: false }) || githubContext.job;
    const pathPrefix = getInput('path-prefix', { required: false }) || '';
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const annotations = JSON.parse(fileContent) as IAnnotation[];
    const octokit = getOctokit(githubToken);
    const result = await processAnnotations(octokit, annotations, checkName, pathPrefix);
    if (failOnError && result.failureCount > 0) {
      process.exitCode = ExitCode.Failure;
    }
  } catch (error) {
    setFailed(error instanceof Error ? error.message : String(error));
  }
};

run();
