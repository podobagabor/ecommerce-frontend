import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {CartItemResponse} from "../../api/models/cart-item-response";
import {ProductResponse} from "../../api/models/product-response";

export const CartActions = createActionGroup({
  source: "Cart",
  events: {
    'Add Product' : props<{ product: ProductResponse}>(),
    'Remove Product' : props<{ productId: string}>(),
    'Init' : props<{ products: CartItemResponse[]}>(),
    'Updated' : emptyProps,
  }
})
