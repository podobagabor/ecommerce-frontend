import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryEditDialogComponent } from './category-edit-dialog/category-edit-dialog.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import {FormsModule} from "@angular/forms";
import {MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from "@angular/material/tree";
import { BrandFormComponent } from './brand-form/brand-form.component';
import { BrandListComponent } from './brand-list/brand-list.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductFormComponent,
    ArticleFormComponent,
    ProductListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CategoryEditDialogComponent,
    OrderManageComponent,
    BrandFormComponent,
    BrandListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    MatTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle
  ]
})
export class AdminModule { }
