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
  onInitEffect$ = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.init),
      tap(() => {
        let savedItems = this.getSavedListFromLocalStorage();
        if (savedItems.length) {
          this.store.dispatch(SavedActions.setValue({products: savedItems}));
        }
      })
    ),
    {dispatch: false});

  saveProductEffect$ = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.saveProduct),
      withLatestFrom(this.store.select(selectUser), this.store.select(savedProducts)),
      exhaustMap(([action, user, _]) => {
        if (user && action.product.id) {
          return this.savedService.addProductToSaved({id: action.product.id}).pipe(
            tapResponse({
              next: (response) => {
                this.store.dispatch(SavedActions.addProduct({product: response}));
              },
              error: (error) => console.error(error)
            })
          );
        } else {
          this.store.dispatch(SavedActions.addProduct({product: action.product}));
        }
        return of();
      })
    ),
    {dispatch: false});
  deleteFromSavedEffect$ = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.deleteProduct),
      withLatestFrom(this.store.select(selectUser), this.store.select(savedProducts)),
      exhaustMap(([action, user, _]) => {
        if (user) {
          return this.savedService.removeProductFromSaved({id: action.productId}).pipe(
            tap(() => {
              this.store.dispatch(SavedActions.removeProduct({productId: action.productId}));
            })
          );
        } else {
          this.store.dispatch(SavedActions.removeProduct({productId: action.productId}));
        }
        return of();
      })
    ),
    {dispatch: false});
  addProductEffect$ = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.addProduct),
      withLatestFrom(this.store.select(savedProducts)),
      tap(([_, state]) => {
        this.save(state)
      })
    ),
    {dispatch: false});
  removeProductEffect$ = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.removeProduct),
      withLatestFrom(this.store.select(savedProducts)),
      tap(([_, state]) => {
        this.save(state)
      })
    ),
    {dispatch: false});
  setValueEffect$ = createEffect(() => this.actions$.pipe(
      ofType(SavedActions.setValue),
      withLatestFrom(this.store.select(savedProducts)),
      tap(([_, state]) => {
        this.save(state)
      })
    ),
    {dispatch: false});


  save(newSavedList: ProductDto[]) {
    sessionStorage.setItem("saved", JSON.stringify(newSavedList));
  }

  getSavedListFromLocalStorage(): ProductDto[] {
    const temp = sessionStorage.getItem("saved");
    let tempList: ProductDto[] = [];
    if (temp) {
      tempList = JSON.parse(temp) as ProductDto[];
    }
    return tempList;
  }

  constructor(private store: Store, private actions$: Actions, private savedService: SavedControllerService) {
  }
}
