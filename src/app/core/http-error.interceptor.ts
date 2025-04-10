import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {AuthServiceService} from "../api/services/auth-service.service";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService,private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError((err) =>{
          if(err.error.error[0].ReasonStatus === 4012) {
            this.authService.refreshToken({Authorization: this.cookieService.get('refreshToken')}).pipe(
              catchError( (err) => {
                if(err.error.error[0].ReasonStatus === 4012) {

                }
                return throwError("Intercept");
              })
            ).subscribe(

            )
          }
         return throwError("Intercept")
        })
    );
  }
}
