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

import { AddressRequest } from '../models/address-request';
import { CartItemRequest } from '../models/cart-item-request';
import { CartItemResponse } from '../models/cart-item-response';
import { NewPasswordRequest } from '../models/new-password-request';
import { OrderResponse } from '../models/order-response';
import { ProductResponse } from '../models/product-response';
import { UpdateUserRequest } from '../models/update-user-request';
import { UserResponse } from '../models/user-response';
import { VerificationRequest } from '../models/verification-request';


/**
 * REST endpoints for user service
 */
@Injectable({
  providedIn: 'root',
})
export class UserServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation verify
   */
  static readonly VerifyPath = '/api/user/verify';

  /**
   * Verify an user.
   *
   * After registration users must be verified, with a verification link that is given in an email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verify()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verify$Response(params: {
    context?: HttpContext
    body: VerificationRequest
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.VerifyPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Verify an user.
   *
   * After registration users must be verified, with a verification link that is given in an email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verify$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verify(params: {
    context?: HttpContext
    body: VerificationRequest
  }
): Observable<void> {

    return this.verify$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/api/user/update';

  /**
   * Update user.
   *
   * Update a users email and/or username
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: {
    context?: HttpContext
    body: UpdateUserRequest
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.UpdateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Update user.
   *
   * Update a users email and/or username
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: {
    context?: HttpContext
    body: UpdateUserRequest
  }
): Observable<UserResponse> {

    return this.updateUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation updateCart
   */
  static readonly UpdateCartPath = '/api/user/update/cart';

  /**
   * Update cart products.
   *
   * Update the users cart products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCart$Response(params: {
    context?: HttpContext
    body: Array<CartItemRequest>
  }
): Observable<StrictHttpResponse<Array<CartItemResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.UpdateCartPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CartItemResponse>>;
      })
    );
  }

  /**
   * Update cart products.
   *
   * Update the users cart products
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCart(params: {
    context?: HttpContext
    body: Array<CartItemRequest>
  }
): Observable<Array<CartItemResponse>> {

    return this.updateCart$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CartItemResponse>>) => r.body as Array<CartItemResponse>)
    );
  }

  /**
   * Path part for operation removeSaved
   */
  static readonly RemoveSavedPath = '/api/user/remove/saved';

  /**
   * Remove from saved products.
   *
   * Remove items to users saved products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeSaved()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeSaved$Response(params: {
    context?: HttpContext
    body: Array<string>
  }
): Observable<StrictHttpResponse<Array<ProductResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.RemoveSavedPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductResponse>>;
      })
    );
  }

  /**
   * Remove from saved products.
   *
   * Remove items to users saved products
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `removeSaved$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeSaved(params: {
    context?: HttpContext
    body: Array<string>
  }
): Observable<Array<ProductResponse>> {

    return this.removeSaved$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>) => r.body as Array<ProductResponse>)
    );
  }

  /**
   * Path part for operation newPassword
   */
  static readonly NewPasswordPath = '/api/user/new/password';

  /**
   * Update users password.
   *
   * Update a user password with a new one
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newPassword$Response(params: {
    context?: HttpContext
    body: NewPasswordRequest
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.NewPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Update users password.
   *
   * Update a user password with a new one
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `newPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  newPassword(params: {
    context?: HttpContext
    body: NewPasswordRequest
  }
): Observable<void> {

    return this.newPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addShippingAddress
   */
  static readonly AddShippingAddressPath = '/api/user/address/shipping';

  /**
   * Add shipping address.
   *
   * Add a shipping address to a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addShippingAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addShippingAddress$Response(params: {
    context?: HttpContext
    body: AddressRequest
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.AddShippingAddressPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Add shipping address.
   *
   * Add a shipping address to a user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addShippingAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addShippingAddress(params: {
    context?: HttpContext
    body: AddressRequest
  }
): Observable<UserResponse> {

    return this.addShippingAddress$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation addBillingAddress
   */
  static readonly AddBillingAddressPath = '/api/user/address/billing';

  /**
   * Add billing address.
   *
   * Add a billing address to a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBillingAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBillingAddress$Response(params: {
    context?: HttpContext
    body: AddressRequest
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.AddBillingAddressPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Add billing address.
   *
   * Add a billing address to a user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addBillingAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBillingAddress(params: {
    context?: HttpContext
    body: AddressRequest
  }
): Observable<UserResponse> {

    return this.addBillingAddress$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation addSaved
   */
  static readonly AddSavedPath = '/api/user/add/saved';

  /**
   * Add to saved products.
   *
   * Add items to users saved products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSaved()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSaved$Response(params: {
    context?: HttpContext
    body: Array<string>
  }
): Observable<StrictHttpResponse<Array<ProductResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.AddSavedPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductResponse>>;
      })
    );
  }

  /**
   * Add to saved products.
   *
   * Add items to users saved products
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSaved$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSaved(params: {
    context?: HttpContext
    body: Array<string>
  }
): Observable<Array<ProductResponse>> {

    return this.addSaved$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>) => r.body as Array<ProductResponse>)
    );
  }

  /**
   * Path part for operation getUsers
   */
  static readonly GetUsersPath = '/api/user';

  /**
   * Get users.
   *
   * Users can be retrieved
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<UserResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.GetUsersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserResponse>>;
      })
    );
  }

  /**
   * Get users.
   *
   * Users can be retrieved
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params?: {
    context?: HttpContext
  }
): Observable<Array<UserResponse>> {

    return this.getUsers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserResponse>>) => r.body as Array<UserResponse>)
    );
  }

  /**
   * Path part for operation getUserById
   */
  static readonly GetUserByIdPath = '/api/user/{id}';

  /**
   * Get user.
   *
   * User can be retrieved by an id with an admin
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.GetUserByIdPath, 'get');
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
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Get user.
   *
   * User can be retrieved by an id with an admin
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: {
    id: string;
    context?: HttpContext
  }
): Observable<UserResponse> {

    return this.getUserById$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation unSubscribeToEmailList
   */
  static readonly UnSubscribeToEmailListPath = '/api/user/unsubscribe';

  /**
   * Unsubscribe from email list.
   *
   * User can unsubscribe from email list
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unSubscribeToEmailList()` instead.
   *
   * This method doesn't expect any request body.
   */
  unSubscribeToEmailList$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.UnSubscribeToEmailListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Unsubscribe from email list.
   *
   * User can unsubscribe from email list
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unSubscribeToEmailList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unSubscribeToEmailList(params?: {
    context?: HttpContext
  }
): Observable<UserResponse> {

    return this.unSubscribeToEmailList$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation unSubscribeToEmailListWithId
   */
  static readonly UnSubscribeToEmailListWithIdPath = '/api/user/unsubscribe/{id}';

  /**
   * Unsubscribe from email list with email.
   *
   * User can unsubscribe from email list with email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unSubscribeToEmailListWithId()` instead.
   *
   * This method doesn't expect any request body.
   */
  unSubscribeToEmailListWithId$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.UnSubscribeToEmailListWithIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Unsubscribe from email list with email.
   *
   * User can unsubscribe from email list with email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unSubscribeToEmailListWithId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unSubscribeToEmailListWithId(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.unSubscribeToEmailListWithId$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation subscribeToEmailList
   */
  static readonly SubscribeToEmailListPath = '/api/user/subscribe';

  /**
   * Subscribe to email list.
   *
   * User can subscribe to email list
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscribeToEmailList()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscribeToEmailList$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.SubscribeToEmailListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Subscribe to email list.
   *
   * User can subscribe to email list
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `subscribeToEmailList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscribeToEmailList(params?: {
    context?: HttpContext
  }
): Observable<UserResponse> {

    return this.subscribeToEmailList$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation getSaved
   */
  static readonly GetSavedPath = '/api/user/saved';

  /**
   * Get saved products.
   *
   * Get the users saved products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSaved()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSaved$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ProductResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.GetSavedPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductResponse>>;
      })
    );
  }

  /**
   * Get saved products.
   *
   * Get the users saved products
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSaved$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSaved(params?: {
    context?: HttpContext
  }
): Observable<Array<ProductResponse>> {

    return this.getSaved$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>) => r.body as Array<ProductResponse>)
    );
  }

  /**
   * Path part for operation getOrders
   */
  static readonly GetOrdersPath = '/api/user/order';

  /**
   * Get orders.
   *
   * Get the orders for the user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OrderResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.GetOrdersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OrderResponse>>;
      })
    );
  }

  /**
   * Get orders.
   *
   * Get the orders for the user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders(params?: {
    context?: HttpContext
  }
): Observable<Array<OrderResponse>> {

    return this.getOrders$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OrderResponse>>) => r.body as Array<OrderResponse>)
    );
  }

  /**
   * Path part for operation getCurrentUser
   */
  static readonly GetCurrentUserPath = '/api/user/current';

  /**
   * Get current user.
   *
   * Current user can be retrieved
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.GetCurrentUserPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserResponse>;
      })
    );
  }

  /**
   * Get current user.
   *
   * Current user can be retrieved
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser(params?: {
    context?: HttpContext
  }
): Observable<UserResponse> {

    return this.getCurrentUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserResponse>) => r.body as UserResponse)
    );
  }

  /**
   * Path part for operation getCart
   */
  static readonly GetCartPath = '/api/user/cart';

  /**
   * Get cart products.
   *
   * Get the users cart products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<CartItemResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.GetCartPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CartItemResponse>>;
      })
    );
  }

  /**
   * Get cart products.
   *
   * Get the users cart products
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart(params?: {
    context?: HttpContext
  }
): Observable<Array<CartItemResponse>> {

    return this.getCart$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CartItemResponse>>) => r.body as Array<CartItemResponse>)
    );
  }

  /**
   * Path part for operation deleteUser
   */
  static readonly DeleteUserPath = '/api/user/delete';

  /**
   * Delete user.
   *
   * Delete a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserServiceService.DeleteUserPath, 'delete');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete user.
   *
   * Delete a user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteUser$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
