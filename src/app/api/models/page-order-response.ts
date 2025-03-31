/* tslint:disable */
/* eslint-disable */
import { OrderResponse } from './order-response';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
export interface PageOrderResponse {
  content?: Array<OrderResponse>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
