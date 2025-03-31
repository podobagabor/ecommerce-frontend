import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule),
    canActivate: []
  },
  {
    path: 'shopping',
    loadChildren: () => import('./features/shopping/shopping.module').then(m => m.ShoppingModule),
    canActivate: []
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
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
