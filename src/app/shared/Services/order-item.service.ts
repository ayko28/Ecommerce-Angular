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
export class OrderItemService {
  apiUrl=environment.apiUrl+'orderitem';
  constructor(private http: HttpClient) { }

  Get_Orderdetails(param_orderid:any){
    var url=this.apiUrl+'/0/'+param_orderid; console.log('url:'+url)
   
      return  this.http.get(url)
    }}
