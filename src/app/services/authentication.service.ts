import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Store} from "@ngrx/store";
import {UserActions} from "../store/user-state/user.actions";
import {SavedActions} from "../store/saved-state/saved.actions";
import {ProductsActions} from "../store/products-state/products.actions";
import {CartActions} from "../store/cart-state/cart.actions";

import {HttpClient, HttpParams} from "@angular/common/http";
import {UserControllerService} from "../api/services/user-controller.service";
import {KeycloakLoginResponse} from "./KeycloakLoginResponse";
import {UserDtoDetailed} from "../api/models/user-dto-detailed";
import {ProductControllerService} from "../api/services/product-controller.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected currentUser = new BehaviorSubject<UserDtoDetailed | undefined>(undefined);


  constructor(private userService: UserControllerService, private productService: ProductControllerService, private store: Store, private cookieService: CookieService,
              private http: HttpClient) {
    if (this.cookieService.get("accessToken") !== '') {
      this.userService.getCurrentUser().subscribe(user => {
        console.log(user);
        this.currentUser.next(user);
        this.currentUser?.next(user);
        this.store.dispatch(UserActions.login({
            user: user
          }
        ))
        this.store.dispatch(SavedActions.init({
          productIds: user.savedItems?.map(product => product.id!!) || []
        }))
        this.store.dispatch(CartActions.init({
          products: user.cartItems || []
        }))
      })
    } else {
      if (localStorage.getItem("saved")) {
        let temp = JSON.parse(localStorage.getItem("saved")!) as number[]
        this.store.dispatch(SavedActions.init({
          productIds: temp
        }))
      }

    }
    this.productService.getProductsByParams().subscribe(products => {
      this.store.dispatch(ProductsActions.loadProducts({products: products.content || []}))
    })
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(email: string, password: string): Promise<any> {
    const loginRequest = new HttpParams()
      .set("grant_type", "password")
      .set("client_id", "ecommerce-rest-api")
      .set("username", email)
      .set("password", password);
    return new Promise<any>((resolve, reject) => {
      this.http.post<KeycloakLoginResponse>("/realms/ecommerce/protocol/openid-connect/token", loginRequest).pipe(
        catchError((err) => {
          return of("Hiba a bejelentkezéskor");
        })
      ).subscribe(value => {
        if (typeof value !== "string") {
          console.log(value.access_token)
          this.cookieService.set("accessToken", value.access_token);
          this.cookieService.set("refreshToken", value.refresh_token);
          this.userService.getCurrentUser().subscribe(user => {
            this.currentUser?.next(user);
            console.log(user);
            this.store.dispatch(UserActions.login({
                user: user
              }
            ));
            this.store.dispatch(CartActions.init({
              products: user.cartItems || []
            }))
            this.store.dispatch(SavedActions.init({
              productIds: user.savedItems?.map(product => product.id!!) || []
            }))
            resolve(true);
          })
        } else {
          reject(value)
        }
      })
    })

  }

  register(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, gender: "MALE" | "FEMALE"): Observable<any> {
    return this.userService.createUser({
      body: {
        id: undefined,
        gender: gender,
        email: email,
        password: "pass",
        address: undefined,
        firstName: firstName,
        lastName: lastName,
        role: "USER",
      }
    })
  }

  /*
    login(email: string, password: string): Promise<any> {
      this.cookieService.deleteAll();
      return new Promise<any>((resolve, reject) => {
        this.authService.login({
          body: {
            email: email,
            password: password
          }
        }).pipe(
          catchError((err) => {
            return of("Hiba a bejelentkezéskor");
          })
        ).subscribe(value => {
            if (typeof value !== 'string') {
              this.cookieService.set("accessToken", (value as LoginResponse).accessToken!);
              this.cookieService.set("refreshToken", (value as LoginResponse).refreshToken!);
              this.userService.getCurrentUser().subscribe(user => {
                this.currentUser?.next(user);
                this.store.dispatch(UserActions.login({
                    user: user
                  }
                ));
                this.store.dispatch(CartActions.init({
                  products: user.cart || []
                }))
                this.store.dispatch(SavedActions.init({
                  productIds: user.saved?.map( product => product.id!!) || []
                }))
                resolve(true);
              })
            } else {
              reject(value);
            }
          }
        )
      })
    }

   */


  logout() {
    this.cookieService.deleteAll();
    this.currentUser?.next(undefined);
    this.store.dispatch(UserActions.logout())
  }
}
