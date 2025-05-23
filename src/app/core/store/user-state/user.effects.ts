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

@Injectable()
export class UserEffects {
  initAuth = createEffect(() => this.actions$.pipe(
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
        } else {
          this.store.dispatch(UserActions.logout());
          this.cookieService.deleteAll();
        }
        this.store.dispatch(SavedActions.init());
        this.store.dispatch(CartActions.init());
        return EMPTY;
      })
    ),
    {dispatch: false});
  getSavedAndCart = createEffect(() => this.actions$.pipe(
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

  constructor(private store: Store, private actions$: Actions, private cookieService: CookieService, private userService: UserControllerService) {
  }
}
