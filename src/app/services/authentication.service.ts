import {Injectable} from '@angular/core';
import {AuthServiceService} from "../api/services/auth-service.service";
import {UserResponse} from "../api/models/user-response";
import {BehaviorSubject, catchError, of} from "rxjs";
import {LoginResponse} from "../api/models/login-response";
import {CookieService} from "ngx-cookie-service";
import {UserServiceService} from "../api/services/user-service.service";
import {Store} from "@ngrx/store";
import {UserActions} from "../store/user-state/user.actions";
import {SavedActions} from "../store/saved-state/saved.actions";
import {ProductServiceService} from "../api/services/product-service.service";
import {ProductsActions} from "../store/products-state/products.actions";
import {CartActions} from "../store/cart-state/cart.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected currentUser = new BehaviorSubject<UserResponse | undefined>(undefined);

  constructor(private store: Store, private authService: AuthServiceService, private cookieService: CookieService, private userService: UserServiceService, private productService: ProductServiceService) {
    if (this.cookieService.get("accessToken") !== '') {
      this.userService.getCurrentUser().subscribe(user => {
        this.currentUser.next(user);
        this.currentUser?.next(user);
        this.store.dispatch(UserActions.login({
            user: user
          }
        ))
        this.store.dispatch(SavedActions.init({
          productIds: user.saved?.map( product => product.id!!) || []
        }))
        this.store.dispatch(CartActions.init({
          products: user.cart || []
        }))
      })
    } else {
      if(localStorage.getItem("saved")) {
        let temp = JSON.parse(localStorage.getItem("saved")!) as string[]
        this.store.dispatch(SavedActions.init({
          productIds: temp
        }))
      }

    }
    this.productService.getAll().subscribe( products => {
      this.store.dispatch(ProductsActions.loadProducts({products: products.content || []}))
    })
  }

  getCurrentUser() {
    return this.currentUser;
  }

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



  logout() {
    this.cookieService.deleteAll();
    this.currentUser?.next(undefined);
    this.store.dispatch(UserActions.logout())
  }
}
