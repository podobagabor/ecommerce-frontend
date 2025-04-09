import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "./store.interfaces";
import {CartElementDto} from "../api/models/cart-element-dto";
import {ProductDto} from "../api/models/product-dto";

export const products = createFeatureSelector<Array<ProductDto>>('products');

export const savedProductsIDs = createFeatureSelector<
  Array<number>
>('savedProductIDs');

export const cartProducts = createFeatureSelector<
  CartElementDto[]
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

