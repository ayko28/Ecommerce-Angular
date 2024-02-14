import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'aaa', component: AuthComponent },{  path: '',
component: LoginComponent}];
/* const routes: Routes = [{ path: '',  children: [
  {
    path: 'login',
    component: LoginComponent
  }
] }]; */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
