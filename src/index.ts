import { promises as fs } from 'fs';

import { getInput, info as logInfo, setFailed } from '@actions/core';
import { getOctokit, context as githubContext } from '@actions/github';

async function run(): Promise<void> {
  try {
    const githubToken: string = getInput('github-token', { required: true });
    const jsonFilePath: string = getInput('json-file-path', { required: true });
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const annotations = JSON.parse(fileContent);
    const octokit = getOctokit(githubToken);

    const pullRequest = githubContext.payload.pull_request;
    let ref;
    if (pullRequest) {
      ref = pullRequest.head.sha;
    } else {
      ref = githubContext.sha;
    }
    // const owner = githubContext.repo.owner;
    // const repo = githubContext.repo.repo;
    logInfo(`here: ${jsonFilePath} ${ref} ${JSON.stringify(annotations)} ${octokit}`);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
