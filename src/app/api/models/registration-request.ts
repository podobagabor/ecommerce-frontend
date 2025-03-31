/* tslint:disable */
/* eslint-disable */
export interface RegistrationRequest {
  email?: string;
  firstname: string;
  gender?: 'MALE' | 'FEMALE';
  lastname: string;
  password: string;
  phoneNumber: string;
  subscribedToEmail?: boolean;
}
