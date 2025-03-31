import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductResponse} from "../api/models/product-response";
import {UserState} from "./store.interfaces";
import {CartItemResponse} from "../api/models/cart-item-response";

export const products = createFeatureSelector<Array<ProductResponse>>('products');

export const savedProductsIDs = createFeatureSelector<
  Array<string>
>('savedProductIDs');

export const cartProducts = createFeatureSelector<
  CartItemResponse[]
>('cardProduct');

export const selectUserState = createFeatureSelector<
  UserState
>('user');

export const savedProducts = createSelector(
  products,
  savedProductsIDs,
  (products, savedProductsIDs) => {
    return savedProductsIDs.map((id) => products.find((product) => product.id === id)!);
  }
);

export const selectUser = createSelector(
  selectUserState,
  (userState) => {
    return userState.user;
  }
);

