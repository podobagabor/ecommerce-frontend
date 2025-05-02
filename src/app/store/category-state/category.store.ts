import {CategoryDetailedDto} from "../../api/models/category-detailed-dto";
import {getState, patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, effect, inject} from "@angular/core";
import {CategoryControllerService} from "../../api/services/category-controller.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";

export interface SelectableCategory {
  category: CategoryDetailedDto,
  selected: boolean,
  subCategories: { category: CategoryDetailedDto, selected: boolean }[],
}

type CategoryState = {
  categories: SelectableCategory[],
  mainCategory: CategoryDetailedDto,
  availableCategoriesIdList: number[],
  isLoading: boolean,
}

const initialCategoryState: CategoryState = {
  categories: [],
  mainCategory: {id: 0},
  availableCategoriesIdList: [],
  isLoading: false,
}

export const CategoryStore = signalStore(
  {providedIn: 'root'},
  withState(initialCategoryState),
  withComputed(({categories, availableCategoriesIdList}) => ({
    categoryFilters: computed(() => {
      let categoryIds: number[] = [];
      categories().forEach(category => {
        if (category.selected) {
          categoryIds.push(category.category.id);
        }
        category.subCategories?.forEach(value => {
          if (value.selected) {
            categoryIds.push(value.category.id);
          }
        })
      })
      if (!categoryIds.length) {
        return availableCategoriesIdList();
      } else {
        return categoryIds;
      }
    })
  })),
  withMethods((store, categoryService = inject(CategoryControllerService)) => ({
    updateAllCategory: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap((categoryId) => {
          return categoryService.getCategoryDetailedById({id: categoryId}).pipe(
            tapResponse({
                next: (response) => {
                  const categories = response.subCategories?.map((subCat: CategoryDetailedDto) => {
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
                  patchState(store, {
                    categories: categories, availableCategoriesIdList: getAllCategories(response), mainCategory: response
                  });
                },
                error: error => {
                  console.error(error)
                },
              }
            )
          )
        })
      )),
    updateSelectedCategory(categoryId: number, selected: boolean) {
      const currentState = getState(store);
      currentState.categories.forEach((subCategory) => {
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
      patchState(store, () => ({categories: [...currentState.categories]}))
    }
  })),
  withHooks({
    onInit(store) {
      if (localStorage.getItem("categories")) {
        patchState(store, {...(JSON.parse(<string>localStorage.getItem("categories")) as CategoryState)});
      }

      effect(() => {
        const state = getState(store);
        localStorage.setItem("categories", JSON.stringify(state));
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
