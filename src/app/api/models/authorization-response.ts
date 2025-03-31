/* tslint:disable */
/* eslint-disable */
export interface AuthorizationResponse {
  role?: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MONITORING';
  tokenType?: 'ACCESS_TOKEN' | 'REFRESH_TOKEN' | 'INVALID_TOKEN';
  userId?: string;
}
