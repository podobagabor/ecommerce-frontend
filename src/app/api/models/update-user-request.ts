/* tslint:disable */
/* eslint-disable */
import { AddressRequest } from './address-request';
export interface UpdateUserRequest {
  billingAddress?: AddressRequest;
  email?: string;
  firstname: string;
  gender?: 'MALE' | 'FEMALE';
  lastname: string;
  phoneNumber: string;
  shippingAddress?: AddressRequest;
}
