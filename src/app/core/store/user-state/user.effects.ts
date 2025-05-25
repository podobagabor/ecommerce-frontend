import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EMPTY, exhaustMap, tap, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {CookieService} from "ngx-cookie-service";
import {UserActions} from "./user.actions";
import {UserDtoDetailed} from "../../../api/models/user-dto-detailed";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {SavedActions} from "../saved-state/saved.actions";
import {CartActions} from "../cart-state/cart.actions";
import {selectUser} from "../app.selectors";
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {
  initAuthEffect$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.init),
      exhaustMap(() => {
        if (sessionStorage.getItem("loggedInUser")) {
          const loggedInUser = JSON.parse(<string>sessionStorage.getItem("loggedInUser")) as UserDtoDetailed
          this.store.dispatch(UserActions.login({user: loggedInUser}));
        } else if (this.cookieService.get("accessToken") !== '') {
          return this.userService.getCurrentUser().pipe(
            tap(currentUser => {
              this.store.dispatch(UserActions.login({user: currentUser}));
              this.store.dispatch(UserActions.setSavedAndCartFromUser());
            })
          )
        }
        this.store.dispatch(SavedActions.init());
        this.store.dispatch(CartActions.init());
        return EMPTY;
      })
    ),
    {dispatch: false});
  getSavedAndCartEffect$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.setSavedAndCartFromUser),
      withLatestFrom(this.store.select(selectUser)),
      tap(([_, user]) => {
        if (user) {
          if (user.savedItems) {
            this.store.dispatch(SavedActions.setValue({products: user.savedItems}));
          }
          if (user.cartItems) {
            this.store.dispatch(CartActions.setValue({cartElements: user.cartItems}));
          }
        }
      })
    ),
    {dispatch: false});
  logoutEffect$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.logout),
      tap(() => {
        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("brands");
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("categories");
        sessionStorage.removeItem("products");
        sessionStorage.removeItem("saved");
        this.cookieService.delete("accessToken", "/");
        this.cookieService.delete("refreshToken", "/");
        this.router.navigate(["/home"])
      })
    ),
    {dispatch: false});
  loginEffect$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.login),
      withLatestFrom(this.store.select(selectUser)),
      tap(([_, user]) => {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      })
    ),
    {dispatch: false});

  constructor(private router: Router, private store: Store, private actions$: Actions, private cookieService: CookieService, private userService: UserControllerService) {
  }
}
