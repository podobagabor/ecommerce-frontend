import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from "./cart/cart.component";
import {ShoppingRoutingModule} from "./shopping-routing.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule
  ]
})
export class ShoppingModule { }
