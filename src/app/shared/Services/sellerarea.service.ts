import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerareaService {
  apiUrl=environment.apiUrl+'sellerarea';
  constructor(private http: HttpClient) { }

  checkareaconflict(param_mobileNumber:any,param_newsellerid:any): Observable<boolean> { 
    //var url=this.apiUrl+'/will_area_conflict/?mobileNumber='+objBody.mobileNumber+'&newsellerid='+objBody.newsellerid;
   var url=this.apiUrl+'/'+'will_area_conflict'+'?mobileNumber='+ param_mobileNumber +'&newsellerid='+param_newsellerid

   return this.http.get<boolean>(url); 
    
   }


}
