import { Component, EventEmitter, Output, Input,HostListener } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { SellercommissionService } from 'src/app/shared/Services/sellercommission.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-display-customers-paging',
  templateUrl: './display-customers-paging.component.html',
  styleUrls: ['./display-customers-paging.component.scss']
})
export class DisplayCustomersPagingComponent {


  page: number = 1;
  limit: number = 10;
  loading: boolean = false;
  endOfResults: boolean = false;




  @Output() customer_id_for_Addedit=new EventEmitter<number>();
  @Output() customer_id_for_Detail=new EventEmitter();
  @Output() product_id_Selected=new EventEmitter<number>();
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  Seller_Commission_Setting!:any[];
  customers:any[]=[];
  product_Selected:any;
  categoryList:any[]=[];
  users!:any[];

 constructor(public servCommon:CommonService,private servCategory:CategoryService,
  private servProduct:ProductService,
  private servSellerCommission:SellercommissionService,
  private servUser:UserService,
  private authServ:AuthenticationService){

 }
 
 @HostListener('window:scroll', ['$event'])
onScroll(event: any) {
    const currentScrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    
    if (currentScrollPosition >= document.documentElement.scrollHeight - 100 && !this.loading && !this.endOfResults) {
        this.get_Users_role_Paging();
    }
}

 ngOnInit(){
  this.get_Users();
  setTimeout(() => {
  //  this.get_seller_commission_percents();   
  this.get_Users_role_Paging();

  this.getCategories();
  
  this.eventsSubscription = this.events.subscribe(() => this.get_Users_role_Paging());
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
 //  this.customer_id_for_Addedit.emit(undefined)

 get_Users(){
  this.servUser.getUsers('').subscribe((res:any)=>{
    //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
    this.users=res;
    
 });}

 addProduct(){
  this.customer_id_for_Addedit.emit(0);
 }
 editProduct(param_Product:any){ 
  this.customer_id_for_Detail.emit(undefined);
   this.customer_id_for_Addedit.emit(param_Product.id);
 }
 selectProduct(param_Product:any){
  this.customer_id_for_Addedit.emit(undefined);
   this.customer_id_for_Detail.emit(param_Product.id);
 }

 get_Users_role_Paging(){
 // this.servUser.getUsers_Of_role_paging('Customer').subscribe((res:any)=>{
 //this.customers=res; });
 
 this.loading = true;

 // Call your service method to get more customers
 //dont pass here last parameter seller_id as this comp is of admin
 this.servUser.getUsers_Of_role_paging(this.page,this.limit,'Customer').subscribe((data: any) => {
   console.log('data pulled paging:'+data); 
     if (data.length === 0) {
         this.endOfResults = true;
     } else {
         this.customers.push(...data);
         this.page++;
     }
     this.loading = false;
 });

 }

}

