import {createActionGroup, props} from "@ngrx/store";
import {ProductResponse} from "../../api/models/product-response";

export const ProductsActions = createActionGroup({
  source: "Products",
  events: {
    'loadProducts': props<{ products: ProductResponse[] }>()
  }
})
