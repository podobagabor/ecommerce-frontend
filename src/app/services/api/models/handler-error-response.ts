/* tslint:disable */
/* eslint-disable */
import { ResultEntry } from './result-entry';
export interface HandlerErrorResponse {
  error?: Array<ResultEntry>;
  info?: Array<ResultEntry>;
  warning?: Array<ResultEntry>;
}
