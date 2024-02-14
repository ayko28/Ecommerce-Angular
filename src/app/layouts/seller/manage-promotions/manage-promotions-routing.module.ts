import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePromotionsComponent } from './manage-promotions.component';
import { OrderPromotionsComponent } from './order-promotions/order-promotions.component';
import { ProductPromotionsComponent } from './product-promotions/product-promotions.component';
import { QuantityPromotionsComponent } from './quantity-promotions/quantity-promotions.component';

const routesdeleted: Routes = [{ path: '', component: ManagePromotionsComponent }];

const routes: Routes = [
  {
    path: '',
    component: ManagePromotionsComponent,
    children: [
      {
        path:'',
        redirectTo:'Product-Promotions',
        pathMatch:'full'

      },
      {
        path: 'Product-Promotions',
        component: ProductPromotionsComponent
      },
      {
        path:'Quantity-Promotions',
        component:QuantityPromotionsComponent
      },
      {
        path: 'Order-Promotions',
        component: OrderPromotionsComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePromotionsRoutingModule { }
