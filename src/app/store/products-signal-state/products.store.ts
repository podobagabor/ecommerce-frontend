import {getState, patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {effect, inject} from "@angular/core";
import {ProductControllerService} from "../../api/services/product-controller.service";
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {PageProductDto} from "../../api/models/page-product-dto";
import {CategoryDetailedDto} from "../../api/models/category-detailed-dto";
import {CategoryControllerService} from "../../api/services/category-controller.service";

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
  allSubCategory: {
    category: CategoryDetailedDto,
    selected: boolean,
    subCategories: { category: CategoryDetailedDto, selected: boolean }[]
  }[],
  filter: { query: ProductFilter, page: number, size: number },
}

const initialProductState: ProductState = {
  mainCategory: {id: 0},
  isLoading: false,
  products: {},
  allSubCategory: [],
  filter: {
    query: {},
    page: 0,
    size: 1,
  }
}

export const ProductStore = signalStore(
  {providedIn: 'root'},
  withState(initialProductState),
  withMethods((store, productService = inject(ProductControllerService), categoryService = inject(CategoryControllerService)) => ({
    loadProducts: rxMethod<ProductFilter>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((value) => {
          const currentStore = getState(store);
          let selectedCategories = currentStore.allSubCategory.
          return productService.getProductsByParams(value).pipe(
            tapResponse({
              next: (products) => {
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
    updateAllCategory: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((categoryId) => {
          return categoryService.getCategoryDetailedById({id: categoryId}).pipe(
            tap(value => {
              const categories = value.subCategories?.map((subCat: CategoryDetailedDto) => {
                return {
                  category: subCat,
                  selected: false,
                  subCategories: subCat.subCategories?.map(category => {
                    return {
                      category: category,
                      selected: false,
                    }
                  }) || [],
                };
              }) || [];
              patchState(store, {allSubCategory: categories, mainCategory: value});
            })
          )
        }),
        switchMap((value) => {
          console.log("switch")
          return productService.getProductsByParams({
            categoryId: getAllCategories(value)
          }).pipe(
            tapResponse({
              next: (products) => {
                patchState(store, {products: products})
              },
              error: error => {
                console.error(error)
              },
              finalize: () => patchState(store, {isLoading: false}),
            })
          )
        })
      )),
    updateQuery(query: ProductFilter) {
      patchState(store, (state) => ({...state, filter: {...state.filter, query}}));
    },
    updateProducts(products: PageProductDto) {
      patchState(store, (state) => ({...state, products: {...products}}))
    },
    updateCategories(updatedCategoryList: number[]) {
      store.allSubCategory().forEach((subCategory) => {
      })
      patchState(store, (state) => ({
        ...state,
        filter: {...state.filter, query: {...state.filter.query, categoryId: updatedCategoryList}}
      }));
    },
    updateSelectedCategory(categoryId: number, selected: boolean) {
      const currentState = getState(store);
      currentState.allSubCategory.forEach((subCategory) => {
        if (subCategory.category.id === categoryId) {
          subCategory.selected = selected;
          subCategory.subCategories = subCategory.subCategories.map(subCategory => {
            return {...subCategory, selected: selected}
          });
        } else {
          const selectedCategory = subCategory.subCategories?.find(subCategory => subCategory.category.id === categoryId);
          if (selectedCategory) {
            selectedCategory.selected = selected;
            if (selectedCategory.category.subCategories)
              selectedCategory.category.subCategories = selectedCategory.category.subCategories.map(subCategory => {
                return {...subCategory, selected: selected}
              });
          }
        }
      });
      patchState(store, (state) => ({
        ...state, allSubCategory: currentState.allSubCategory
      }))
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

export function getAllCategories(category: CategoryDetailedDto | undefined): number[] {
  let categoryIds: number[] = [];
  if (category) {
    categoryIds.push(category.id);
    category.subCategories?.forEach(value => {
      categoryIds = categoryIds.concat(getAllCategories(value));
    })
  }
  return categoryIds;
}
