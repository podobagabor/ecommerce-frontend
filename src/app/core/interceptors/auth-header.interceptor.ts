import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, EMPTY, Observable, switchMap, take, throwError} from 'rxjs';
import {filter} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {UserActions} from "../store/user-state/user.actions";
import {TokenService} from "../services/token.service";
import {KeycloakLoginResponse} from "../../components/shared/interfaces";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenService, private store: Store) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.tokenService.getAccessToken();
    if (token) {
      request = this.addAuthHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorized(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }


  private addAuthHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.getNewToken().pipe(
        switchMap((keycloakResponse: KeycloakLoginResponse | string) => {
          this.isRefreshing = false;
          if (typeof keycloakResponse === "object") {
            this.refreshTokenSubject.next(keycloakResponse.access_token);
            return next.handle(this.addAuthHeader(request, keycloakResponse.access_token));
          } else {
            return next.handle(this.addAuthHeader(request, ""));
          }
        }),
        catchError((_) => {
          this.isRefreshing = false;
          this.store.dispatch(UserActions.logout());
          return EMPTY;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addAuthHeader(request, accessToken));
        })
      );
    }
  }
}
