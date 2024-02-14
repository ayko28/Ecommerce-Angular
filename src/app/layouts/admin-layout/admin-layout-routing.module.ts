import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { ErrorLogComponent } from './error-log/error-log.component';

const routes: Routes = [
 // { path: '', component: AdminLayoutComponent },
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user',           component: UserComponent },
  { path: '', loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule) },
  { path: 'users', loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule) },
 { path: 'commission', loadChildren: () => import('./manage-commission/manage-commission.module').then(m => m.ManageCommissionModule) },
 {path:'errors',component:ErrorLogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
