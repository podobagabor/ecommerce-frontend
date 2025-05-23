import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {OrdersComponent} from "./orders/orders.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {SharedModule} from "../../shared/shared.module";
import {UserRoutingModule} from "./user-routing.module";


@NgModule({
  declarations: [
    ChangePasswordComponent,
    OrdersComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
