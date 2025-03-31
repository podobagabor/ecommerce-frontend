import {createReducer, on} from "@ngrx/store";
import {CartActions} from "../cart-state/cart.actions";
import {ProductResponse} from "../../api/models/product-response";
import {ProductsActions} from "./products.actions";

export const initialState: ReadonlyArray<ProductResponse> = []

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (_state, {products}) => products)
)
