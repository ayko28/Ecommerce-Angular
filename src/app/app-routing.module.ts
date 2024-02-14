import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './Core/Data/Models/role';
import { AuthGuard } from './Core/Guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { CustomerComponent } from './layouts/customer/customer.component';
import { SellerComponent } from './layouts/seller/seller.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';

const routes: Routes =[
  {
    path: 'dashbaord',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: 'admin',
    
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      , canActivate: [AuthGuard],
  data: { roles: [Role.Admin]}
  }]},
  { path: 'home', component:CustomerComponent},
 
  {path:'test2',component:Test2Component},
 
  { path: '', component:CustomerComponent,
  children: [
      {
    path: '',
    loadChildren: () => import('./layouts/customer/customer.module').then(m => m.CustomerModule) 
 /*  */
}]},
{ path: 'seller', component:SellerComponent,
children: [
    {
  path: ''
, loadChildren: () => import('./layouts/seller/seller.module').then(m => m.SellerModule) 
, canActivate: [AuthGuard],data: { roles: [Role.Seller,Role.Admin]}
}]},

  {
    path: '**',
    redirectTo: 'dashboard'
  }

  ,{path:'aaaaaaaaaaaaaaaaa',component:TestComponent},
 // { path: 'Auth', loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule) }
 { path: 'Auth', component:AuthComponent,
 children: [
     {
   path: '',
   loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
}]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
