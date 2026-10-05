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
