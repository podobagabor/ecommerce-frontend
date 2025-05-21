import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {CategoryMenuComponent} from './category-menu/category-menu.component';
import {CustomMaterialModule} from "../../core/custom-material/custom-material.module";
import {NgModule} from "@angular/core";
import {LayoutComponent} from "./layout/layout.component";

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
    LayoutComponent
  ],
  declarations: [
    CategoryMenuComponent,
    LayoutComponent
  ]
})
export class SharedModule {
}
