import { info as logInfo } from '@actions/core';
import { GitHub } from '@actions/github';

import { GitHubApiError, GitHubApiUnauthorizedError } from './github-exceptions';
import { IAnnotation } from './model';

export const createCheck = async (octokit: InstanceType<typeof GitHub>, owner: string, repo: string, name: string, ref: string): Promise<ICheck> => {
  logInfo(`Creating GitHub check in '${owner}/${repo}': ${name}}`);
  try {
    const response = await octokit.checks.create({
      owner,
      repo,
      name,
      head_sha: ref,
      status: 'in_progress',
    });
    return {
      id: response.data.id,
      name: response.data.name,
    };
  } catch (err) {
    if (err.message === 'Resource not accessible by integration') {
      throw new GitHubApiUnauthorizedError(`Unable to create a check, please make sure that the provided 'github-token' has write permissions to '${owner}/${repo}'. Details: ${err}`);
    }
    throw new GitHubApiError(`Unable to create a check to '${owner}/${repo}'. Details: ${err}`);
  }
};

export const updateCheck = async (octokit: InstanceType<typeof GitHub>, owner: string, repo: string, checkRunId: number, conclusion: string, title: string, summary: string, annotations: IAnnotation[]): Promise<void> => {
  logInfo(`Updating GitHub check in '${owner}/${repo}': ${checkRunId}`);
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
        annotations,
      },
    });
  } catch (err) {
    throw new GitHubApiError(`Unable to update check '${owner}/${repo}' check_run_id: ${checkRunId}. Details: ${err}`);
  }
};

export interface ICheck {
  id: number;
  name: string;
}

export const listChecks = async (octokit: InstanceType<typeof GitHub>, owner: string, repo: string, ref: string): Promise<ICheck[]> => {
  logInfo(`Listing GitHub checks in '${owner}/${repo}:${ref}'`);
  try {
    const response = await octokit.checks.listForRef({ owner, repo, ref });
    return response.data.check_runs.map((checkRun: Record<string, unknown>): ICheck => {
      return {
        id: checkRun.id,
        name: checkRun.name,
      };
    });
  } catch (err) {
    throw new GitHubApiError(`Unable to list checks for '${owner}/${repo}:${ref}'. Details: ${err}`);
  }
};
