import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PromotionMast } from 'src/app/Core/Data/Models/promotion-mast.model';
import { PromotionProduct } from 'src/app/Core/Data/Models/promotion-product.model';
import { PromotionOrder } from 'src/app/Core/Data/Models/promotion-order.model';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { PromotionQuantity } from 'src/app/Core/Data/Models/promotion-quantity';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPromotionMast(): Observable<PromotionMast[]> {
    var url=this.apiUrl+'promotionmast/'
       return this.http.get<PromotionMast[]>(url); 
  }

  get_Promotion_ProductById(param_productId:number=0){
    var url=this.apiUrl+'promotionproduct/'+param_productId+'/0';

    console.log('url to retrieve promo product by id:'+url);


    return this.http.get<PromotionProduct>(url);
  }
  get_Promotion_QuantityById(param_productId:number=0){
    var url=this.apiUrl+'promotionquantity/'+param_productId+'/0';

    console.log('url to retrieve promo product by id:'+url);


    return this.http.get<PromotionProduct>(url);
  }
  get_Promotion_Product_Seller(param_sellerId:number=0){
    var url=this.apiUrl+'promotionproduct/0/'+param_sellerId+'/'; 


    console.log('url for service promo product for seller id:'+url)
    return this.http.get<PromotionProduct[]>(url);
  }
//promotionQuantity
get_Promotion_Quantity_Seller(param_sellerId:number=0){
  var url=this.apiUrl+'promotionquantity/0/'+param_sellerId+'/'; 


  console.log('url for service promo quantity for seller id:'+url)
  return this.http.get<any[]>(url);
}
  addPromotion_Product(Promotion_Product: any): Observable<PromotionProduct> {
    var url=this.apiUrl+'promotionproduct/';console.log('submitting Promotion_Product:'+ JSON.stringify(Promotion_Product))
    return this.http.post<PromotionProduct>(url, Promotion_Product);
  }

  editPromotion_Product(Promotion_Product: PromotionProduct): Observable<PromotionProduct> {
    var url=this.apiUrl+'promotionproduct/'+Promotion_Product.id; console.log('editing promo with url:'+url)
    console.log('Promotion_Product.startDate:'+Promotion_Product.startDate)
    console.log(typeof Promotion_Product.startDate); // Check the type of startDate
console.log(Promotion_Product.startDate); // Check the value of startDate

//added
Promotion_Product.startDate = moment(Promotion_Product.startDate, 'DD/MM/YYYY HH:mm:ss').toDate();
Promotion_Product.endDate = moment(Promotion_Product.endDate, 'DD/MM/YYYY HH:mm:ss').toDate();
//end added

//Promotion_Product.startDate = new Date(Promotion_Product.startDate); // Convert to Date object if needed
//Promotion_Product.startDate = formatDate( new Date(Promotion_Product.startDate??''), 'YYYY-MM-DD','en-US'); // Format the date
//console.log('abc:'+ this.format2Date(Promotion_Product.startDate))
//-${Promotion_Product.startDate!.getDate()}-${Promotion_Product.startDate?.getFullYear()}
//Promotion_Product.startDate = new Date(`${Promotion_Product.startDate!.getMonth()}-${Promotion_Product.startDate!.getDate()}-${Promotion_Product.startDate?.getFullYear()}`)

//console.log('startdate formatted here :'+formatDate( new Date(Promotion_Product.startDate??''), 'YYYY','en-US'))
//Promotion_Product.endDate = formatDate('12/01/2001'??'', 'yyyy-MM-dd', 'en-US');
console.log('aaaaabbbb:')
console.log(formatDate('01/11/2023', 'yyyy-MM-dd', 'en-US'))

//Promotion_Product.endDate=formatDate(new Date(Promotion_Product.endDate??''), 'YYYY-MM-DD', 'en-US');
//Promotion_Product.endDate =new Date('10-20-2023')
//Promotion_Product.endDate =new Date(this.formatDate(Promotion_Product.endDate))
    return this.http.post<PromotionProduct>(url, Promotion_Product);
  }
  
  
  editPromotion_Quantity(Promotion_Quantity: PromotionQuantity): Observable<PromotionQuantity> {
    var url=this.apiUrl+'promotionquantity/'+Promotion_Quantity.id; console.log('editing quantity promo with url:'+url)
 

//added
Promotion_Quantity.startDate = moment(Promotion_Quantity.startDate, 'DD/MM/YYYY HH:mm:ss').toDate();
Promotion_Quantity.endDate = moment(Promotion_Quantity.endDate, 'DD/MM/YYYY HH:mm:ss').toDate();
//end added


    return this.http.put<PromotionProduct>(url, Promotion_Quantity);
  }
  
  formatDate(date?: Date): string {
    const day = date!.getDate();
    const month =date!.getMonth() + 1; // Months are zero-based
 
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
   
    const formattedDate = `${formattedDay}-${formattedMonth}-${date!.getFullYear()}`;
   //const formattedDate = `${date.getFullYear()}/${formattedMonth}/${formattedDay}`;
    return formattedDate;
  }
  
  format2Date(date?: Date): string {
    const day = date!.getDate();
    const month =date!.getMonth() + 1; // Months are zero-based
 
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
   
    const formattedDate = `${formattedMonth}-${formattedDay}-${date!.getFullYear()}`;
   //const formattedDate = `${date.getFullYear()}/${formattedMonth}/${formattedDay}`;
    return formattedDate;
  }
deletePromotion_Product(Promotion_Product: any): Observable<PromotionProduct> {
  var url=this.apiUrl+'promotionproduct/'+Promotion_Product.id; console.log('editing promo with url:'+url)
  return this.http.delete<PromotionProduct>(url);
}

  //Promotion Order start here

  get_Promotion_OrderById(param_productId:number=0){
    var url=this.apiUrl+'promotionorder/'+param_productId+'/0';

    console.log('url to retrieve promo product by id:'+url);


    return this.http.get<PromotionOrder>(url);
  }
  get_Promotion_Order_NotInUseAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA(param_OrderId:number=0){
    var url=this.apiUrl+'promotionorder/'+param_OrderId;
    return this.http.get<PromotionOrder>(url);
  }

  get_Promotion_Order_Seller(param_sellerId:number=0){
    var url=this.apiUrl+'promotionorder/0/'+param_sellerId+'/'; 


    console.log('url for service promo product for seller id:'+url)
    return this.http.get<PromotionProduct[]>(url);
  }

  addPromotion_Order(Promotion_Order: PromotionOrder): Observable<PromotionOrder> {
    var url=this.apiUrl+'promotionorder/';
    Promotion_Order.startDate = formatDate(Promotion_Order.startDate??'', 'yyyy-MM-dd', 'en-US'); // Format the date
    Promotion_Order.endDate = formatDate(Promotion_Order.endDate??'', 'yyyy-MM-dd', 'en-US');
 
    return this.http.post<PromotionOrder>(url, Promotion_Order);
  }
  editPromotion_Order(Promotion_Order: PromotionOrder): Observable<PromotionOrder> {
    var url=this.apiUrl+'promotionorder/'+Promotion_Order.id; console.log('editing promo with url:'+url)
    console.log('Promotion_Order.startDate:'+Promotion_Order.startDate)
    console.log(typeof Promotion_Order.startDate);
  //    Promotion_Order.startDate=formatDate(Promotion_Order.startDate, 'yyyy-MM-dd', 'en-US');
   // Promotion_Order.endDate=formatDate(Promotion_Order.endDate, 'yyyy-MM-dd', 'en-US');
   
   //Promotion_Order.startDate = formatDate(Promotion_Order.startDate??'', 'yyyy-MM-dd', 'en-US'); // Format the date
   //Promotion_Order.endDate = formatDate(Promotion_Order.endDate??'', 'yyyy-MM-dd', 'en-US');

    //Promotion_Order.startDate=Promotion_Order.startDate+' 00.00.00.000';
    
//added
Promotion_Order.startDate = moment(Promotion_Order.startDate, 'DD/MM/YYYY HH:mm:ss').toDate();
Promotion_Order.endDate = moment(Promotion_Order.endDate, 'DD/MM/YYYY HH:mm:ss').toDate();
//end added

    return this.http.post<PromotionOrder>(url, Promotion_Order);
  }
deletePromotion_Order(Promotion_Order: any): Observable<PromotionOrder> {
  var url=this.apiUrl+'promotionorder/'+Promotion_Order.id; console.log('deleting promo with url:'+url)
  return this.http.delete<PromotionOrder>(url);
}
}
