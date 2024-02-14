import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { OrderComponent } from './order/order.component';
import { CartDbComponent } from './cart-db/cart-db.component';
import { ProductsComponent } from './products/products.component';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { NavbarModule } from 'src/app/shared_paper/navbar/navbar.module';
import { MultiselectddlComponent } from 'src/app/Core/Components/multiselectddl/multiselectddl.component';
import { FilterBySellerPipe } from 'src/app/shared/Pipe/filter-by-seller.pipe';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestModalComponent } from './test-modal/test-modal.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { ResolvePromisePipe } from 'src/app/shared/Pipe/resolve-promise.pipe';
import { DisplayOrderdetailComponent } from './orders/display-orderdetail/display-orderdetail.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';
import { FilterByCustomerPipe } from 'src/app/shared/Pipe/filter-by-customer.pipe';
//import { RazorpayComponent } from 'src/app/Core/Components/razorpay/razorpay.component';
import{SharedModule} from 'src/app/layouts/shared.module';
import { ProfileComponent } from './profile/profile.component'

import { BrowserModule } from '@angular/platform-browser';
import { NotepadOrderComponent } from './notepad-order/notepad-order.component';
import { CartInNotepadComponent } from './cart-in-notepad/cart-in-notepad.component';
import { RegisterrequestconsumerComponent } from './registerrequestconsumer/registerrequestconsumer.component';
@NgModule({
  declarations: [
   // CustomerComponent
  
    OrderComponent,
   CartDbComponent,
   ProductsComponent,
   FilterBySellerPipe,FilterByCustomerPipe
   ,ResolvePromisePipe,
   ProductdetailComponent,
   TestModalComponent,
   CheckoutComponent,
   OrdersComponent
   ,DisplayOrderdetailComponent, SignupcustomerComponent, ProfileComponent, NotepadOrderComponent, CartInNotepadComponent,  RegisterrequestconsumerComponent
   //,TypeaheadTemplateComponent
   //,RazorpayComponent
  ],
  imports: [
    NgbModule,
    SharedModule,
    CommonModule,
    CustomerRoutingModule,
    FormsModule,ReactiveFormsModule
    // ,NgMultiSelectDropDownModule.forRoot() /**/
    ,NgSelectModule
    ,NavbarModule//,NgbModule,NgbModalModule
  ]
  ,providers:[NgSelectConfig]//
  ,exports:[ProductdetailComponent]
  
  
})
export class CustomerModule { }
