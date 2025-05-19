import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {KeycloakLoginResponse} from "../../components/shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService, private http: HttpClient) {
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
      catchError((err) => {
        return of("Hiba a bejelentkezéskor");
      }),
      map(value => {
        if (typeof value !== "string") {
          this.cookieService.set("accessToken", value.access_token);
          this.cookieService.set("refreshToken", value.refresh_token);
        }
        return value
      }))
  }
}
