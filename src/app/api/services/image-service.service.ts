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



/**
 * REST endpoints for image service
 */
@Injectable({
  providedIn: 'root',
})
export class ImageServiceService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getImage
   */
  static readonly GetImagePath = '/api/image/{id}';

  /**
   * Get an image.
   *
   * Public endpoint returns an image by id and extension
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImage$Png()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImage$Png$Response(params: {
    id: string;
    fileExtension: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ImageServiceService.GetImagePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('fileExtension', params.fileExtension, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'image/png',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get an image.
   *
   * Public endpoint returns an image by id and extension
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImage$Png$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImage$Png(params: {
    id: string;
    fileExtension: string;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getImage$Png$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Get an image.
   *
   * Public endpoint returns an image by id and extension
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImage$Jpeg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImage$Jpeg$Response(params: {
    id: string;
    fileExtension: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, ImageServiceService.GetImagePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('fileExtension', params.fileExtension, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'image/jpeg',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Get an image.
   *
   * Public endpoint returns an image by id and extension
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getImage$Jpeg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImage$Jpeg(params: {
    id: string;
    fileExtension: string;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getImage$Jpeg$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
