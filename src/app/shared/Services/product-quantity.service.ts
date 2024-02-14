import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductQuantity } from 'src/app/Core/Data/Models/product-quantity';

@Injectable({
  providedIn: 'root'
})
export class ProductQuantityService {

  //private apiUrl = 'https://your-api-url.com/Products'; // Replace with your API URL
  apiUrl=environment.apiUrl+'prod_quality/';
  constructor(private http: HttpClient) { }

  get_prod_qualityByIdentityId(param_id:number=0): Observable<ProductQuantity[]> {
    var url=this.apiUrl;
    if(param_id){
       url=url+"/"+param_id+"/0"
    }
    return this.http.get<ProductQuantity[]>(url); console.log('url:'+url)
  }
  get_prod_quality_OfProductId(param_productid:any): Observable<ProductQuantity[]> {
    var url=this.apiUrl+"0/"+param_productid+"/";
    console.log('Hurl:'+url)
    return this.http.get<ProductQuantity[]>(url); 
  }
  get_prod_quality_All(): Observable<ProductQuantity[]> {
    var url=this.apiUrl+"0/0"
    
    return this.http.get<ProductQuantity[]>(url); console.log('url:'+url)
  }
  
}
