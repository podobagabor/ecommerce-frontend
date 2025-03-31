/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ProductServiceService } from './services/product-service.service';
import { CategoryServiceService } from './services/category-service.service';
import { UserServiceService } from './services/user-service.service';
import { OrderServiceService } from './services/order-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { ArticleServiceService } from './services/article-service.service';
import { ImageServiceService } from './services/image-service.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ProductServiceService,
    CategoryServiceService,
    UserServiceService,
    OrderServiceService,
    AuthServiceService,
    ArticleServiceService,
    ImageServiceService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
