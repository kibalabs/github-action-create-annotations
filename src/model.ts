export const ANNOTATION_LEVEL_NOTICE = 'notice';
export const ANNOTATION_LEVEL_WARNING = 'warning';
export const ANNOTATION_LEVEL_FAILURE = 'failure';

export type AnnotationLevel = typeof ANNOTATION_LEVEL_NOTICE | typeof ANNOTATION_LEVEL_WARNING | typeof ANNOTATION_LEVEL_FAILURE;
export type CheckConclusion = 'success' | 'neutral' | 'failure';

export interface IAnnotation {
  path: string;
  start_line: number;
  end_line: number;
  start_column?: number;
  end_column?: number;
  title?: string;
  message: string;
  annotation_level: AnnotationLevel;
}

export interface IResult {
  noticeCount: number;
  warningCount: number;
  failureCount: number;
}
