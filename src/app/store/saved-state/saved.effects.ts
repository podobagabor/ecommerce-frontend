import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, of, withLatestFrom} from "rxjs";
import {selectUser} from "../app.selectors";
import {Store} from "@ngrx/store";
import {UserServiceService} from "../../api/services/user-service.service";
import {SavedActions} from "./saved.actions";

@Injectable()
export class SavedEffects {
  addToSaved = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.addProduct),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        if (user) {
          return this.userService.addSaved({body: [action.productId]});
        } else {
          let temp = localStorage.getItem("saved");
          let tempList: string[] = [];
          if (temp) {
            tempList = JSON.parse(temp) as string[];
          }
          tempList.push(action.productId);
          localStorage.setItem("saved", JSON.stringify(tempList));
          return of();
        }
      })
    ),
    {dispatch: false});

  removeFromSaved = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.removeProduct),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        if (user) {
          return this.userService.removeSaved({body: [action.productId]});
        } else {
          let temp = localStorage.getItem("saved");
          let tempList: string[] = [];
          if (temp) {
            tempList = JSON.parse(temp) as string[]
            tempList = tempList.filter(item => item !== action.productId);
          }
          localStorage.setItem("saved", JSON.stringify(tempList));
          return of();
        }

      })
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private userService: UserServiceService) {
  }
}
