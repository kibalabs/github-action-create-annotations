/* eslint-disable camelcase */

export interface IAnnotation {
  path: string;
  start_line: string;
  end_line?: string;
  start_column?: string;
  end_column?: string;
  title?: string;
  message: string;
  annotation_level: string;
}

export interface IResult {
  noticeCount: number;
  warningCount: number;
  failureCount: number;
}

export const ANNOTATION_LEVEL_NOTICE = 'notice';
export const ANNOTATION_LEVEL_WARNING = 'warning';
export const ANNOTATION_LEVEL_FAILURE = 'failure';
