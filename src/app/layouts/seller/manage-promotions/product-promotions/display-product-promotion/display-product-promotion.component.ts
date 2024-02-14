import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { PromotionService } from 'src/app/shared/Services/promotion.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-display-product-promotion',
  templateUrl: './display-product-promotion.component.html',
  styleUrls: ['./display-product-promotion.component.scss']
})
export class DisplayProductPromotionComponent {




  @Output() promoproduct_id_for_Addedit=new EventEmitter<number>();
  @Output() product_id_for_Detail=new EventEmitter();
  @Output() product_id_Selected=new EventEmitter<number>();
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  products!:any[];promotions_product!:any[];
  product_Selected:any;
  categoryList:any[]=[];sellerList:any[]=[];
 constructor(public servCommon:CommonService,private servCategory:CategoryService
  ,private servProduct:ProductService,private servPromoProduct:PromotionService
  ,private authServ:AuthenticationService,private servUser:UserService){

 }

 ngOnInit(){
 
  this.getProductList();   this.get_product_promotions(); this.getSellerList();

  this.getCategories();
  
  this.eventsSubscription = this.events.subscribe(() => this.get_product_promotions());//getProductList
}

getCategories(){
  this.servCategory.getCategorys().subscribe((res:any)=>{this.categoryList=res});
  }
  getSellerList(){
    this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{this.sellerList=res});
    }
  
ngOnDestroy() {
  this.eventsSubscription.unsubscribe();
}
 //logic tip: To hide product-add-edit component, pass undefined for product id
 // asbelow
 //  this.promoproduct_id_for_Addedit.emit(undefined)

 addProduct(){
  this.promoproduct_id_for_Addedit.emit(0);
 }
 editProduct(param_Product:any){ 
  this.product_id_for_Detail.emit(undefined);
   this.promoproduct_id_for_Addedit.emit(param_Product.id);
 }
 selectProduct(param_Product:any){
  this.promoproduct_id_for_Addedit.emit(undefined);
   this.product_id_for_Detail.emit(param_Product.id);
 }
/* get_products(){
 this.servProduct.getProducts(this.authServ.currentUserValue!.id).subscribe((res:any)=>{
this.products=res;
   console.log('aaaaaaa:'+JSON.stringify( this.authServ.currentUserValue!.id))
});
} */
getProductList(){

  this.servProduct.getProducts_All().subscribe((res:any)=>{this.products=res});
}
get_product_promotions(){
  this.servPromoProduct.get_Promotion_Product_Seller(this.authServ.currentUserValue!.id).subscribe((res:any)=>{
 this.promotions_product=res;
    
 });
 }


}



