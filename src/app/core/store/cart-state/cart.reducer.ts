import {createReducer, on} from "@ngrx/store";
import {CartActions} from "./cart.actions";
import {CartElementDto} from "../../../api/models/cart-element-dto";

export const initialState: CartElementDto[] = []

export const cartReducer = createReducer(
  initialState,
  on(CartActions.setValue, (_state, {cartElements}) => {
    return cartElements
  }),

  on(CartActions.addCartElement, (state, {cartElement}) => {
    let item = state.find(item => item.id === cartElement.id)
    if (item && item.quantity) {
      let tempList = [...state]
      tempList[state.indexOf(item)] = {...cartElement}
      return tempList
    } else {
      return [...state, cartElement];
    }
  }),
  on(CartActions.removeCartElement, (state, {cartElementId}) => {
    let item = state.find(item => item.id === cartElementId)
    if (item) {
      if (item.quantity === 1) {
        return state.filter(product => product.id !== cartElementId)
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
