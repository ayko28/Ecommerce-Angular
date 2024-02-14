import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { OrderComponent } from './order/order.component';
import { CartDbComponent } from './cart-db/cart-db.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from 'src/app/Core/Guards/auth.guard';
import { Role } from 'src/app/Core/Data/Models/role';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';
import { ProfileComponent } from './profile/profile.component';
import { NotepadOrderComponent } from './notepad-order/notepad-order.component';
import { CartInNotepadComponent } from './cart-in-notepad/cart-in-notepad.component';

import { RegisterrequestconsumerComponent } from './registerrequestconsumer/registerrequestconsumer.component';

const routes: Routes = [{ path: 'aaa', component: CustomerComponent },
{ path: 'abc',      component: OrderComponent },
{ path: 'cartDB',           component: CartDbComponent
, canActivate: [AuthGuard],
data: { roles: [Role.Customer]}
},
{ path: '',           component: ProductsComponent },
{path:'checkout',component:CheckoutComponent

, canActivate: [AuthGuard],
data: { roles: [Role.Customer]}
},
{path:'orders',component:OrderComponent

, canActivate: [AuthGuard], data: { roles: [Role.Customer]}
}
,{path:'signupcustomer',component:SignupcustomerComponent}
,{path:'registerequestconsumer/:mobilenumber',component:RegisterrequestconsumerComponent}
,{path:'profile',component:ProfileComponent}
,{path:'notepadOrder/:passed_sellerid/:passed_sellerIds',component:CartInNotepadComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
