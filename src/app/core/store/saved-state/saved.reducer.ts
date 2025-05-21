import {createReducer, on} from "@ngrx/store";
import {SavedActions} from "./saved.actions";
import {ProductDto} from "../../../api/models/product-dto";
import {products} from "../app.selectors";

export const initialState: ProductDto[] = []

export const savedReducer = createReducer(
  initialState,
  on(SavedActions.setValue, (_state, {products}) => {
    localStorage.setItem("saved",JSON.stringify(products));
   return products;
  }),
  on(SavedActions.addProduct, (state, {product}) => {
    localStorage.setItem("saved", JSON.stringify([...state, product]));
    return [...state, product];
  }),
  on(SavedActions.removeProduct, (state, {productId}) => {
    const newState = state.filter(savedProduct => savedProduct.id != productId);
    localStorage.setItem("saved", JSON.stringify(newState));
    return newState;
  })
)
