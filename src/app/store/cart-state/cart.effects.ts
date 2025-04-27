import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, of, withLatestFrom} from "rxjs";
import {CartActions} from "./cart.actions";
import {Store} from "@ngrx/store";
import {cartProducts} from "../app.selectors";
import {CartControllerService} from "../../api/services/cart-controller.service";

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.addProduct),
      withLatestFrom(this.store.select(cartProducts)),
      exhaustMap(([action, items]) => {
        let item = items.find(item =>item.productDto?.id === action.product.id)
        if (item && item.quantity && item.quantity !== 1) {
          return this.cartService.changeQuantity({id: item.id!, quantity: item.quantity + 1})
        } else {
          return this.cartService.createCartElement({
            body: {
              quantity: 1,
              productId: action.product.id
            }
          })
        }
      })
    ),
    {dispatch: false});
  removeFromCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.removeProduct),
      withLatestFrom(this.store.select(cartProducts)),
      exhaustMap(([action, items]) => {
          let item = items.find(item => item.productDto?.id === action.productId)
          if (item && item.quantity !== undefined) {
            if (item.quantity === 1) {
              return this.cartService.deleteCartElement({id: item.id!});
            } else {
              let tempList = [...items]
              tempList[items.indexOf(item)] = {...item, quantity: item.quantity - 1}
              return this.cartService.changeQuantity({id: item.id!, quantity: item.quantity - 1})
            }
          } else {
            return of();
          }
        }
      )
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private cartService: CartControllerService) {
  }
}
