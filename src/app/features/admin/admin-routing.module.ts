import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {NgModule} from "@angular/core";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ArticleFormComponent} from "./article-form/article-form.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {OrderManageComponent} from "./order-manage/order-manage.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'productCreate', component: ProductFormComponent},
      {path: 'product/:productId', component: ProductFormComponent},
      {path: 'articleCreate', component: ArticleFormComponent},
      {path: 'productList', component: ProductListComponent},
      {path: 'categoryList', component: CategoryListComponent},
      {path: 'categoryCreate', component: CategoryFormComponent},
      {path: 'orders', component: OrderManageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
