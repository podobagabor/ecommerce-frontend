import {createReducer, on} from "@ngrx/store";
import {SavedActions} from "./saved.actions";

export const initialState: number[] = []

export const savedReducer = createReducer(
  initialState,
  on(SavedActions.init, (_state, {productIds}) => productIds),
  on(SavedActions.addProduct, (state, {productId}) => {
    return [...state, productId]
  }),
  on(SavedActions.removeProduct, (state, {productId}) => {
    return state.filter(id => id != productId)
  })
)
