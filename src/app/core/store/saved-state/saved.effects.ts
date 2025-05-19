import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, of, tap, withLatestFrom} from "rxjs";
import {savedProducts, selectUser} from "../app.selectors";
import {Store} from "@ngrx/store";
import {SavedActions} from "./saved.actions";
import {SavedControllerService} from "../../../api/services/saved-controller.service";
import {tapResponse} from "@ngrx/operators";
import {ProductDto} from "../../../api/models/product-dto";

@Injectable()
export class SavedEffects {
  onInit = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.init),
      tap(() => {
        let savedItems = this.getSavedListFromLocalStorage();
        if (savedItems.length) {
          this.store.dispatch(SavedActions.setValue({products: savedItems}));
        }
      })
    ),
    {dispatch: false});

  saveProduct = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.saveProduct),
      withLatestFrom(this.store.select(selectUser), this.store.select(savedProducts)),
      exhaustMap(([action, user, products]) => {
        if (user && action.product.id) {
          return this.savedService.addProductToSaved({id: action.product.id}).pipe(
            tapResponse({
              next: (response) => {
                this.save(products);
              },
              error: (error) => console.error(error)
            })
          );
        } else {
          this.save(products);
        }
        return of();
      })
    ),
    {dispatch: false});

  removeFromSaved = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.removeProduct),
      withLatestFrom(this.store.select(selectUser), this.store.select(savedProducts)),
      exhaustMap(([action, user, products]) => {
        if (user) {
          return this.savedService.removeProductFromSaved({id: action.productId}).pipe(
            tap(() => {
              this.save(products);
            })
          );
        }
        return of();
      })
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private savedService: SavedControllerService) {
  }

  save(newSavedList: ProductDto[]) {
    localStorage.setItem("saved", JSON.stringify(newSavedList));
  }

  getSavedListFromLocalStorage(): ProductDto[] {
    const temp = localStorage.getItem("saved");
    let tempList: ProductDto[] = [];
    if (temp) {
      tempList = JSON.parse(temp) as ProductDto[];
    }
    return tempList;
  }
}
