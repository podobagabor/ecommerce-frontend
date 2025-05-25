import {Injectable} from '@angular/core';
import {catchError, of} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {UserActions} from "../store/user-state/user.actions";

import {HttpClient, HttpParams} from "@angular/common/http";
import {UserControllerService} from "../../api/services/user-controller.service";
import {environment} from "../../../environment";
import {KeycloakLoginResponse} from "../../components/shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserControllerService,
              private store: Store, private cookieService: CookieService,
              private http: HttpClient) {
  }

  login(email: string, password: string): Promise<any> {
    const loginRequest = new HttpParams()
      .set("grant_type", "password")
      .set("client_id", "ecommerce-rest-api")
      .set("username", email)
      .set("password", password);
    return new Promise<any>((resolve, reject) => {
      this.http.post<KeycloakLoginResponse>(environment.tokenEndpoint, loginRequest).pipe(
        catchError(() => {
          return of("Hiba a bejelentkezéskor");
        })
      ).subscribe(value => {
        if (typeof value !== "string") {
          this.cookieService.set("accessToken", value.access_token, undefined, "/");
          this.cookieService.set("refreshToken", value.refresh_token, undefined, "/");
          this.userService.getCurrentUser().subscribe(user => {
            this.store.dispatch(UserActions.login({
                user: user
              }
            ));
            this.store.dispatch(UserActions.setSavedAndCartFromUser());
            resolve(true);
          })
        } else {
          reject(value);
        }
      })
    })
  }
}
