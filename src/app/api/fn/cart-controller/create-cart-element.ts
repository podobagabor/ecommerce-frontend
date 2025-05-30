/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartElementCreateDto } from '../../models/cart-element-create-dto';
import { CartElementDto } from '../../models/cart-element-dto';

export interface CreateCartElement$Params {
      body: CartElementCreateDto
}

export function createCartElement(http: HttpClient, rootUrl: string, params: CreateCartElement$Params, context?: HttpContext): Observable<StrictHttpResponse<CartElementDto>> {
  const rb = new RequestBuilder(rootUrl, createCartElement.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CartElementDto>;
    })
  );
}

createCartElement.PATH = '/api/cart/addToCart';
