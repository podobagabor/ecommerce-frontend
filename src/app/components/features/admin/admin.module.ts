import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ProductFormComponent} from './product/product-form/product-form.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {CategoryListComponent} from './category/category-list/category-list.component';
import {CategoryFormComponent} from './category/category-form/category-form.component';
import {CategoryEditDialogComponent} from './category/category-edit-dialog/category-edit-dialog.component';
import {OrderManageComponent} from './order-manage/order-manage.component';
import {FormsModule} from "@angular/forms";
import {BrandFormComponent} from './brand/brand-form/brand-form.component';
import {BrandListComponent} from './brand/brand-list/brand-list.component';
import {DeliveryInfoDialogComponent} from './delivery-info-dialog/delivery-info-dialog.component';
import {CustomMaterialModule} from "../../../core/custom-material/custom-material.module";


@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CategoryEditDialogComponent,
    OrderManageComponent,
    BrandFormComponent,
    BrandListComponent,
    DeliveryInfoDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    CustomMaterialModule
  ]
})
export class AdminModule {
}
