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
export class OrderService {
  currentUser:any;
  apiUrl=environment.apiUrl+'order';
 
 
  private orderSubject: BehaviorSubject<Order> = new BehaviorSubject<Order>({});
  private orderitemSubject: BehaviorSubject<OrderItem[]> = new BehaviorSubject<OrderItem[]>([]);

  constructor(private http: HttpClient,private servAuth:AuthenticationService) {
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);
    if(this.servAuth.isUserLoggedIn()){   console.log('Loading orders but checking customer or seller:'+this.currentUser.userrole); this.loadOrders(); }
  }
  
  Get_Orders_Of_Sellers(param_seller_id:any,param_Order_Status:any){
  var url=this.apiUrl+'/0/'+param_seller_id; console.log('url:'+url)
  if(param_Order_Status!=''){url=url+'/'+param_Order_Status}
  
    return  this.http.get(url)
  }
  
  Get_Orders_Of_Customer(param_customer_id:any,param_Order_Status:any){
    var url=this.apiUrl+'/'+param_customer_id+'/0'; console.log('url:'+url)
    if(param_Order_Status!=''){url=url+'/'+param_Order_Status}
    
      return  this.http.get(url)
    }
    getOrdersByStatus(param_seller_id:any,param_Order_Status:any){
      var url=this.apiUrl+'/0/'+param_seller_id+'/'+param_Order_Status;

 
      
        return  this.http.get(url)
      }

      getOrdersByStatus_Pagewise(param_seller_id:any,param_Order_Status:any,param_pagenumber:any,param_pagesize:any){
        var url=this.apiUrl+'/0/'+param_seller_id+'/'+param_Order_Status+'/'+param_pagenumber+'/'+param_pagesize;
  
   
        
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
        this.loadOrders().then((res:any)=>{   return  this.orderitemSubject.asObservable(); })
        return  this.orderitemSubject.asObservable();
    
    }
  loadOrders(){ console.log('loadorders')
  return new Promise((resolve, reject) => {
  var url='';
  if(this.currentUser.userrole=='Customer'){
    url=this.apiUrl+'/'+this.currentUser.id+'/0/';
  }else{
     url=this.apiUrl+'/0/'+this.currentUser.id;}
    
     console.log('Loadingorders with url:'+url)

    this.http.get<any[]>(url).pipe(
     
      map(response => { 
        const order = new Order();
        order.id = response[0].orderId;
        order.userId = response[0].userId;
        order.orderdate=response[0].orderdate;
      /*  */  order.orderItems = response.map(item => {
          const orderItem = new OrderItem();
          orderItem.orderId = item.orderId;
          orderItem.seller_id = item.seller_id;
         // orderItem.seller_name = item.seller_name;
          orderItem.orderItemId=item.orderItemId;
          orderItem.productId = item.productId;
          orderItem.price = item.price;
          orderItem.quantity = item.quantity;
         
          orderItem.pmultq = item.pmultq;
          orderItem.selectedUnit = item.selectedUnit;
          orderItem.CPorCQ = item.CPorCQ;

          return orderItem;
        });
       
        return order;
      })
    )
    .subscribe(order => {
      this.orderSubject.next(order);
      this.orderitemSubject.next(order.orderItems||[]);
      console.log('Order:', order);
    });

    
  });//end if returning promise

  }


  serOrderStatus(param_OrderId:any,param_status:any){
    console.log('changing status of orderid:'+param_OrderId+' to'+ param_status)
    var url=this.apiUrl+'/'+'orderstatuschange'+'?orderid='+ param_OrderId +'&orderstatus='+param_status
        
      return  this.http.put(url,{}).subscribe(()=>{})
    
  }
}
