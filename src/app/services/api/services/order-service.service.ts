/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { OrderResponse } from '../models/order-response';
import { OrderStatusRequest } from '../models/order-status-request';
import { PageOrderResponse } from '../models/page-order-response';
import { PaymentTokenRequest } from '../models/payment-token-request';


/**
 * REST endpoints for order service
 */
@Injectable({
  providedIn: 'root',
})
export class OrderServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation changeOrderStatus
   */
  static readonly ChangeOrderStatusPath = '/api/order/{id}/status';

  /**
   * Update order status.
   *
   * Admins can update order status
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeOrderStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeOrderStatus$Response(params: {
    id: string;
    context?: HttpContext
    body: OrderStatusRequest
  }
): Observable<StrictHttpResponse<OrderResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderServiceService.ChangeOrderStatusPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderResponse>;
      })
    );
  }

  /**
   * Update order status.
   *
   * Admins can update order status
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeOrderStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeOrderStatus(params: {
    id: string;
    context?: HttpContext
    body: OrderStatusRequest
  }
): Observable<OrderResponse> {

    return this.changeOrderStatus$Response(params).pipe(
      map((r: StrictHttpResponse<OrderResponse>) => r.body as OrderResponse)
    );
  }

  /**
   * Path part for operation pay
   */
  static readonly PayPath = '/api/order/{id}/pay';

  /**
   * Pay an order.
   *
   * Users can pay an order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pay()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pay$Response(params: {
    id: string;
    context?: HttpContext
    body: PaymentTokenRequest
  }
): Observable<StrictHttpResponse<OrderResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderServiceService.PayPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderResponse>;
      })
    );
  }

  /**
   * Pay an order.
   *
   * Users can pay an order
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pay$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  pay(params: {
    id: string;
    context?: HttpContext
    body: PaymentTokenRequest
  }
): Observable<OrderResponse> {

    return this.pay$Response(params).pipe(
      map((r: StrictHttpResponse<OrderResponse>) => r.body as OrderResponse)
    );
  }

  /**
   * Path part for operation cancel
   */
  static readonly CancelPath = '/api/order/{id}/cancel';

  /**
   * Cancel an order.
   *
   * Users can cancel an order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancel()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancel$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<OrderResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderServiceService.CancelPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderResponse>;
      })
    );
  }

  /**
   * Cancel an order.
   *
   * Users can cancel an order
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `cancel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancel(params: {
    id: string;
    context?: HttpContext
  }
): Observable<OrderResponse> {

    return this.cancel$Response(params).pipe(
      map((r: StrictHttpResponse<OrderResponse>) => r.body as OrderResponse)
    );
  }

  /**
   * Path part for operation create1
   */
  static readonly Create1Path = '/api/order/create';

  /**
   * Create an order.
   *
   * Users can create an order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create1()` instead.
   *
   * This method doesn't expect any request body.
   */
  create1$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<OrderResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderServiceService.Create1Path, 'post');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderResponse>;
      })
    );
  }

  /**
   * Create an order.
   *
   * Users can create an order
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  create1(params?: {
    context?: HttpContext
  }
): Observable<OrderResponse> {

    return this.create1$Response(params).pipe(
      map((r: StrictHttpResponse<OrderResponse>) => r.body as OrderResponse)
    );
  }

  /**
   * Path part for operation getAll1
   */
  static readonly GetAll1Path = '/api/order';

  /**
   * Get all orders.
   *
   * Admin can get all orders
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll1$Response(params?: {
    minDate?: string;
    maxDate?: string;
    minPrice?: number;
    maxPrice?: number;
    paymentMethods?: Array<'STRIPE'>;
    statuses?: Array<'CREATED' | 'PAYED' | 'PACKAGED' | 'SHIPPING' | 'FINISHED' | 'WAITING_FOR_REFUND' | 'CANCELLED'>;
    sortType?: 'ASC_ORDER_DATE' | 'DESC_ORDER_DATE' | 'ASC_PRICE' | 'DESC_PRICE';
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageOrderResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderServiceService.GetAll1Path, 'get');
    if (params) {
      rb.query('minDate', params.minDate, {});
      rb.query('maxDate', params.maxDate, {});
      rb.query('minPrice', params.minPrice, {});
      rb.query('maxPrice', params.maxPrice, {});
      rb.query('paymentMethods', params.paymentMethods, {});
      rb.query('statuses', params.statuses, {});
      rb.query('sortType', params.sortType, {});
      rb.query('page', params.page, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageOrderResponse>;
      })
    );
  }

  /**
   * Get all orders.
   *
   * Admin can get all orders
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll1(params?: {
    minDate?: string;
    maxDate?: string;
    minPrice?: number;
    maxPrice?: number;
    paymentMethods?: Array<'STRIPE'>;
    statuses?: Array<'CREATED' | 'PAYED' | 'PACKAGED' | 'SHIPPING' | 'FINISHED' | 'WAITING_FOR_REFUND' | 'CANCELLED'>;
    sortType?: 'ASC_ORDER_DATE' | 'DESC_ORDER_DATE' | 'ASC_PRICE' | 'DESC_PRICE';
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageOrderResponse> {

    return this.getAll1$Response(params).pipe(
      map((r: StrictHttpResponse<PageOrderResponse>) => r.body as PageOrderResponse)
    );
  }

  /**
   * Path part for operation getById1
   */
  static readonly GetById1Path = '/api/order/{id}';

  /**
   * Get an order.
   *
   * Admin can get an order by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<OrderResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderServiceService.GetById1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderResponse>;
      })
    );
  }

  /**
   * Get an order.
   *
   * Admin can get an order by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1(params: {
    id: string;
    context?: HttpContext
  }
): Observable<OrderResponse> {

    return this.getById1$Response(params).pipe(
      map((r: StrictHttpResponse<OrderResponse>) => r.body as OrderResponse)
    );
  }

}
