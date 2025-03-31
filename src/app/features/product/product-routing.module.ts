import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductsListComponent} from "./products-list/products-list.component";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {SavedProductsComponent} from "./saved-products/saved-products.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'list', component: ProductsListComponent},
      {path: 'saved', component: SavedProductsComponent},
      {path: ':productId', component: ProductDetailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
