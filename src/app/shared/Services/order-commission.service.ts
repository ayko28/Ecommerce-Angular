import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { OrderItem } from 'src/app/Core/Data/Models/order-item.model';
import { Order } from 'src/app/Core/Data/Models/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderCommissionService {

  currentUser:any;
  apiUrl=environment.apiUrl+'ordercommission';
 
 
  private orderSubject: BehaviorSubject<Order> = new BehaviorSubject<Order>({});
  private orderitemSubject: BehaviorSubject<OrderItem[]> = new BehaviorSubject<OrderItem[]>([]);

  private SellerpaycommissionSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient,private servAuth:AuthenticationService) {
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);
    if(this.servAuth.isUserLoggedIn()){    this.loadOrders(); }
  }

  Get_Completed_Orders_Of_Sellers_For_PayCommission(param_seller_id:any,param_Order_Status:any){
  var url=this.apiUrl+'/'+param_seller_id; 
  if(param_Order_Status!=''){url=url+'/'+param_Order_Status}
  
    return  this.http.get(url)
  }
  
  PayCommission_for_Order(param_Order:any){
    var url=this.apiUrl+'/PayCommission?orderId='+param_Order.orderId;
    return   this.http.put(url,{});
  }

  PayCommission_for_Orders(param_orderIds_comma_seperated:any){
    var url=this.apiUrl+'/PayCommission?orderId=0&orderIds_comma_seperated='+param_orderIds_comma_seperated;
    return   this.http.put(url,{});
  }

  //For Admin, need seller summary of UNPAID commission
  Get_Sellers_UNPAID_Commission_Summary(param_Order_Status:any){
    var url=this.apiUrl+'/0/Complete'; 
    
    
      return  this.http.get(url)
    }
    
  Get_Orders_Of_Customer(param_customer_id:any,param_Order_Status:any){
    var url=this.apiUrl+'/'+param_customer_id+'/0'; console.log('url:'+url)
    if(param_Order_Status!=''){url=url+'/'+param_Order_Status}
    
      return  this.http.get(url)
    }
  PlaceOrder(userId:any,orderItems:OrderItem[],totalAmount:any){
  
  return  this.http.post(this.apiUrl,{ userId:userId,orderdate:Date(), orderItems:orderItems}).subscribe(() => {
      /* let items = this.cartItems.getValue();
      if (!this.isItemInCart(items, prod.id)) {
        items.push(cartItem);
        this.cartItems.next(items);
        } */
    });

  }
  CheckOutOrder(order_status:string,userId:any,seller_id:any,orderItems:OrderItem[],totalAmount:any,discount:any){
  
    return  this.http.post(this.apiUrl,{ order_status:order_status,userId:userId,seller_id:seller_id,orderdate:Date(), orderItems:orderItems,totalAmount:totalAmount,discount:discount}).subscribe(() => {
        /* let items = this.cartItems.getValue();
        if (!this.isItemInCart(items, prod.id)) {
          items.push(cartItem);
          this.cartItems.next(items);
          } */
      });
  
    }
  getOrder(): Observable<Order> {
    return this.orderSubject.asObservable();
  }
  getOrderItems(): Observable<OrderItem[]> {
    return this.orderitemSubject.asObservable();
  }
  getSellerpaycommission(): Observable<any> {
    return this.SellerpaycommissionSubject.asObservable();
  }
  loadOrders(){ console.log('loadorders')
    var url=this.apiUrl+'/'+this.currentUser.id+'/Complete';
    var paycommision_applicable=0;
    this.http.get<any[]>(url).pipe(
     
      map(response => { 
       
        response.map(aRow=>{
         
          if(aRow.commission_status=='UNPAID'){
          paycommision_applicable+=aRow.commission_applicable;
          }
        })
       
        return paycommision_applicable;
      })
    )
    .subscribe(amt => {
    //  this.orderSubject.next(order);
   //   this.orderitemSubject.next(order.orderItems||[]);

      this.SellerpaycommissionSubject.next(amt);
     
    });
  }


  serOrderStatus(param_OrderId:any,param_status:any){
    var url=this.apiUrl+'/'+'orderstatuschange'+'?orderid='+ param_OrderId +'&orderstatus='+param_status
        
      return  this.http.put(url,{}).subscribe(()=>{})
    
  }
}
