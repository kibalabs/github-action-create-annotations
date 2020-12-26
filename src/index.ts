import { promises as fs } from 'fs';

import { getInput, info as logInfo, setFailed } from '@actions/core';
import { getOctokit, context as githubContext } from '@actions/github';
import { createCheck, updateCheck } from './github-checks';
import { ANNOTATION_LEVEL_FAILURE, ANNOTATION_LEVEL_NOTICE, ANNOTATION_LEVEL_WARNING, IAnnotation } from './model';

const generateSummary = function (failureCount: number, warningCount: number, noticeCount: number): string {
  const messages = []
  if (failureCount > 0) {
    messages.push(`${failureCount} failure(s).`)
  }
  if (warningCount > 0) {
    messages.push(`${warningCount} warning(s).`)
  }
  if (noticeCount > 0) {
    messages.push(`${noticeCount} notice(s).`)
  }
  return messages.join(' ');
}

const generateConclusion = function (failureCount: number, warningCount: number, noticeCount: number): string {
  if (failureCount > 0) {
    return 'failure'
  }
  if (warningCount > 0) {
    return 'neutral'
  }
  return 'success'
}

async function run(): Promise<void> {
  try {
    const githubToken: string = getInput('github-token', { required: true });
    const jsonFilePath: string = getInput('json-file-path', { required: true });
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const annotations = JSON.parse(fileContent) as IAnnotation[];
    const octokit = getOctokit(githubToken);

    const pullRequest = githubContext.payload.pull_request;
    let ref;
    if (pullRequest) {
      ref = pullRequest.head.sha;
    } else {
      ref = githubContext.sha;
    }

    const checkRunId = githubContext.runId;
    // const checkRunId = await createCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, title, ref);
    const failureCount = annotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_FAILURE).length;
    const warningCount = annotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_WARNING).length;
    const noticeCount = annotations.filter((annotation: IAnnotation): boolean => annotation.annotation_level === ANNOTATION_LEVEL_NOTICE).length;
    logInfo(`Reporting ${failureCount} failures, ${warningCount} warnings and ${noticeCount} notices`);

    const summary = generateSummary(failureCount, warningCount, noticeCount);
    const conclusion = generateConclusion(failureCount, warningCount, noticeCount);
    const chunkSize = 50;
    for (var index = 0; index < annotations.length; index += chunkSize) {
      const annotationsBatch = annotations.slice(index, index + chunkSize).map((annotation: IAnnotation): IAnnotation => {
        return {
          ...annotation,
          end_line: annotation.end_line || annotation.start_line,
        };
      });
      await updateCheck(octokit, githubContext.repo.owner, githubContext.repo.repo, checkRunId, conclusion, githubContext.job, summary, annotationsBatch);
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();
