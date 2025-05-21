import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {EmailVerifyComponent} from "./email-verify/email-verify.component";


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NewPasswordComponent,
    ForgotPasswordComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,

  ],
})
export class HomeModule {
}
