import {createReducer, on} from "@ngrx/store";
import {ProductsActions} from "./products.actions";
import {ProductDto} from "../../api/models/product-dto";

export const initialState: ReadonlyArray<ProductDto> = []

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (_state, {products}) => products)
)
