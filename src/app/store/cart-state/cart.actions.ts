import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {CartElementDto} from "../../api/models/cart-element-dto";
import {ProductDto} from "../../api/models/product-dto";

export const CartActions = createActionGroup({
  source: "Cart",
  events: {
    'Add Product': props<{ product: ProductDto }>(),
    'Remove Product': props<{ productId: number }>(),
    'Init': props<{ products: CartElementDto[] }>(),
    'Updated': emptyProps,
  }
})
