import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {UserActions} from "../store/user-state/user.actions";

import {HttpClient, HttpParams} from "@angular/common/http";
import {UserControllerService} from "../api/services/user-controller.service";
import {KeycloakLoginResponse} from "./KeycloakLoginResponse";
import {UserDtoDetailed} from "../api/models/user-dto-detailed";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected currentUser = new BehaviorSubject<UserDtoDetailed | undefined>(undefined);


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
        catchError((err) => {
          return of("Hiba a bejelentkezéskor");
        })
      ).subscribe(value => {
        if (typeof value !== "string") {
          this.cookieService.set("accessToken", value.access_token);
          this.cookieService.set("refreshToken", value.refresh_token);
          this.userService.getCurrentUser().subscribe(user => {
            this.store.dispatch(UserActions.login({
                user: user
              }
            ));
            this.store.dispatch(UserActions.setSavedAndCartFromUser());
            resolve(true);
          })
        } else {
          reject(value)
        }
      })
    })
  }

  logout() {
    this.logoutWithoutDispatchingAction()
    this.store.dispatch(UserActions.logout());
  }

  logoutWithoutDispatchingAction() {
    this.cookieService.deleteAll();
    localStorage.removeItem("saved");
    localStorage.removeItem("cart");
    this.currentUser?.next(undefined);
  }
}
