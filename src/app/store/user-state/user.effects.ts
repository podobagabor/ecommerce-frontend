import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EMPTY, exhaustMap, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {CookieService} from "ngx-cookie-service";
import {UserActions} from "./user.actions";
import {UserDtoDetailed} from "../../api/models/user-dto-detailed";
import {UserControllerService} from "../../api/services/user-controller.service";

@Injectable()
export class UserEffects {
  initAuth = createEffect(() => this.actions$.pipe(
      ofType(UserActions.init),
      exhaustMap(() => {
        if (localStorage.getItem("loggedInUser")) {
          const loggedInUser = JSON.parse(<string>localStorage.getItem("loggedInUser")) as UserDtoDetailed
          this.store.dispatch(UserActions.login({user: loggedInUser}));
        } else if (this.cookieService.get("accessToken") !== '') {
          return this.userService.getCurrentUser().pipe(
            tap(currentUser => {
              this.store.dispatch(UserActions.login({user: currentUser}))
            })
          )
        }
        return EMPTY;
      })
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private cookieService: CookieService, private userService: UserControllerService) {
  }
}
