import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Core/Data/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserExtraService {
  apiUrl=environment.apiUrl+'UsermgtExtra';
  constructor(private http: HttpClient) { }

  New_Consumer(mobileNumberNsuppid: any): Observable<User> {//adduser managed in node api by put and not post is used
    const url = `${this.apiUrl}`;console.log('adding user with url:'+url); console.log('posting body:'+JSON.stringify(mobileNumberNsuppid))
    return this.http.post<User>(url, mobileNumberNsuppid);
  }

  getConsumers(mobileNumber:any,from_userExtra:any,approval_status:any='0',seller_id:any=0): Observable<User[]> { 
  //  alert('from_userExtra:'+from_userExtra)
    var url=this.apiUrl;
    /* if(mobileNumber!=''){url=this.apiUrl+'/'+mobileNumber;}
    if(from_userExtra!=''){url=url+'/'+from_userExtra;}
    if(approval_status!=''){url=url+'/'+approval_status;}
    if(seller_id!=''){url=url+'/'+seller_id;} */
  
    url=this.apiUrl+'/'+mobileNumber+'/'+from_userExtra+'/'+approval_status+'/'+seller_id;
   
     return this.http.get<User[]>(url); 
  }

  SendRegistrationRequest(objBody:any){
   
    console.log('url for consumer request is:'+this.apiUrl)
   return this.http.put<User[]>(this.apiUrl,objBody); 
  }




}
