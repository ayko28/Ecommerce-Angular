import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionSettingComponent } from './commission-setting/commission-setting.component';
import { ManageCommissionComponent } from './manage-commission.component';
import { SellerCommissionComponent } from './seller-commission/seller-commission.component';

const routes: Routes = [{ path: '', component: ManageCommissionComponent,
children: [
  {
    path:'',
    redirectTo:'commission_setting',
    pathMatch:'full'

  },
  {
    path: 'commission_setting',
    component: CommissionSettingComponent
  },
  {
    path: 'seller_commission',
    component: SellerCommissionComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCommissionRoutingModule { }
