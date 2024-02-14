import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManagePromotionsRoutingModule } from './manage-promotions-routing.module';
import { ManagePromotionsComponent } from './manage-promotions.component';
import { OrderPromotionsComponent } from './order-promotions/order-promotions.component';
import { ProductPromotionsComponent } from './product-promotions/product-promotions.component';
import { DisplayProductPromotionComponent } from './product-promotions/display-product-promotion/display-product-promotion.component';
import { ProductPromotionAddEditComponent } from './product-promotions/product-promotion-add-edit/product-promotion-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DisplayOrderPromotionComponent } from './order-promotions/display-order-promotion/display-order-promotion.component';
import { OrderPromotionAddEditComponent } from './order-promotions/order-promotion-add-edit/order-promotion-add-edit.component';
import { QuantityPromotionsComponent } from './quantity-promotions/quantity-promotions.component';
import { DisplayQuantityPromotionComponent } from './quantity-promotions/display-quantity-promotion/display-quantity-promotion.component';
import { QuantityPromotionAddEditComponent } from './quantity-promotions/quantity-promotion-add-edit/quantity-promotion-add-edit.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [
    ManagePromotionsComponent,
    OrderPromotionsComponent,
    ProductPromotionsComponent,
    DisplayProductPromotionComponent,
    ProductPromotionAddEditComponent,
    DisplayOrderPromotionComponent,
    OrderPromotionAddEditComponent,
    QuantityPromotionsComponent,
    DisplayQuantityPromotionComponent,
    QuantityPromotionAddEditComponent
    
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ManagePromotionsRoutingModule,SharedModule
  ]
  ,exports:[ProductPromotionAddEditComponent]
  ,schemas: [CUSTOM_ELEMENTS_SCHEMA]
  ,providers:[DatePipe]
})
export class ManagePromotionsModule { }
