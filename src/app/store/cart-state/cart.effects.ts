import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserServiceService} from "../../api/services/user-service.service";
import {exhaustMap, of, withLatestFrom} from "rxjs";
import {CartActions} from "./cart.actions";
import {Store} from "@ngrx/store";
import {cartProducts} from "../app.selectors";

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.addProduct),
      withLatestFrom(this.store.select(cartProducts)),
      exhaustMap(([action, items]) => {
        let item = items.find(item => item.product?.id === action.product.id)
        if (item && item.count) {
          let tempList = [...items]
          tempList[items.indexOf(item)] = {...item, count: item.count + 1}
          return this.userService.updateCart({
            body: tempList.map(item => {
              return {
                count: item.count!,
                productId: item.product?.id!
              }
            })
          })
        } else {
          return of()
        }
      })
    ),
    {dispatch: false});
  removeFromCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.removeProduct),
      withLatestFrom(this.store.select(cartProducts)),
      exhaustMap(([action, items]) => {
        let item = items.find(item => item.product?.id === action.productId)
        if (item && item.count !== undefined) {
          if (item.count === 1) {
            return items.filter(product => product.product?.id !== action.productId)
          } else {
            let tempList = [...items]
            tempList[items.indexOf(item)] = {...item, count: item.count - 1}
            return this.userService.updateCart({
              body: tempList.map(item => {
                return {
                  count: item.count!,
                  productId: item.product?.id!
                }
              })
            })
          }
        } else {
          return of();
        }
      })
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private userService: UserServiceService) {
  }
}
