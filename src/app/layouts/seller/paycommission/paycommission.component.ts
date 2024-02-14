import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { OrderCommissionService } from 'src/app/shared/Services/order-commission.service';
import { WindowRefService } from 'src/app/window-ref.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-paycommission',
  templateUrl: './paycommission.component.html',
  styleUrls: ['./paycommission.component.scss']
})
export class PaycommissionComponent {


  RPOrderid!:any;RPamount!:any;RPcurrency!:any;RPnotes!:any;RPreceipt!:any;
  action_createOrPay!:any;
  
  @Input() events!: Observable<void>;
  Selected_Order_id_for_PayCommission!:number;

curr_Order_id_for_Detail:any;
 Unpaid_Commission_Orders_Of_Sellers!:any[]; 
 //user_Sellers!:any[];
 users!:any[];
 user_Selected:any;
 currentUser:any;

 Sellerpaycommission:any;
 
 private apiUrl=environment.apiUrl;
 Commision_to_pay!:any;
constructor(private http:HttpClient,private winRef: WindowRefService,private servOrderCommission:OrderCommissionService,private servAuth:AuthenticationService,private servUser:UserService,public servCommon:CommonService){
 this.servAuth.currentUser.subscribe(x => this.currentUser = x);
}

ngOnInit(){
  

 this.get_Users();   
      this.Get_Completed_Orders_Of_Sellers_For_PayCommission();
     this.servOrderCommission.getSellerpaycommission().subscribe((res:any)=> this.Sellerpaycommission=res);
      setTimeout(() => {
        console.log('Sellerpaycommission:'+JSON.stringify(this.Sellerpaycommission))
        this.Commision_to_pay=Math.ceil(this.Sellerpaycommission);
      }, 3000);
   
}
// for Razorpay
calculateCommission() {
  const selectedOrders = this.Unpaid_Commission_Orders_Of_Sellers.filter(order => order.selected);
  this.Commision_to_pay = selectedOrders.reduce((total, order) => total + order.commission_applicable, 0);
  this.Commision_to_pay=Math.ceil(this.Commision_to_pay)
 // console.log('Unpaid_Commission_Orders_Of_Sellers in calc:'+JSON.stringify(this.Unpaid_Commission_Orders_Of_Sellers))
 // console.log('Selected Orders:', selectedOrders);
 // console.log('Total Commission:', this.Commision_to_pay);
}

handlePaymentSuccess(paymentDetails: any) {
  console.log('m in payCommision of seller and Payment successful:', paymentDetails);
  // Loop through the array and add the 'selected' property
  const selectedOrders = this.Unpaid_Commission_Orders_Of_Sellers.filter(order => order.selected);
  
  const orderIds =selectedOrders.map(order => order.orderId).join(',');

  console.log('comma seperated orderIds are:'+orderIds)

  this.servOrderCommission.PayCommission_for_Orders(orderIds).subscribe((res:any)=>{
  console.log('orderIds:'+orderIds+' being declared as PAID status for commission')
  })


 // console.log('currSeller.seller_name idx currSeller.seller_id :'+this.currSeller.seller_name+','+ '99' + this.currSeller.seller_id)
 // this.PlaceOrder(this.currSeller.seller_name,99,this.currSeller.seller_id)
  // Handle the successful payment logic here
}

//end Razorpay
createOrder(){
  var url=this.apiUrl+'Razor';//
//var url='http://localhost:3041/api/'+'Razor';
  var options={amount: this.Commision_to_pay,currency:"INR",receipt:"RPreceipt",notes:"RPnotes"};



  console.log('creating order with options:'+JSON.stringify(options))
  this.http.post(url,options).subscribe((res:any)=>{

    console.log('rrrrrrrrrrrrresponse:'+JSON.stringify(res.id));
    this.RPOrderid=res.id;
    this.RPamount=this.Commision_to_pay;
    
    this.RPcurrency="INR";
    
    this.RPreceipt='RPreceipt';
    
    this.RPnotes='RPnotes';

  })
}

//-------------------------------------------------------------
Get_Completed_Orders_Of_Sellers_For_PayCommission(){
 this.servOrderCommission.Get_Completed_Orders_Of_Sellers_For_PayCommission(this.currentUser.id,'Complete').subscribe((res:any)=>{
   this.Unpaid_Commission_Orders_Of_Sellers=res;console.log('Unpaid_Commission_Orders_Of_Sellers:'+JSON.stringify(this.Unpaid_Commission_Orders_Of_Sellers))
   this.Unpaid_Commission_Orders_Of_Sellers.forEach(order => {
    order.selected = true; // Initialize 'selected' property to false for each order
  });
  
  this.calculateCommission();
});
}
//-------------------------------------------------------------
/* 
this perticular functionality is nit being used
as this is to paycommission of one completed order.

We currently using one pay button that will pay commission of all orders

PayCommission_for_Order(param_Order:any){
 
   this.Selected_Order_id_for_PayCommission=param_Order.orderId;
  this.servOrder.PayCommission_for_Order(param_Order).subscribe((res:any)=>{
    this.Get_Completed_Orders_Of_Sellers_For_PayCommission();this.servOrder.loadOrders();
  });

} */
get_Users(){
this.servUser.getUsers('').subscribe((res:any)=>{
  //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
  this.users=res;
  
});
}

}


