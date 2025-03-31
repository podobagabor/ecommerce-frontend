import {createActionGroup, props} from "@ngrx/store";

export const SavedActions = createActionGroup({
  source: "Saved",
  events: {
    'Add Product': props<{ productId: string }>(),
    'Remove Product': props<{ productId: string }>(),
    'Init': props<{ productIds: string[] }>(),
  }
})
