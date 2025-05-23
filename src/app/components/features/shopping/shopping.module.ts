import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from "./cart/cart.component";
import {ShoppingRoutingModule} from "./shopping-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ShoppingModule {
}
