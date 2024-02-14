import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { PromotionService } from 'src/app/shared/Services/promotion.service';
import { UserService } from 'src/app/shared/Services/user.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display-quantity-promotion',
  templateUrl: './display-quantity-promotion.component.html',
  styleUrls: ['./display-quantity-promotion.component.scss']
})
export class DisplayQuantityPromotionComponent {






  @Output() promoproduct_id_for_Addedit=new EventEmitter<number>();
  @Output() product_id_for_Detail=new EventEmitter();
  @Output() product_id_Selected=new EventEmitter<number>();
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  products!:any[];promotions_product!:any[];
  product_Selected:any;
  categoryList:any[]=[];sellerList:any[]=[];

  @Output() quantityStagesFormArrayChange: EventEmitter<FormArray> = new EventEmitter<FormArray>();
  quantityStagesFormArray!: FormArray;

  
 constructor(public servCommon:CommonService,private servCategory:CategoryService
  ,private servProduct:ProductService,private servPromoProduct:PromotionService
  ,private authServ:AuthenticationService,private servUser:UserService
  ,private formBuilder:FormBuilder){

 }

 async ngOnInit(){
 
  //this.getProductList(); 
  await  this.get_quantity_promotions_Of_seller(); this.ExtractProductIdsForProductList();
  this.getSellerList();

  this.getCategories();
  
  this.eventsSubscription = this.events.subscribe(() =>  this.get_quantity_promotions_Of_seller());//getProductList
}

getProductName(QuantityPromotions_id: number): string {
  // Retrieve the customer name based on the order ID from the customers array
  const order =this.promotions_product.find(o => o.QuantityPromotions_id === QuantityPromotions_id);
  const prodId = order?.productId;
  const product =this.products.find(p => p.id === prodId);
  return product?.product_name || '';
  
} 
getPromotionName(QuantityPromotions_id: number): string {
  // Retrieve the customer name based on the order ID from the customers array
  const order =this.promotions_product.find(o => o.QuantityPromotions_id === QuantityPromotions_id);
  return order?.promotionName;
   
} 

getCategories(){
  this.servCategory.getCategorys().subscribe((res:any)=>{this.categoryList=res});
  }
  getSellerList(){
    this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{this.sellerList=res});
    }
  // Logic to initialize the quantityStagesFormArray

  // Emit the quantityStagesFormArray
  emitQuantityStagesFormArray(): void {
    this.quantityStagesFormArrayChange.emit(this.quantityStagesFormArray);
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
   this.promoproduct_id_for_Addedit.emit(param_Product.key);
   
   //fill now quantityStagesFormArray ----------------------------------------
   this.get_quantity_promotions_ById(param_Product.key).subscribe((res:any)=>{
   res.forEach((item:any)=> {
    this.quantityStagesFormArray.push(this.createQuantityStage(item));
  });
});//------------------------------------------------------------------------


 }

 createQuantityStage(item: any): FormGroup {
  return this.formBuilder.group({
    quantityRangeStart: item.quantityRangeStart,
    quantityRangeEnd: item.quantityRangeEnd,
    discountPercentage: item.discountPercentage
  });
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
get_product_promotions_notinuse(){
  this.servPromoProduct.get_Promotion_Product_Seller(this.authServ.currentUserValue!.id).subscribe((res:any)=>{
 this.promotions_product=res;
    
 });
 }

 get_quantity_promotions_ById(param_id:any):any{
  
  return new Promise((resolve, reject) => {
  this.servPromoProduct.get_Promotion_QuantityById(param_id).subscribe((res:any)=>{
 //=res;
    console.log('see here get_quantity_promotions_ById aaaaaaaaaaaaaaa');console.log(res);
    
    resolve(res);
 });


 })
}
 get_quantity_promotions_Of_seller(){
  
  return new Promise((resolve, reject) => {
  this.servPromoProduct.get_Promotion_Quantity_Seller(this.authServ.currentUserValue!.id).subscribe((res:any)=>{
 this.promotions_product=res;
    console.log('see here quantity promotions');console.log(res);
    
    resolve(true);
 });


 })
}


ExtractProductIdsForProductList(){
  var productIdList_CommaDelimited:string='';
  
this.promotions_product.forEach((aQuantityPromo) => {
  productIdList_CommaDelimited+=aQuantityPromo.productId+",";
  
})
console.log('productIdList_CommaDelimited:'+productIdList_CommaDelimited)


localStorage.setItem('productIdList_CommaDelimited',productIdList_CommaDelimited);

//end

////getproductList from commaseperated stored in localStorage
const productIds=localStorage.getItem("productIdList_CommaDelimited")?.toString();
this.servProduct.getProductByIds(productIds).subscribe((res:any)=>{
  this.products=res; console.log('products by ids:'+JSON.stringify(this.products))
});




}

}



