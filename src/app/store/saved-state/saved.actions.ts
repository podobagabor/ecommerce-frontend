import {createActionGroup, props} from "@ngrx/store";

export const SavedActions = createActionGroup({
  source: "Saved",
  events: {
    'Add Product': props<{ productId: number }>(),
    'Remove Product': props<{ productId: number }>(),
    'Init': props<{ productIds: number[] }>(),
  }
})
