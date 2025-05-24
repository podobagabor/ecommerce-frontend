import {getState, patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {effect, inject} from "@angular/core";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, debounceTime, EMPTY, pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {PageProductDto} from "../../../api/models/page-product-dto";

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
  filter: ProductFilter,
}

const initialProductState: ProductState = {
  isLoading: false,
  products: {},
  filter: {
    size: 5,
    discount: false
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
          const state = getState(store)
          return productService.getProductsByParams({
            ...value, page: state.filter.page, size: state.filter.size,
            maxPrice: state.filter.maxPrice, minPrice: state.filter.minPrice, discount: state.filter.discount
          }).pipe(
            tapResponse({
              next: (products) => {
                patchState(store, {products: products})
              },
              error: error => {
                console.error(error)
                patchState(store, {isLoading: false})
              },
              finalize: () => {
                patchState(store, {isLoading: false})
              }
            }),
          )
        }),
        catchError((err, caught) => {
          patchState(store, {isLoading: false});
          return EMPTY;
        }),
        debounceTime(1500),
        tap(() => patchState(store, {isLoading: false}))
      )
    ),
    updateFilters(value: ProductFilter) {
      patchState(store, (state) => ({
        ...state, filter: {
          ...state.filter,
          discount: (value.discount !== undefined) ? value.discount : state.filter.discount,
          minPrice: value.minPrice || state.filter.minPrice,
          maxPrice: value.maxPrice || state.filter.maxPrice
        }
      }));
    },
    updatePageValues(values: {
      page: number,
      size: number,
    }) {
      patchState(store, (state) => ({filter: {...state.filter, page: values.page, size: values.size}}));
    }
  })),
  withHooks({
    onInit(store) {
      if (sessionStorage.getItem("products")) {
        patchState(store, {...(JSON.parse(<string>sessionStorage.getItem("products")) as ProductState)});
      }

      effect(() => {
        const state = getState(store);
        sessionStorage.setItem("products", JSON.stringify(state));
      });
    }
  }),
)


