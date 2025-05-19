import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {NgModule} from "@angular/core";
import {ProductFormComponent} from "./product/product-form/product-form.component";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {CategoryListComponent} from "./category/category-list/category-list.component";
import {CategoryFormComponent} from "./category/category-form/category-form.component";
import {OrderManageComponent} from "./order-manage/order-manage.component";
import {BrandFormComponent} from "./brand/brand-form/brand-form.component";
import {BrandListComponent} from "./brand/brand-list/brand-list.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'productCreate', component: ProductFormComponent},
      {path: 'product/:productId', component: ProductFormComponent},
      {path: 'productList', component: ProductListComponent},
      {path: 'categoryList', component: CategoryListComponent},
      {path: 'categoryCreate', component: CategoryFormComponent},
      {path: 'orders', component: OrderManageComponent},
      {path: 'brandCreate', component: BrandFormComponent},
      {path: 'brand/:brandId', component: BrandFormComponent},
      {path: 'brandList', component: BrandListComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
