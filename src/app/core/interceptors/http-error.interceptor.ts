import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private snackService: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 405 || err.statis === 403) {
          this.snackService.open(err.error, undefined, {
            duration: 3000,
          });
        } else if (!(err.status === 401)) {
          this.snackService.open("Hiba történt, töltsd újra az oldalt.", undefined, {
            duration: 3000,
          });
        }
        return throwError(err);
      })
    );
  }
}
