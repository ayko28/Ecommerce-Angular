import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/shared/Services/order.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { ProductService } from 'src/app/shared/Services/product.service';

@Component({
  selector: 'app-paid-orders',
  templateUrl: './paid-orders.component.html',
  styleUrls: ['./paid-orders.component.scss']
})
export class PaidOrdersComponent {


  
   @Input() events!: Observable<void>;
   Selected_Order_id_for_detail!:number;

curr_Order_id_for_Detail:any;
  Paid_Orders_Of_Sellers!:any[]; 
  //user_Sellers!:any[];
  users!:any[];
  user_Selected:any;
  currentUser:any;
  products:any[]=[];customers:any[]=[];
 constructor(private servOrder:OrderService,private servProduct:ProductService,private servAuth:AuthenticationService,private servUser:UserService,public servCommon:CommonService){
  this.servAuth.currentUser.subscribe(x => this.currentUser = x);
 }

 ngOnInit(){
 
  this.get_Users();   
       this.get_Paid_Orders_Of_Seller();

     //  this.products=[{productId:1,product_name:'product_one'},{productId:2,product_name:'product_two'}];
     //  this.customers=[{userId:8,username:'customer8'}];
 }
 //-------------------------------------------------------------
  get_Paid_Orders_Of_Seller(){
  this.servOrder.Get_Orders_Of_Sellers(this.currentUser.id,'PAID').subscribe((res:any)=>{
    this.Paid_Orders_Of_Sellers=res;console.log('Paid_Orders_Of_Sellers:'+JSON.stringify(this.Paid_Orders_Of_Sellers))
     
     
    //this.servOrder.getOrderItems().subscribe((orderitems:any)=>{
    //this.Paid_Orders_Of_Sellers=orderitems;console.log('Paid_Orders_Of_Sellers:'+JSON.stringify(this.Paid_Orders_Of_Sellers))

    //find productIds comma seperated from orderitems
    var productIdList_CommaDelimited:string='';
    var customerIdList_CommaDelimited:string='';
  this.Paid_Orders_Of_Sellers.forEach((aOrderItem) => {
    productIdList_CommaDelimited+=aOrderItem.productId+",";
    customerIdList_CommaDelimited+=aOrderItem.userId+",";
  })
  localStorage.setItem('productIdList_CommaDelimited',productIdList_CommaDelimited);
  localStorage.setItem('customerIdList_CommaDelimited',customerIdList_CommaDelimited);
//end

////getproductList from commaseperated stored in localStorage
const productIds=localStorage.getItem("productIdList_CommaDelimited")?.toString();
this.servProduct.getProductByIds(productIds).subscribe((res:any)=>{
    this.products=res; console.log('products by ids:'+JSON.stringify(this.products))
});


////getCustomerList from commaseperated stored in localStorage
const userIds=localStorage.getItem("customerIdList_CommaDelimited")?.toString();
console.log('userIds:'+userIds)
this.servUser.getUsers(userIds).subscribe((res:any)=>{
    this.customers=res; console.log('Customers by ids:'+JSON.stringify(this.customers))
});



 });
 }
 //-------------------------------------------------------------

 selectUser(param_Order:any){
  
    this.Selected_Order_id_for_detail=param_Order.orderId
 }
get_Users(){
 this.servUser.getUsers('').subscribe((res:any)=>{
   //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
   this.users=res;
   
});
}

getCustomerName(orderId: number): string {
   // Retrieve the customer name based on the order ID from the customers array
   const order =this.Paid_Orders_Of_Sellers.find(o => o.orderId === orderId);
   const userId = order?.userId;
   const customer =this.customers.find(c => c.id === userId);
   return customer?.display_name || '';
 }
 
 getOrderDate(orderId: number): string {
   // Retrieve the order date based on the order ID from the orders array
   const order =this.Paid_Orders_Of_Sellers.find(o => o.orderId === orderId);
   return order?.orderdate || '';
 }
 
 getOrderStatus(orderId: number): string {
  // Retrieve the order date based on the order ID from the orders array
  const order =this.Paid_Orders_Of_Sellers.find(o => o.orderId === orderId);
  return order?.order_status || '';
}

 getProductName(productId: number): string {
   // Retrieve the product name based on the product ID from the products array
   const product =this.products.find(p => p.id === productId);
   return product?.product_name || '';
 }
 

 setOrderStatusToShipping(param_Orderid:any){
  this.servOrder.serOrderStatus(param_Orderid,'Shipping');
}
setOrderStatusToComplete(param_Orderid:any){
  this.servOrder.serOrderStatus(param_Orderid,'Complete');
}

}

