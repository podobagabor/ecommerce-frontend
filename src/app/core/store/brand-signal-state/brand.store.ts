import {getState, patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {BrandControllerService} from "../../../api/services/brand-controller.service";
import {effect, inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {BrandSimpleDto} from "../../../api/models/brand-simple-dto";

export interface SelectableBrand {
  brand: BrandSimpleDto,
  selected: boolean
}

type BrandState = {
  brands: SelectableBrand[],
  isLoading: boolean,
}

const initialState: BrandState = {
  brands: [],
  isLoading: false,
}

export const BrandStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, brandService = inject(BrandControllerService)) => ({
      loadBrands: rxMethod(
        pipe(
          tap(() => patchState(store, {isLoading: true})),
          switchMap(() => {
            return brandService.getBrands().pipe(
              tapResponse({
                next: (brands) => {
                  patchState(store, {
                    brands: brands.map(brand => {
                      return {
                        brand: brand,
                        selected: false,
                      }
                    })
                  })
                },
                error: error => {
                  console.error(error)
                },
                finalize: () => patchState(store, {isLoading: false}),
              })
            )
          })
        )),
      selectBrand(selectedBrandId: number, selected: boolean) {
        const currentState = getState(store);
        const selectedBrand = currentState.brands.find(brand => brand.brand.id === selectedBrandId);
        if (selectedBrand) {
          selectedBrand.selected = selected;
        }
        patchState(store, (state) => ({brands: [...state.brands]}))
      }
    }),
  ),
  withHooks({
    onInit(store) {
      if (localStorage.getItem("brands")) {
        patchState(store, {...(JSON.parse(<string>localStorage.getItem("brands")) as BrandState)});
      }

      effect(() => {
        const state = getState(store);
        localStorage.setItem("brands", JSON.stringify(state));
      });
    }
  }),
)
