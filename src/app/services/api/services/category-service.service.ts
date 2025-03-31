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

import { CategoryRequest } from '../models/category-request';
import { CategoryResponse } from '../models/category-response';


/**
 * REST endpoints for category service
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getById2
   */
  static readonly GetById2Path = '/api/category/{id}';

  /**
   * Get a category.
   *
   * Public endpoint returns a category
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById2$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CategoryResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.GetById2Path, 'get');
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
        return r as StrictHttpResponse<CategoryResponse>;
      })
    );
  }

  /**
   * Get a category.
   *
   * Public endpoint returns a category
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById2(params: {
    id: string;
    context?: HttpContext
  }
): Observable<CategoryResponse> {

    return this.getById2$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryResponse>) => r.body as CategoryResponse)
    );
  }

  /**
   * Path part for operation update1
   */
  static readonly Update1Path = '/api/category/{id}';

  /**
   * Update a category.
   *
   * Admins can update a category
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1$Response(params: {
    id: string;
    context?: HttpContext
    body: CategoryRequest
  }
): Observable<StrictHttpResponse<CategoryResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.Update1Path, 'put');
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
        return r as StrictHttpResponse<CategoryResponse>;
      })
    );
  }

  /**
   * Update a category.
   *
   * Admins can update a category
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1(params: {
    id: string;
    context?: HttpContext
    body: CategoryRequest
  }
): Observable<CategoryResponse> {

    return this.update1$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryResponse>) => r.body as CategoryResponse)
    );
  }

  /**
   * Path part for operation delete1
   */
  static readonly Delete1Path = '/api/category/{id}';

  /**
   * Delete a category.
   *
   * Admins can delete a category
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.Delete1Path, 'delete');
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
   * Delete a category.
   *
   * Admins can delete a category
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.delete1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll2
   */
  static readonly GetAll2Path = '/api/category';

  /**
   * Get all category.
   *
   * Public endpoint returns all categories
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll2$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<CategoryResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.GetAll2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryResponse>>;
      })
    );
  }

  /**
   * Get all category.
   *
   * Public endpoint returns all categories
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll2(params?: {
    context?: HttpContext
  }
): Observable<Array<CategoryResponse>> {

    return this.getAll2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryResponse>>) => r.body as Array<CategoryResponse>)
    );
  }

  /**
   * Path part for operation create2
   */
  static readonly Create2Path = '/api/category';

  /**
   * Create a category.
   *
   * Admins can create a category
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create2$Response(params: {
    context?: HttpContext
    body: CategoryRequest
  }
): Observable<StrictHttpResponse<CategoryResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.Create2Path, 'post');
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
        return r as StrictHttpResponse<CategoryResponse>;
      })
    );
  }

  /**
   * Create a category.
   *
   * Admins can create a category
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create2(params: {
    context?: HttpContext
    body: CategoryRequest
  }
): Observable<CategoryResponse> {

    return this.create2$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryResponse>) => r.body as CategoryResponse)
    );
  }

  /**
   * Path part for operation addSubCategory
   */
  static readonly AddSubCategoryPath = '/api/category/subCategory/{id}';

  /**
   * Add a subcategory to a category.
   *
   * Admins can add a subcategory to a category
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSubCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSubCategory$Response(params: {
    id: string;
    context?: HttpContext
    body: CategoryRequest
  }
): Observable<StrictHttpResponse<CategoryResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.AddSubCategoryPath, 'post');
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
        return r as StrictHttpResponse<CategoryResponse>;
      })
    );
  }

  /**
   * Add a subcategory to a category.
   *
   * Admins can add a subcategory to a category
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSubCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSubCategory(params: {
    id: string;
    context?: HttpContext
    body: CategoryRequest
  }
): Observable<CategoryResponse> {

    return this.addSubCategory$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryResponse>) => r.body as CategoryResponse)
    );
  }

  /**
   * Path part for operation deleteSubCategory
   */
  static readonly DeleteSubCategoryPath = '/api/category/subCategory/{id}';

  /**
   * Delete a subcategory.
   *
   * Admins can delete a subcategory
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubCategory$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryServiceService.DeleteSubCategoryPath, 'delete');
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
   * Delete a subcategory.
   *
   * Admins can delete a subcategory
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteSubCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubCategory(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteSubCategory$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
