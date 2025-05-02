import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, tap, withLatestFrom} from "rxjs";
import {CartActions} from "./cart.actions";
import {Store} from "@ngrx/store";
import {cartProducts} from "../app.selectors";
import {CartControllerService} from "../../api/services/cart-controller.service";
import {ProductDto} from "../../api/models/product-dto";
import {CartElementDto} from "../../api/models/cart-element-dto";
import {tapResponse} from "@ngrx/operators";

@Injectable()
export class CartEffects {
  onInit = createEffect(() => this.actions$.pipe(
      ofType(CartActions.init),
      tap(() => {
        let cart = this.getCartFromLocalStorage();
        if (cart.length) {
          this.store.dispatch(CartActions.setValue({cartElements: cart}));
        }
      })
    ),
    {dispatch: false});

  onSaveCartElement = createEffect(() => this.actions$.pipe(
      ofType(CartActions.saveCartElement),
      withLatestFrom(this.store.select(cartProducts)),
      exhaustMap(([action, items]) => {
        let item = items.find(item => item.productDto?.id === action.product.id)
        if (item) {
          return this.cartService.changeQuantity({id: item.id, quantity: item.quantity + 1}).pipe(
            tapResponse({
              next: (response) => {
                this.store.dispatch(CartActions.addCartElement({cartElement: response}));
              },
              error: error => {
                console.error(error)
              }
            })
          );
        } else {
          return this.cartService.createCartElement({
            body: {
              quantity: 1,
              productId: action.product.id
            }
          }).pipe(
            tapResponse({
              next: (response) => {
                this.store.dispatch(CartActions.addCartElement({cartElement: response}));
              },
              error: error => {
                console.error(error)
              }
            })
          )
        }
      })
    ),
    {dispatch: false});

  addToCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.addCartElement),
      withLatestFrom(this.store.select(cartProducts)),
      tap(([_, items]) => {
        this.save(items);
      })
    ),
    {dispatch: false});

  deleteFromUser$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.deleteCartElementFromUser),
      exhaustMap((action) => {
          if (action.cartElement.quantity === 1) {
            return this.cartService.deleteCartElement({id: action.cartElement.id!}).pipe(
              tapResponse({
                next: (response) => {
                  this.store.dispatch(CartActions.removeCartElement({cartElementId: action.cartElement.id}))
                },
                error: error => {
                  console.error(error)
                }
              })
            );
          } else {
            return this.cartService.changeQuantity({
              id: action.cartElement.id,
              quantity: action.cartElement.quantity - 1
            }).pipe(
              tapResponse({
                next: (response) => {
                  this.store.dispatch(CartActions.removeCartElement({cartElementId: action.cartElement.id}))
                },
                error: error => {
                  console.error(error)
                }
              })
            )
          }
        }
      )
    ),
    {dispatch: false});

  removeFromCart$ = createEffect(() => this.actions$.pipe(
      ofType(CartActions.removeCartElement),
      withLatestFrom(this.store.select(cartProducts)),
      tap(([_, items]) => {
        this.save(items);
      })
    ),
    {dispatch: false});

  constructor(private store: Store, private actions$: Actions, private cartService: CartControllerService) {
  }

  save(newSavedList: ProductDto[]) {
    localStorage.setItem("cart", JSON.stringify(newSavedList));
  }

  getCartFromLocalStorage(): CartElementDto[] {
    const temp = localStorage.getItem("cart");
    let tempList: CartElementDto[] = [];
    if (temp) {
      tempList = JSON.parse(temp) as CartElementDto[];
    }
    return tempList;
  }
}
