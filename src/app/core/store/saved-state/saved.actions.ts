import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {ProductDto} from "../../../api/models/product-dto";

export const SavedActions = createActionGroup({
  source: "Saved",
  events: {
    'Save product': props<{ product: ProductDto }>(),
    'Remove Product': props<{ productId: number }>(),
    'Init': emptyProps(),
    'SetValue': props<{ products: ProductDto[] }>(),
  }
})
