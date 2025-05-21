import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {CartElementDto} from "../../../api/models/cart-element-dto";
import {ProductDto} from "../../../api/models/product-dto";

export const CartActions = createActionGroup({
  source: "Cart",
  events: {
    'Init': emptyProps(),
    'Save Cart Element': props<{ product: ProductDto }>(),
    'Add Cart Element': props<{ cartElement: CartElementDto }>(),
    'Delete Cart ElementFromUser': props<{ cartElement: CartElementDto }>(),
    'Remove Cart Element': props<{ cartElementId: number }>(),
    'SetValue': props<{ cartElements: CartElementDto[] }>(),
  }
})
