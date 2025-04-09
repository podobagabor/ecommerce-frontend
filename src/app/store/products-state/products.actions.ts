import {createActionGroup, props} from "@ngrx/store";
import {ProductDto} from "../../api/models/product-dto";

export const ProductsActions = createActionGroup({
  source: "Products",
  events: {
    'loadProducts': props<{ products: ProductDto[] }>()
  }
})
