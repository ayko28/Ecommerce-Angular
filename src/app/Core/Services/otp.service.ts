import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private apiUrl = environment.apiUrl+'sendotpORregister'; // Replace with your backend API endpoint

  constructor(private http: HttpClient) { }

  sendotpORregister(obj:any,param_sendotpORregister:string) {
    const data = { obj, };
    var url=this.apiUrl+'/'+param_sendotpORregister; //here id is either 'sendotp' or 'register'
    console.log('url for sendotpORregister is:'+url)
    return this.http.post<any>(url, data);
  }
}
