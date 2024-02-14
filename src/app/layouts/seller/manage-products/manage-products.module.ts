import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductsRoutingModule } from './manage-products-routing.module';
import { ManageProductsComponent } from './manage-products.component';
//import { DisplayProductComponent } from './display-product/display-product.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { DisplayproductpagingComponent } from './displayproductpaging/displayproductpaging.component';


@NgModule({
  declarations: [
    ManageProductsComponent,
   // DisplayProductComponent,
    ProductAddEditComponent,
    ProductDetailComponent,
    ProductQuantityComponent,
    DisplayproductpagingComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    ManageProductsRoutingModule
  ]
})
export class ManageProductsModule { }
