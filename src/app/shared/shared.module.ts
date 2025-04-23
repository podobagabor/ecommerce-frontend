import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryMenuComponent} from './layout/category-menu/category-menu.component';
import {CustomMaterialModule} from "../custom-material/custom-material.module";
import { CategoryMenuItemComponent } from './layout/category-menu-item/category-menu-item.component';


@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    CategoryMenuComponent,
    CustomMaterialModule,
  ],
  declarations: [
    CategoryMenuComponent,
    CategoryMenuItemComponent
  ]
})
export class SharedModule {
}
