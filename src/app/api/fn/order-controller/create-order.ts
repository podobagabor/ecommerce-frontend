/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderCreateDto } from '../../models/order-create-dto';
import { OrderDto } from '../../models/order-dto';

export interface CreateOrder$Params {
      body: OrderCreateDto
}

export function createOrder(http: HttpClient, rootUrl: string, params: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderDto>> {
  const rb = new RequestBuilder(rootUrl, createOrder.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderDto>;
    })
  );
}

createOrder.PATH = '/api/order/create';
