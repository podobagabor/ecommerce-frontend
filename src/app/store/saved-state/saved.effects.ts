import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, of, withLatestFrom} from "rxjs";
import {selectUser} from "../app.selectors";
import {Store} from "@ngrx/store";
import {SavedActions} from "./saved.actions";
import {SavedControllerService} from "../../api/services/saved-controller.service";

@Injectable()
export class SavedEffects {
  addToSaved = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.addProduct),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        if (user) {
          return this.savedService.addProductToSaved({id: action.productId});
        } else {
          let temp = localStorage.getItem("saved");
          let tempList: number[] = [];
          if (temp) {
            tempList = JSON.parse(temp) as number[];
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
          return this.savedService.removeProductFromSaved({id: action.productId});
        } else {
          let temp = localStorage.getItem("saved");
          let tempList: number[] = [];
          if (temp) {
            tempList = JSON.parse(temp) as number[]
            tempList = tempList.filter(item => item !== action.productId);
          }
          localStorage.setItem("saved", JSON.stringify(tempList));
          return of();
        }

      })
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private savedService: SavedControllerService) {
  }
}
