import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {KeycloakLoginResponse} from "../../components/shared/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {UserActions} from "../store/user-state/user.actions";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private store: Store,private cookieService: CookieService, private http: HttpClient, private snackBarService: MatSnackBar) {
  }

  getAccessToken(): string | null {
    return this.cookieService.get('accessToken') || null;
  }

  getNewToken(): Observable<KeycloakLoginResponse | string> {
    const refreshToken = this.cookieService.get("refreshToken");
    const refreshRequest = new HttpParams()
      .set("grant_type", "refresh_token")
      .set("client_id", "ecommerce-rest-api")
      .set("refresh_token", refreshToken);
    return this.http.post<KeycloakLoginResponse>("/realms/ecommerce/protocol/openid-connect/token", refreshRequest).pipe(
      catchError((_) => {
        this.snackBarService.open("Munkamenet lejárt, jelentkezz be!",undefined, {
          duration: 3000,
        });
        this.store.dispatch(UserActions.logout());
        return of("Hiba a bejelentkezéskor");
      }),
      map(value => {
        if (typeof value !== "string") {
          this.cookieService.delete("accessToken");
          this.cookieService.delete("refreshToken");
          this.cookieService.set("accessToken", value.access_token,undefined,"/");
          this.cookieService.set("refreshToken", value.refresh_token,undefined,"/");
        }
        return value
      }))
  }
}
