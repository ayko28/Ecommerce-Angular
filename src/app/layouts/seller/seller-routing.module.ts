import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DboysComponent } from './dboys/dboys.component';
import { RegisterapproveconsumerComponent } from './manage-users/registerapproveconsumer/registerapproveconsumer.component';
import { PaycommissionComponent } from './paycommission/paycommission.component';
import { SellerComponent } from './seller.component';


const routes: Routes = [{ path: 'aa', component: SellerComponent }, 
{ path: '', loadChildren: () => import('./manage-products/manage-products.module').then(m => m.ManageProductsModule) },
{ path: 'manage_product', loadChildren: () => import('./manage-products/manage-products.module').then(m => m.ManageProductsModule) },
{ path: 'manage_orders', loadChildren: () => import('./manage-orders/manage-orders.module').then(m => m.ManageOrdersModule) }, 
{ path: 'manage_promotions', loadChildren: () => import('./manage-promotions/manage-promotions.module').then(m => m.ManagePromotionsModule)},
 { path: 'paycommission',component:PaycommissionComponent},
 
 {
  path: 'dboy',
  component: DboysComponent
},
{
  path:'registerapproveconsumer/:mobilenumber',component:RegisterapproveconsumerComponent
}
,{ path: 'users', loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
