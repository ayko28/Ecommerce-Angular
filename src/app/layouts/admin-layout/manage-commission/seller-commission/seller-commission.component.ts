import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CommonService } from 'src/app/shared/Services/common.service';

import { OrderCommissionService } from 'src/app/shared/Services/order-commission.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-seller-commission',
  templateUrl: './seller-commission.component.html',
  styleUrls: ['./seller-commission.component.scss']
})
export class SellerCommissionComponent {

  currentUser:any;
  Sellers_UNPAID_Commission_Summary!:any;
  users!:any[];
constructor(private servOrder:OrderCommissionService,private servAuth:AuthenticationService,private servUser:UserService, public servCommon:CommonService){
  this.servAuth.currentUser.subscribe(x => this.currentUser = x);
 }

ngOnInit(){
  this.get_Users();
this.Get_Sellers_UNPAID_Commission_Summary()
}

 Get_Sellers_UNPAID_Commission_Summary(){
  this.servOrder.Get_Sellers_UNPAID_Commission_Summary('Complete').subscribe((res:any)=>{
    this.Sellers_UNPAID_Commission_Summary=res;

     });
 }
 
 
get_Users(){
  this.servUser.getUsers('').subscribe((res:any)=>{
    //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
    this.users=res;
    
  });
  }

}
