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

import { AuthorizationResponse } from '../models/authorization-response';
import { ForgottenPasswordRequest } from '../models/forgotten-password-request';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegistrationRequest } from '../models/registration-request';
import { TokenRequest } from '../models/token-request';


/**
 * REST endpoints for auth service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/api/auth/register';

  /**
   * Registration of new user.
   *
   * Users can register with the required information
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: {
    context?: HttpContext
    body: RegistrationRequest
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthServiceService.RegisterPath, 'post');
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
   * Registration of new user.
   *
   * Users can register with the required information
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: {
    context?: HttpContext
    body: RegistrationRequest
  }
): Observable<void> {

    return this.register$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation refreshToken
   */
  static readonly RefreshTokenPath = '/api/auth/refreshToken';

  /**
   * Refresh access token.
   *
   * Users can refresh their access token with a refresh token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshToken$Response(params: {
    context?: HttpContext
    body: TokenRequest
  }
): Observable<StrictHttpResponse<LoginResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthServiceService.RefreshTokenPath, 'post');
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
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * Refresh access token.
   *
   * Users can refresh their access token with a refresh token
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `refreshToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshToken(params: {
    context?: HttpContext
    body: TokenRequest
  }
): Observable<LoginResponse> {

    return this.refreshToken$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/api/auth/login';

  /**
   * Login with an existing user.
   *
   * Users can login with username and password and get an access token
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    context?: HttpContext
    body: LoginRequest
  }
): Observable<StrictHttpResponse<LoginResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthServiceService.LoginPath, 'post');
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
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * Login with an existing user.
   *
   * Users can login with username and password and get an access token
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    context?: HttpContext
    body: LoginRequest
  }
): Observable<LoginResponse> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse)
    );
  }

  /**
   * Path part for operation forgottenPassword
   */
  static readonly ForgottenPasswordPath = '/api/auth/forgotten/password';

  /**
   * New password request.
   *
   * Users can request a new password if the old is forgotten
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgottenPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgottenPassword$Response(params: {
    context?: HttpContext
    body: ForgottenPasswordRequest
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthServiceService.ForgottenPasswordPath, 'post');
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
   * New password request.
   *
   * Users can request a new password if the old is forgotten
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `forgottenPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgottenPassword(params: {
    context?: HttpContext
    body: ForgottenPasswordRequest
  }
): Observable<void> {

    return this.forgottenPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authorize
   */
  static readonly AuthorizePath = '/api/auth/authorize';

  /**
   * Authorization of an access token.
   *
   * An access token can be authorized, and the user id can be extracted
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authorize()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authorize$Response(params: {
    context?: HttpContext
    body: TokenRequest
  }
): Observable<StrictHttpResponse<AuthorizationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthServiceService.AuthorizePath, 'post');
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
        return r as StrictHttpResponse<AuthorizationResponse>;
      })
    );
  }

  /**
   * Authorization of an access token.
   *
   * An access token can be authorized, and the user id can be extracted
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authorize$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authorize(params: {
    context?: HttpContext
    body: TokenRequest
  }
): Observable<AuthorizationResponse> {

    return this.authorize$Response(params).pipe(
      map((r: StrictHttpResponse<AuthorizationResponse>) => r.body as AuthorizationResponse)
    );
  }

}
