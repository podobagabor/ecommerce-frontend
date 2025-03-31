import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get("accessToken");
    let clonedRequest = request;
    if(token) {
      clonedRequest = request.clone({ headers: request.headers.set('Authorization',"Bearer " + token)});
    }
    return next.handle(clonedRequest);
  }
}
