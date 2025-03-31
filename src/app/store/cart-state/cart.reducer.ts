import {createReducer, on} from "@ngrx/store";
import {CartActions} from "./cart.actions";
import {CartItemResponse} from "../../api/models/cart-item-response";
import {products} from "../app.selectors";

export const initialState: CartItemResponse[] = []

export const cartReducer = createReducer(
  initialState,
  on(CartActions.init, (_state, {products}) => products),

  on(CartActions.addProduct, (state, {product}) => {
    console.log("Reducer: " + state.toString())
    let item = state.find(item => item.product?.id === product.id)
    if(item && item.count) {
      let tempList = [...state]
      tempList[state.indexOf(item)] = {...item, count : item.count + 1}
      return tempList
    } else {
      return  [...state,{
        count: 1,
        product: product
      }];
    }
  }),
  on(CartActions.removeProduct, (state, {productId}) => {
    let item = state.find(item => item.product?.id === productId)
    if(item && item.count !== undefined) {
      if(item.count === 1) {
        return state.filter(product => product.product?.id !== productId)
      } else {
        let tempList = [...state]
        tempList[state.indexOf(item)] = {...item, count : item.count - 1}
        return tempList
      }
    } else {
      return state;
    }
  })
)
