import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "../../shared/layout/layout.component";
import {HomeModule} from "./home.module";
import {HomeComponent} from "./home/home.component";
import {UserSettingsComponent} from "../user/user-settings/user-settings.component";
import {OrdersComponent} from "../user/orders/orders.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'userSettings', component: UserSettingsComponent},
      {path: 'orders', component: OrdersComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
