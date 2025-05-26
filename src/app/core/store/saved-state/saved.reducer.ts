import {createReducer, on} from "@ngrx/store";
import {SavedActions} from "./saved.actions";
import {ProductDto} from "../../../api/models/product-dto";

export const initialState: ProductDto[] = []

export const savedReducer = createReducer(
  initialState,
  on(SavedActions.setValue, (_state, {products}) => {
    return products;
  }),
  on(SavedActions.addProduct, (state, {product}) => {
    return [...state, product];
  }),
  on(SavedActions.removeProduct, (state, {productId}) => {
    return state.filter(savedProduct => savedProduct.id != productId);
  })
)
