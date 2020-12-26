import { info as logInfo } from '@actions/core';
import { GitHub } from '@actions/github';

import { GitHubApiError, GitHubApiUnauthorizedError } from './github-exceptions';
import { IAnnotation } from './model';

export const createCheck = async (octokit: GitHub, owner: string, repo: string, title: string, ref: string): Promise<number> => {
  logInfo(`Creating GitHub check in '${owner}/${repo}': ${title}}`);
  try {
    const check = await octokit.checks.create({
      owner,
      repo,
      name: title,
      head_sha: ref,
      status: 'in_progress',
    });
    return check.data.id;
  } catch (err) {
    if (err.message === 'Resource not accessible by integration') {
      throw new GitHubApiUnauthorizedError(`Unable to create a check, please make sure that the provided 'github-token' has write permissions to '${owner}/${repo}'. Details: ${err}`);
    }
    throw new GitHubApiError(`Unable to create a check to '${owner}/${repo}'. Details: ${err}`);
  }
};

export const updateCheck = async (octokit: GitHub, owner: string, repo: string, checkRunId: number, conclusion: string, title: string, summary: string, annotations: IAnnotation[]): Promise<void> => {
  logInfo(`Updating GitHub check in '${owner}/${repo}': ${title}`);
  try {
    await octokit.checks.update({
      owner,
      repo,
      check_run_id: checkRunId,
      status: 'completed',
      conclusion,
      output: {
        title,
        summary,
        annotations
      }
    })
  } catch (err) {
    throw new GitHubApiError(`Unable to update check '${owner}/${repo}' check_run_id: ${checkRunId}. Details: ${err}`)
  }
}

export interface ICheck {
  id: number;
  name: string;
  status: string;
}

export const listChecks = async (octokit: GitHub, owner: string, repo: string, ref: string): Promise<ICheck[]> => {
  logInfo(`Listing GitHub checks in '${owner}/${repo}:${ref}'`);
  try {
    const checks = await octokit.checks.listForRef({owner, repo, ref});
    return checks.data.checkRuns.map((checkRun: object): ICheck => {
      return {
        id: checkRun.id,
        name: checkRun.name,
        status: checkRun.status,
      };
    });
  } catch (err) {
    throw new GitHubApiError(`Unable to list checks for '${owner}/${repo}:${ref}'. Details: ${err}`)
  }
}
