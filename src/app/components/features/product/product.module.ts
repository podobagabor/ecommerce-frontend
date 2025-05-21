import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductCardComponent} from "./product-card/product-card.component";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {SharedModule} from "../../shared/shared.module";
import {ProductRoutingModule} from "./product-routing.module";
import { SavedProductsComponent } from './saved-products/saved-products.component';
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsListComponent,
    ProductDetailComponent,
    SavedProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    FormsModule,
    MatSliderModule
  ]
})
export class ProductModule { }
