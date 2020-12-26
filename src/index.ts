import * as fs from 'fs/promises';
import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const githubToken: string = core.getInput('github-token');
    const jsonFilePath: string = core.getInput('json-file-path');
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const annotations = JSON.parse(fileContent);
    const octokit = github.getOctokit(githubToken);

    const pullRequest = github.context.payload.pull_request;
    let ref;
    if (pullRequest) {
      ref = pullRequest.head.sha;
    } else {
      ref = github.context.sha;
    }
    // const owner = github.context.repo.owner;
    // const repo = github.context.repo.repo;
    core.info(`here: ${jsonFilePath} ${ref} ${annotations} ${octokit}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
