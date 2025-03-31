import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {NgModule} from "@angular/core";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'cart', component: CartComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {
}
