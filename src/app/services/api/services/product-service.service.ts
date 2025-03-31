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

import { BrandResponse } from '../models/brand-response';
import { DiscountRequest } from '../models/discount-request';
import { PageProductResponse } from '../models/page-product-response';
import { ProductRequest } from '../models/product-request';
import { ProductResponse } from '../models/product-response';


/**
 * REST endpoints for product service
 */
@Injectable({
  providedIn: 'root',
})
export class ProductServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getById
   */
  static readonly GetByIdPath = '/api/product/{id}';

  /**
   * Get a products by id.
   *
   * Get a products by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ProductResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.GetByIdPath, 'get');
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
        return r as StrictHttpResponse<ProductResponse>;
      })
    );
  }

  /**
   * Get a products by id.
   *
   * Get a products by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ProductResponse> {

    return this.getById$Response(params).pipe(
      map((r: StrictHttpResponse<ProductResponse>) => r.body as ProductResponse)
    );
  }

  /**
   * Path part for operation update
   */
  static readonly UpdatePath = '/api/product/{id}';

  /**
   * Update a products by id.
   *
   * Update a products by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  update$Response(params: {
    id: string;
    context?: HttpContext
    body?: ProductRequest
  }
): Observable<StrictHttpResponse<ProductResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.UpdatePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductResponse>;
      })
    );
  }

  /**
   * Update a products by id.
   *
   * Update a products by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  update(params: {
    id: string;
    context?: HttpContext
    body?: ProductRequest
  }
): Observable<ProductResponse> {

    return this.update$Response(params).pipe(
      map((r: StrictHttpResponse<ProductResponse>) => r.body as ProductResponse)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/api/product/{id}';

  /**
   * Delete a products by id.
   *
   * Delete a products by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.DeletePath, 'delete');
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
   * Delete a products by id.
   *
   * Delete a products by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/api/product';

  /**
   * Get all products.
   *
   * Get all existing products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll$Response(params?: {
    brands?: Array<string>;
    categories?: Array<string>;
    subCategories?: Array<string>;
    types?: Array<string>;
    maxPrice?: number;
    minPrice?: number;
    maxDiscountPercentage?: number;
    minDiscountPercentage?: number;
    sortType?: 'ASC_PRICE' | 'DESC_PRICE' | 'ASC_DISCOUNT' | 'DESC_DISCOUNT';
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PageProductResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.GetAllPath, 'get');
    if (params) {
      rb.query('brands', params.brands, {});
      rb.query('categories', params.categories, {});
      rb.query('subCategories', params.subCategories, {});
      rb.query('types', params.types, {});
      rb.query('maxPrice', params.maxPrice, {});
      rb.query('minPrice', params.minPrice, {});
      rb.query('maxDiscountPercentage', params.maxDiscountPercentage, {});
      rb.query('minDiscountPercentage', params.minDiscountPercentage, {});
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
        return r as StrictHttpResponse<PageProductResponse>;
      })
    );
  }

  /**
   * Get all products.
   *
   * Get all existing products
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll(params?: {
    brands?: Array<string>;
    categories?: Array<string>;
    subCategories?: Array<string>;
    types?: Array<string>;
    maxPrice?: number;
    minPrice?: number;
    maxDiscountPercentage?: number;
    minDiscountPercentage?: number;
    sortType?: 'ASC_PRICE' | 'DESC_PRICE' | 'ASC_DISCOUNT' | 'DESC_DISCOUNT';
    page?: number;
    size?: number;
    context?: HttpContext
  }
): Observable<PageProductResponse> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<PageProductResponse>) => r.body as PageProductResponse)
    );
  }

  /**
   * Path part for operation create
   */
  static readonly CreatePath = '/api/product';

  /**
   * Create product.
   *
   * Create a new product
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  create$Response(params?: {
    context?: HttpContext
    body?: ProductRequest
  }
): Observable<StrictHttpResponse<ProductResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.CreatePath, 'post');
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
        return r as StrictHttpResponse<ProductResponse>;
      })
    );
  }

  /**
   * Create product.
   *
   * Create a new product
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  create(params?: {
    context?: HttpContext
    body?: ProductRequest
  }
): Observable<ProductResponse> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<ProductResponse>) => r.body as ProductResponse)
    );
  }

  /**
   * Path part for operation setDiscount
   */
  static readonly SetDiscountPath = '/api/product/discount';

  /**
   * Update a products discount by id.
   *
   * Update a products discount by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setDiscount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setDiscount$Response(params: {
    context?: HttpContext
    body: DiscountRequest
  }
): Observable<StrictHttpResponse<ProductResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.SetDiscountPath, 'post');
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
        return r as StrictHttpResponse<ProductResponse>;
      })
    );
  }

  /**
   * Update a products discount by id.
   *
   * Update a products discount by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setDiscount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setDiscount(params: {
    context?: HttpContext
    body: DiscountRequest
  }
): Observable<ProductResponse> {

    return this.setDiscount$Response(params).pipe(
      map((r: StrictHttpResponse<ProductResponse>) => r.body as ProductResponse)
    );
  }

  /**
   * Path part for operation getBrands
   */
  static readonly GetBrandsPath = '/api/product/brand';

  /**
   * Get brands.
   *
   * Public endpoint, return existing brands
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBrands()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBrands$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BrandResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductServiceService.GetBrandsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BrandResponse>>;
      })
    );
  }

  /**
   * Get brands.
   *
   * Public endpoint, return existing brands
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBrands$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBrands(params?: {
    context?: HttpContext
  }
): Observable<Array<BrandResponse>> {

    return this.getBrands$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BrandResponse>>) => r.body as Array<BrandResponse>)
    );
  }

}
