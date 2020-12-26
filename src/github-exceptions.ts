/* eslint-disable max-classes-per-file */

export class GitHubApiUnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitHubApiUnauthorizedError';
  }
}

export class GitHubApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GitHubApiError';
  }
}
