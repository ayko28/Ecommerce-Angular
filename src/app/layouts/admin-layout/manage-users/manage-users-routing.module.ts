import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DboysComponent } from '../../seller/dboys/dboys.component';
import { CustomersComponent } from './customers/customers.component';


import { ManageUsersComponent } from './manage-users.component';
import { SellersComponent } from './sellers/sellers.component';

const routes: Routes = [{ path: '', component: ManageUsersComponent ,

children: [
  {
    path:'',
    redirectTo:'Sellers',
    pathMatch:'full'

  },
  {
    path: 'Customers',
    component: CustomersComponent
  },
  {
    path: 'Sellers',
    component: SellersComponent
  },
  {
    path: 'DBoys',
    component: DboysComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
