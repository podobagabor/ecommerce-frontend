import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./custom-material/custom-material.module";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiModule} from "./api/api.module";
import {LayoutComponent} from './shared/layout/layout.component';
import {SharedModule} from "./shared/shared.module";
import {LoginComponent} from './features/home/login/login.component';
import {CategoryCardComponent} from './features/home/category-card/category-card.component';
import {RegistrationComponent} from './features/home/registration/registration.component';
import {CookieService} from "ngx-cookie-service";
import {ForgotPasswordComponent} from './features/home/forgot-password/forgot-password.component';
import {EmailVerifyComponent} from './features/home/email-verify/email-verify.component';
import {AuthHeaderInterceptor} from "./core/auth-header.interceptor";
import {NewPasswordComponent} from './features/home/new-password/new-password.component';
import {ChangePasswordComponent} from './features/user/change-password/change-password.component';
import {StoreModule} from '@ngrx/store';
import {savedReducer} from "./store/saved-state/saved.reducer";
import {cartReducer} from "./store/cart-state/cart.reducer";
import {userReducer} from "./store/user-state/user.reducer";
import {EffectsModule} from '@ngrx/effects';
import {CartEffects} from "./store/cart-state/cart.effects";
import {SavedEffects} from "./store/saved-state/saved.effects";
import {UserEffects} from "./store/user-state/user.effects";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    CategoryCardComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    EmailVerifyComponent,
    NewPasswordComponent,
    ChangePasswordComponent,
    LoginComponent,
  ],
  exports: [
    LayoutComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule.forRoot(),
    ApiModule.forRoot({rootUrl: 'http://localhost:4200'}),
    SharedModule,
    StoreModule.forRoot({
      savedProducts: savedReducer,
      cardProduct: cartReducer,
      user: userReducer
    }, {}),
    EffectsModule.forRoot([CartEffects, SavedEffects,UserEffects])],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  },
    CookieService, provideHttpClient(withInterceptorsFromDi()),]
})
export class AppModule {
}
