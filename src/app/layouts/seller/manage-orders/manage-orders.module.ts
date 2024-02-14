import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import { ManageOrdersComponent } from './manage-orders.component';
import { SellernavigationComponent } from '../sellernavigation/sellernavigation.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { PaidOrdersComponent } from './paid-orders/paid-orders.component';
import { DisplayOrderdetailComponent } from './display-orderdetail/display-orderdetail.component';
//import { GroupByPipe } from 'src/app/shared/Pipe/group-by.pipe';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { OrdersGenericComponent } from './orders-generic/orders-generic.component';
import { SharedModule } from '../../shared.module';
import { OrderDetailsModalComponent } from './order-details-modal/order-details-modal.component';


@NgModule({
  declarations: [
    ManageOrdersComponent,
    NewOrdersComponent,
    PaidOrdersComponent,
    DisplayOrderdetailComponent,
    //SellernavigationComponent
    //GroupByPipe,
    CompletedOrdersComponent,
    OrdersGenericComponent,
    OrderDetailsModalComponent
  ],
  imports: [
    CommonModule,
    ManageOrdersRoutingModule,SharedModule
  ]
})
export class ManageOrdersModule { }
