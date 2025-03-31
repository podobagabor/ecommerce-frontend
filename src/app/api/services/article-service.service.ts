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

import { ArticleRequest } from '../models/article-request';
import { ArticleResponse } from '../models/article-response';


/**
 * REST endpoints for article service
 */
@Injectable({
  providedIn: 'root',
})
export class ArticleServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll3
   */
  static readonly GetAll3Path = '/api/article';

  /**
   * Get all article.
   *
   * Get all article
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll3$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ArticleResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticleServiceService.GetAll3Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ArticleResponse>>;
      })
    );
  }

  /**
   * Get all article.
   *
   * Get all article
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll3(params?: {
    context?: HttpContext
  }
): Observable<Array<ArticleResponse>> {

    return this.getAll3$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleResponse>>) => r.body as Array<ArticleResponse>)
    );
  }

  /**
   * Path part for operation create3
   */
  static readonly Create3Path = '/api/article';

  /**
   * Create a new article.
   *
   * Administrator creates a new article
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create3()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  create3$Response(params?: {
    context?: HttpContext
    body?: ArticleRequest
  }
): Observable<StrictHttpResponse<ArticleResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ArticleServiceService.Create3Path, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ArticleResponse>;
      })
    );
  }

  /**
   * Create a new article.
   *
   * Administrator creates a new article
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create3$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  create3(params?: {
    context?: HttpContext
    body?: ArticleRequest
  }
): Observable<ArticleResponse> {

    return this.create3$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleResponse>) => r.body as ArticleResponse)
    );
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/api/article/{id}';

  /**
   * Get an article.
   *
   * Get an article by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ArticleResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ArticleServiceService.GetPath, 'get');
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
        return r as StrictHttpResponse<ArticleResponse>;
      })
    );
  }

  /**
   * Get an article.
   *
   * Get an article by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ArticleResponse> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleResponse>) => r.body as ArticleResponse)
    );
  }

  /**
   * Path part for operation delete2
   */
  static readonly Delete2Path = '/api/article/{id}';

  /**
   * Delete an article.
   *
   * Administrator can delete an article
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete2()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete2$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArticleServiceService.Delete2Path, 'delete');
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
   * Delete an article.
   *
   * Administrator can delete an article
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete2(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.delete2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
