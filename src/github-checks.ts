import { setTimeout as sleep } from 'node:timers/promises';

import { info as logInfo } from '@actions/core';
import { GitHub } from '@actions/github/lib/utils';

import { GitHubApiError, GitHubApiUnauthorizedError } from './github-exceptions';
import { CheckConclusion, IAnnotation } from './model';

export type Octokit = InstanceType<typeof GitHub>;

export interface ICheck {
  id: number;
  name: string;
}

export interface ICheckOutput {
  conclusion: CheckConclusion;
  title: string;
  summary: string;
  annotations: IAnnotation[];
}

const UPDATE_RETRY_DELAYS_MS = [1000, 2000, 4000];

const getErrorStatus = (error: unknown): number | undefined => {
  return typeof error === 'object' && error !== null && 'status' in error ? Number(error.status) : undefined;
};

export const findCheck = async (octokit: Octokit, owner: string, repo: string, ref: string, name: string): Promise<ICheck | null> => {
  logInfo(`Finding GitHub check '${name}' in '${owner}/${repo}:${ref}'`);
  try {
    const response = await octokit.rest.checks.listForRef({ owner, repo, ref, check_name: name });
    const checkRun = response.data.check_runs[0];
    return checkRun ? { id: checkRun.id, name: checkRun.name } : null;
  } catch (error) {
    throw new GitHubApiError(`Unable to list checks for '${owner}/${repo}:${ref}'. Details: ${error}`);
  }
};

export const createCheck = async (octokit: Octokit, owner: string, repo: string, name: string, ref: string, output: ICheckOutput): Promise<ICheck> => {
  logInfo(`Creating GitHub check in '${owner}/${repo}': ${name}`);
  try {
    const response = await octokit.rest.checks.create({
      owner,
      repo,
      name,
      head_sha: ref,
      status: 'completed',
      conclusion: output.conclusion,
      output: {
        title: output.title,
        summary: output.summary,
        annotations: output.annotations,
      },
    });
    return { id: response.data.id, name: response.data.name };
  } catch (error) {
    if (getErrorStatus(error) === 403) {
      throw new GitHubApiUnauthorizedError(`Unable to create a check, please make sure that the provided 'github-token' has write permissions to '${owner}/${repo}'. Details: ${error}`);
    }
    throw new GitHubApiError(`Unable to create a check to '${owner}/${repo}'. Details: ${error}`);
  }
};

const updateCheckWithRetries = async (octokit: Octokit, owner: string, repo: string, checkRunId: number, output: ICheckOutput, retryDelaysMs: number[]): Promise<void> => {
  try {
    await octokit.rest.checks.update({
      owner,
      repo,
      check_run_id: checkRunId,
      status: 'completed',
      conclusion: output.conclusion,
      output: {
        title: output.title,
        summary: output.summary,
        annotations: output.annotations,
      },
    });
  } catch (error) {
    // NOTE(krishan711): GitHub can return 404 for a check run created moments earlier, so give it time to appear before giving up
    if (getErrorStatus(error) === 404 && retryDelaysMs.length > 0) {
      logInfo(`GitHub check ${checkRunId} not found yet, retrying in ${retryDelaysMs[0]}ms`);
      await sleep(retryDelaysMs[0]);
      await updateCheckWithRetries(octokit, owner, repo, checkRunId, output, retryDelaysMs.slice(1));
      return;
    }
    throw new GitHubApiError(`Unable to update check '${owner}/${repo}' check_run_id: ${checkRunId}. Details: ${error}`);
  }
};

export const updateCheck = async (octokit: Octokit, owner: string, repo: string, checkRunId: number, output: ICheckOutput): Promise<void> => {
  logInfo(`Updating GitHub check in '${owner}/${repo}': ${checkRunId}`);
  await updateCheckWithRetries(octokit, owner, repo, checkRunId, output, UPDATE_RETRY_DELAYS_MS);
};
