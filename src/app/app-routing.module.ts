import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./components/features/product/product.module').then(m => m.ProductModule),
    canActivate: []
  },
  {
    path: 'shopping',
    loadChildren: () => import('./components/features/shopping/shopping.module').then(m => m.ShoppingModule),
    canActivate: []
  },
  {
    path: 'home',
    loadChildren: () => import('./components/features/home/home.module').then(m => m.HomeModule),
    canActivate: []
  },
  {
    path: 'user',
    loadChildren: () => import('./components/features/user/user.module').then(m => m.UserModule),
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/features/admin/admin.module').then(m => m.AdminModule),
    canActivate: []
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
