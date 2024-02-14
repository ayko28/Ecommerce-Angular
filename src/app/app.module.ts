import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FooterModule } from './shared_paper/footer/footer.module';
import { FixedPluginModule } from './shared_paper/fixedplugin/fixedplugin.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared_paper/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { CustomerComponent } from './layouts/customer/customer.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationService } from './Core/Services/authentication.service';
import { AuthInterceptorService } from './Core/Services/auth-interceptor.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';

import { TestComponent } from './test/test.component';

import { MytestComponent } from './Core/Components/mytest/mytest.component';
import { ErrorComponent } from './Core/Components/Error/error.component';
//import { MultiselectddlComponent } from './Core/Components/multiselectddl/multiselectddl.component';

import { CustomerModule } from './layouts/customer/customer.module';
import { AuthModule } from './layouts/auth/auth.module';
import { SellerComponent } from './layouts/seller/seller.component';
import { SellernavigationComponent } from './layouts/seller/sellernavigation/sellernavigation.component';
import { Test2Component } from './test2/test2.component';
import { Test2ModalComponent } from './test2-modal/test2-modal.component';
import { FilterByStatusPipe } from './shared/Pipe/filter-by-status.pipe';


//import { RazorpayComponent } from './Core/Components/razorpay/razorpay.component';
//import { RazorpayComponent } from './Core/Components/razorpay/razorpay.component';

//import { GroupByPipe } from './shared/Pipe/group-by.pipe';
//import { FilterByCustomerPipe } from './shared/pipe/filter-by-customer.pipe';
//import { ResolvePromisePipe } from './shared/pipe/resolve-promise.pipe';
//import { AuthComponent } from './layouts/auth/auth.component';





@NgModule({
  declarations: [
    AppComponent,
  //  FooterComponent,
//    FixedpluginComponent
AdminLayoutComponent,CustomerComponent,
//AuthComponent,
  DashboardComponent,
  UserComponent,SellerComponent,
  TestComponent,
  MytestComponent,ErrorComponent//, MultiselectddlComponent
 ,SellernavigationComponent, Test2Component, Test2ModalComponent, FilterByStatusPipe,  //, RazorpayComponent, // GroupByPipe, //FilterByCustomerPipe
 
  ],
  imports: [
    HttpClientModule,NgbModule,CommonModule,FormsModule,ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    FooterModule,
    NavbarModule,CustomerModule,
    AuthModule,
    FixedPluginModule
    
    ,ToastrModule.forRoot()

    ,BsDatepickerModule.forRoot()
    // ,NgMultiSelectDropDownModule.forRoot()  /* */
    ,NgSelectModule
    //NgSelectModule,
        /*  ,NgxSelectModule */
      //, NgbModule,NgbModalModule
     
  ],
  providers: [
    DatePipe,
  //  NgSelectConfig,
    AuthenticationService, 
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptorService,
     multi: true
    }
  ],
  exports:[Test2ModalComponent],//MultiselectddlComponentMytestComponent,NnavbarComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    defineLocale('en-gb', enGbLocale); // define en-gb locale
  }
}
