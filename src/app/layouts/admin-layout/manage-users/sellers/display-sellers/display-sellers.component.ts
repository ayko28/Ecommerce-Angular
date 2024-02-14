import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { SellercommissionService } from 'src/app/shared/Services/sellercommission.service';
import { UserService } from 'src/app/shared/Services/user.service';
@Component({
  selector: 'app-display-sellers',
  templateUrl: './display-sellers.component.html',
  styleUrls: ['./display-sellers.component.scss']
})
export class DisplaySellersComponent {




  @Output() seller_id_for_Addedit=new EventEmitter<number>();
  @Output() seller_id_for_Detail=new EventEmitter();
  @Output() product_id_Selected=new EventEmitter<number>();
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  Seller_Commission_Setting!:any[];
  sellers:any[]=[];
  product_Selected:any;
  categoryList:any[]=[];
  users!:any[];

 constructor(public servCommon:CommonService,private servCategory:CategoryService,
  private servProduct:ProductService,
  private servSellerCommission:SellercommissionService,
  private servUser:UserService,
  private authServ:AuthenticationService){

 }

 ngOnInit(){
  this.get_Users();
  setTimeout(() => {
  //  this.get_seller_commission_percents();   
  this.get_Users_seller_Only();

  this.getCategories();
  
  this.eventsSubscription = this.events.subscribe(() => this.get_Users_seller_Only());
  }, 2000);
}

getCategories(){
  this.servCategory.getCategorys().subscribe((res:any)=>{this.categoryList=res});
  }
ngOnDestroy() {
  this.eventsSubscription.unsubscribe();
}
 //logic tip: To hide product-add-edit component, pass undefined for product id
 // asbelow
 //  this.product_id_for_Addedit.emit(undefined)

 get_Users(){
  this.servUser.getUsers('').subscribe((res:any)=>{
    //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
    this.users=res;
    
 });}

 addProduct(){
  this.seller_id_for_Addedit.emit(0);
 }
 editProduct(param_Product:any){ 
  this.seller_id_for_Detail.emit(undefined);
   this.seller_id_for_Addedit.emit(param_Product.id);
 }
 selectProduct(param_Product:any){
  this.seller_id_for_Addedit.emit(undefined);
   this.seller_id_for_Detail.emit(param_Product.id);
 }

 get_Users_seller_Only(){
  this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{
 this.sellers=res;
    
 });
 }

}



