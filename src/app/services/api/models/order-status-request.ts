/* tslint:disable */
/* eslint-disable */
export interface OrderStatusRequest {
  orderStatus: 'CREATED' | 'PAYED' | 'PACKAGED' | 'SHIPPING' | 'FINISHED' | 'WAITING_FOR_REFUND' | 'CANCELLED';
}
