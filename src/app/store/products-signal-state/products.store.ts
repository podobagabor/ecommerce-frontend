import {getState, patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {effect, inject} from "@angular/core";
import {ProductControllerService} from "../../api/services/product-controller.service";
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {debounceTime, pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {PageProductDto} from "../../api/models/page-product-dto";

export interface ProductFilter {
  name?: string;
  categoryId?: number[];
  discount?: boolean;
  minPrice?: number;
  maxPrice?: number;
  brandId?: number[];
  page?: number;
  size?: number;
}

type ProductState = {
  products: PageProductDto,
  isLoading: boolean,
  filter: ProductFilter ,
}

const initialProductState: ProductState = {
  isLoading: false,
  products: {},
  filter: {
    size: 5
  }
}

export const ProductStore = signalStore(
  {providedIn: 'root'},
  withState(initialProductState),
  withMethods((store, productService = inject(ProductControllerService)) => ({
    loadProducts: rxMethod<ProductFilter>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((value) => {
          console.log(value);
          return productService.getProductsByParams({...value}).pipe(
            tapResponse({
              next: (products) => {
                console.log("loadProducts");
                patchState(store, {products: products})
              },
              error: error => {
                console.error(error)
              }
            }),
          )
        }),
        debounceTime(1500),
        tap(() => patchState(store, {isLoading: false}))
      )
    ),
    updateFilters(query: ProductFilter) {
      console.log("updateQuery");

      patchState(store, (state) => ({...state, filter: {...state.filter, query}}));
    },
    updatePageValues(values: {
      page: number,
      size: number,
    }) {
      console.log("updatePageValues",values);

      patchState(store, (state) => ({filter: {...state.filter, page: values.page, size: values.size}}));
    },
    updateProducts(products: PageProductDto) {
      console.log("updateProducts");

      patchState(store, (state) => ({...state, products: {...products}}))
    }
  })),
  withHooks({
    onInit(store) {
      if (localStorage.getItem("products")) {
        patchState(store, {...(JSON.parse(<string>localStorage.getItem("products")) as ProductState)});
      }

      effect(() => {
        console.log("productStoreEffect");
        const state = getState(store);
        localStorage.setItem("products", JSON.stringify(state));
      });
    }
  }),
)


