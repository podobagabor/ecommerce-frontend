/* tslint:disable */
/* eslint-disable */
import { AddressResponse } from './address-response';
import { CartItemResponse } from './cart-item-response';
import { OrderResponse } from './order-response';
import { ProductResponse } from './product-response';
export interface UserResponse {
  billingAddress?: AddressResponse;
  cart?: Array<CartItemResponse>;
  email?: string;
  firstname?: string;
  gender?: 'MALE' | 'FEMALE';
  id?: string;
  lastname?: string;
  orders?: Array<OrderResponse>;
  phoneNumber?: string;
  role?: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MONITORING';
  saved?: Array<ProductResponse>;
  shippingAddress?: AddressResponse;
  subscribedToEmail?: boolean;
  verified?: boolean;
}
