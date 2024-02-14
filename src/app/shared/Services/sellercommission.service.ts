import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerCommissionSetting } from 'src/app/Core/Data/Models/seller-commission-setting';

@Injectable({
  providedIn: 'root'
})
export class SellercommissionService {
  apiUrl=environment.apiUrl+'sellercommission';
  constructor(private http: HttpClient) { }

  get_Seller_Commission_Setting(param_sellerId:number=0,forOneSeller:boolean): Observable<SellerCommissionSetting[]> {
    var url=this.apiUrl+'/0';
    if(forOneSeller){url=this.apiUrl+'/'+param_sellerId}
    console.log('url:'+url)
    return this.http.get<SellerCommissionSetting[]>(url); 
  }
  update_Seller_Commission_Setting(aSellerCommissionSetting: any): Observable<SellerCommissionSetting> {
    console.log('m in updateProduct method of product service...')
    const url = `${this.apiUrl}/${aSellerCommissionSetting.id}`;
    return this.http.put<SellerCommissionSetting>(url, aSellerCommissionSetting);
  }
}
