import {getState, patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {effect, inject} from "@angular/core";
import {ProductControllerService} from "../../api/services/product-controller.service";
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {debounceTime, pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {PageProductDto} from "../../api/models/page-product-dto";
import {CategoryDetailedDto} from "../../api/models/category-detailed-dto";
import {CategoryControllerService} from "../../api/services/category-controller.service";
import {BrandControllerService} from "../../api/services/brand-controller.service";

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
  mainCategory: CategoryDetailedDto,
  availableCategoriesIdList: number[],
  availableCategoriesTree: {
    category: CategoryDetailedDto,
    selected: boolean,
    subCategories: { category: CategoryDetailedDto, selected: boolean }[]
  }[],
  filter: { query: ProductFilter, page: number, size: number },
}

const initialProductState: ProductState = {
  mainCategory: {id: 0},
  availableCategoriesIdList: [],
  isLoading: false,
  products: {},
  availableCategoriesTree: [],
  filter: {
    query: {},
    page: 0,
    size: 1,
  }
}

export const ProductStore = signalStore(
  {providedIn: 'root'},
  withState(initialProductState),
  withMethods((store, productService = inject(ProductControllerService), brandService = inject(BrandControllerService), categoryService = inject(CategoryControllerService)) => ({
    loadProducts: rxMethod<ProductFilter>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((value) => {
          return productService.getProductsByParams({...value}).pipe(
            tapResponse({
              next: (products) => {
                console.log("loadProducts");
                patchState(store, {products: products})
              },
              error: error => {
                console.error(error)
              },
              finalize: () => patchState(store, {isLoading: false}),
            })
          )
        })
      )
    ),
    updateQuery(query: ProductFilter) {
      console.log("updateQuery");

      patchState(store, (state) => ({...state, filter: {...state.filter, query}}));
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
        const state = getState(store);
        localStorage.setItem("products", JSON.stringify(state));
      });
    }
  }),
)


