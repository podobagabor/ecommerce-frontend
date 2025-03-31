import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from './home/home.component';
import {UserSettingsComponent} from "../user/user-settings/user-settings.component";
import {ArticleComponent} from './article/article.component';
import {OrdersComponent} from "../user/orders/orders.component";


@NgModule({
  declarations: [
    HomeComponent,
    UserSettingsComponent,
    ArticleComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
})
export class HomeModule {
}
