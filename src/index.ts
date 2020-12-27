import { promises as fs } from 'fs';

import { getInput, info as logInfo, setFailed } from '@actions/core';
import { getOctokit, context as githubContext } from '@actions/github';

import { createCheck, ICheck, listChecks, updateCheck } from './github-checks';
import { ANNOTATION_LEVEL_FAILURE, ANNOTATION_LEVEL_NOTICE, ANNOTATION_LEVEL_WARNING, IAnnotation } from './model';

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
  return messages.join(' ');
};

const generateConclusion = (failureCount: number, warningCount: number, noticeCount: number): string => {
  if (failureCount > 0) {
    return 'failure';
  }
  if (warningCount > 0 || noticeCount > 0) {
    return 'neutral';
  }
  return 'success';
};

async function run(): Promise<void> {
  try {
    const githubToken: string = getInput('github-token', { required: true });
    const jsonFilePath: string = getInput('json-file-path', { required: true });
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const annotations = JSON.parse(fileContent) as IAnnotation[];
    const octokit = getOctokit(githubToken);

    const failureCount = annotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_FAILURE).length;
    const warningCount = annotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_WARNING).length;
    const noticeCount = annotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_NOTICE).length;
    const summary = generateSummary(failureCount, warningCount, noticeCount);
    const conclusion = generateConclusion(failureCount, warningCount, noticeCount);
    logInfo(`Summary: ${summary}`);
    logInfo(`Conclusion: ${conclusion}`);

    const ref = githubContext.payload.pull_request ? githubContext.payload.pull_request.head.sha : githubContext.sha;
    const currentChecks = await listChecks(octokit, githubContext.repo.owner, githubContext.repo.repo, ref);
    let currentCheck = currentChecks.find((check: ICheck): boolean => check.name === githubContext.job);
    if (!currentCheck) {
      currentCheck = await createCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, githubContext.job, ref);
    }

    const updatePromises = [];
    const chunkSize = 50;
    for (let index = 0; index < annotations.length; index += chunkSize) {
      const annotationsBatch = annotations.slice(index, index + chunkSize);
      updatePromises.push(updateCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, currentCheck.id, conclusion, currentCheck.name, summary, annotationsBatch));
    }
    await Promise.all(updatePromises);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
