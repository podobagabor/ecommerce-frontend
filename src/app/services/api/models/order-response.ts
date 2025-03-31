/* tslint:disable */
/* eslint-disable */
import { AddressResponse } from './address-response';
import { OrderItemResponse } from './order-item-response';
export interface OrderResponse {
  address?: AddressResponse;
  email?: string;
  id?: string;
  orderDate?: string;
  paymentMethod?: 'STRIPE';
  phoneNumber?: string;
  products?: Array<OrderItemResponse>;
  status?: 'CREATED' | 'PAYED' | 'PACKAGED' | 'SHIPPING' | 'FINISHED' | 'WAITING_FOR_REFUND' | 'CANCELLED';
  totalPrice?: number;
  userId?: string;
}
