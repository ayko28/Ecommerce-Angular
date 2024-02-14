import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { ManageOrdersComponent } from './manage-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrdersGenericComponent } from './orders-generic/orders-generic.component';
import { PaidOrdersComponent } from './paid-orders/paid-orders.component';

const routes: Routes = [
  //{ path: '', component: ManageOrdersComponent }
  
  {
    path: '',
    component: ManageOrdersComponent,
    children: [
      {
        path:'',
        redirectTo:'Paid-Orders',
        pathMatch:'full'

      },
      {  path: 'New-Orders',     component: NewOrdersComponent},

      {  path: 'Paid-Orders',   component: OrdersGenericComponent,
      data: {
        selectedOrderStatus: 'PAID'
      }},

      {  path: 'Verified-Orders',    component: OrdersGenericComponent,
      data: {
        selectedOrderStatus: 'Verified'
      }},
      {  path: 'Dispatched-Orders',    component: OrdersGenericComponent,
      data: {
        selectedOrderStatus: 'Dispatched'
      }},
      {  path: 'Delievered-Orders',    component: OrdersGenericComponent,
      data: {
        selectedOrderStatus: 'Delievered'
      }},      
      {  path:'Complete-Orders', component:OrdersGenericComponent,
      data: {
        selectedOrderStatus: 'Completed'
      }
    }
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrdersRoutingModule { }
