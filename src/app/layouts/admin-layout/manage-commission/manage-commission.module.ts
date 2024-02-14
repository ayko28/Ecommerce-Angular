import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCommissionRoutingModule } from './manage-commission-routing.module';
import { ManageCommissionComponent } from './manage-commission.component';
import { CommissionSettingComponent } from './commission-setting/commission-setting.component';
import { SellerCommissionComponent } from './seller-commission/seller-commission.component';
import { DisplayCommisionPercentsComponent } from './display-commision-percents/display-commision-percents.component';
import { CommisionPercentsAddEditComponent } from './commision-percents-add-edit/commision-percents-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ManageCommissionComponent,
    CommissionSettingComponent,
    SellerCommissionComponent,
    DisplayCommisionPercentsComponent,
    CommisionPercentsAddEditComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    NgSelectModule,
    ManageCommissionRoutingModule
  ]
})
export class ManageCommissionModule { }
