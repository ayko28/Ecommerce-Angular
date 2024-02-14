import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from 'src/app/shared/Services/user.service';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/shared/Services/order.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CommonService } from 'src/app/shared/Services/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  
  @Input() events!: Observable<void>;
  Selected_Order_id_for_detail!:number;

curr_Order_id_for_Detail:any;
 Paid_Orders_Of_Sellers!:any[]; 
 //user_Sellers!:any[];
 users!:any[];
 user_Selected:any;
 currentUser:any;
constructor(private servOrder:OrderService,private servAuth:AuthenticationService,private servUser:UserService,public servCommon:CommonService){
 this.servAuth.currentUser.subscribe(x => this.currentUser = x);
}

ngOnInit(){

 this.get_Users();   
      this.get_Paid_Orders_Of_Customer();
}
//-------------------------------------------------------------
get_Paid_Orders_Of_Customer(){
 this.servOrder.Get_Orders_Of_Customer(this.currentUser.id,'PAID').subscribe((res:any)=>{
   this.Paid_Orders_Of_Sellers=res;console.log('Paid_Orders_Of_customers:'+JSON.stringify(this.Paid_Orders_Of_Sellers))
   
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

}
