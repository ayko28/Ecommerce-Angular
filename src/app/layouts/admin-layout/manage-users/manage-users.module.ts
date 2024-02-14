import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';
import { CustomersComponent } from './customers/customers.component';
import { SellersComponent } from './sellers/sellers.component';
import { DisplaySellersComponent } from './sellers/display-sellers/display-sellers.component';
import { SellersAddEditComponent } from './sellers/sellers-add-edit/sellers-add-edit.component';
//import { DisplayCustomersComponent } from './customers/display-customers/display-customers.component';
import { CustomersAddEditComponent } from './customers/customers-add-edit/customers-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DisplayCustomersPagingComponent } from './customers/display-customers-paging/display-customers-paging.component';


@NgModule({
  declarations: [
    ManageUsersComponent,
    CustomersComponent,
    SellersComponent,
    DisplaySellersComponent,
    SellersAddEditComponent,
  //  DisplayCustomersComponent,
    CustomersAddEditComponent,
    DisplayCustomersPagingComponent,
   
    
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    NgSelectModule,
    ManageUsersRoutingModule
  ]
})
export class ManageUsersModule { }
