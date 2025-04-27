import {createReducer, on} from "@ngrx/store";
import {CartActions} from "./cart.actions";
import {CartElementDto} from "../../api/models/cart-element-dto";

export const initialState: CartElementDto[] = []

export const cartReducer = createReducer(
  initialState,
  on(CartActions.init, (_state, {cartElements}) => cartElements),

  on(CartActions.addProduct, (state, {product}) => {
    let item = state.find(item => item.productDto?.id === product.id)
    if (item && item.quantity) {
      let tempList = [...state]
      tempList[state.indexOf(item)] = {...item, quantity: item.quantity + 1}
      return tempList
    } else {
      return [...state, {
        quantity: 1,
        productDto: product
      }];
    }
  }),
  on(CartActions.removeProduct, (state, {productId}) => {
    let item = state.find(item => item.productDto?.id === productId)
    if (item && item.quantity !== undefined) {
      if (item.quantity === 1) {
        return state.filter(product => product.productDto?.id !== productId)
      } else {
        let tempList = [...state]
        tempList[state.indexOf(item)] = {...item, quantity: item.quantity - 1}
        return tempList
      }
    } else {
      return state;
    }
  })
)
