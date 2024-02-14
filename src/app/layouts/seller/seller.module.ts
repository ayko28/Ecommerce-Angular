import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from 'src/app/shared_paper/navbar/navbar.module';
import { SellernavigationComponent } from './sellernavigation/sellernavigation.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaycommissionComponent } from './paycommission/paycommission.component';
import { DboysComponent } from './dboys/dboys.component';
import { DisplayDboysComponent } from './dboys/display-dboys/display-dboys.component';
import { DboyAddEditComponent } from './dboys/dboy-add-edit/dboy-add-edit.component';
import { SharedModule } from '../shared.module';

//import { RazorpayComponent } from 'src/app/Core/Components/razorpay/razorpay.component';


@NgModule({
  declarations: [
    //SellerComponent,
  

  
   // SellernavigationComponent
  
    PaycommissionComponent,
    DboysComponent,
    DisplayDboysComponent,
    DboyAddEditComponent,
    //RazorpayComponent
    
  ],
  imports: [
    SharedModule,
    CommonModule,
  FormsModule,ReactiveFormsModule ,NavbarModule,
  BsDatepickerModule.forRoot(),
    SellerRoutingModule
  ]
  //,exports:[RazorpayComponent]
})
export class SellerModule { }
