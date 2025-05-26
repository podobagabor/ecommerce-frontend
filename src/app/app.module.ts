import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./core/custom-material/custom-material.module";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApiModule} from "./api/api.module";
import {SharedModule} from "./components/shared/shared.module";
import {CookieService} from "ngx-cookie-service";
import {AuthHeaderInterceptor} from "./core/interceptors/auth-header.interceptor";
import {StoreModule} from '@ngrx/store';
import {savedReducer} from "./core/store/saved-state/saved.reducer";
import {cartReducer} from "./core/store/cart-state/cart.reducer";
import {userReducer} from "./core/store/user-state/user.reducer";
import {EffectsModule} from '@ngrx/effects';
import {CartEffects} from "./core/store/cart-state/cart.effects";
import {SavedEffects} from "./core/store/saved-state/saved.effects";
import {UserEffects} from "./core/store/user-state/user.effects";
import {HttpErrorInterceptor} from "./core/interceptors/http-error.interceptor";
import {AdminModule} from "./components/features/admin/admin.module";
import {HomeModule} from "./components/features/home/home.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    AdminModule,
    HomeModule,
    BrowserAnimationsModule,
    CustomMaterialModule.forRoot(),
    ApiModule.forRoot({rootUrl: 'http://localhost:4200'}),
    SharedModule,
    StoreModule.forRoot({
      savedProducts: savedReducer,
      cardProduct: cartReducer,
      user: userReducer
    }, {}),
    EffectsModule.forRoot([CartEffects, SavedEffects, UserEffects])],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    CookieService, provideHttpClient(withInterceptorsFromDi()),]
})
export class AppModule {
}
