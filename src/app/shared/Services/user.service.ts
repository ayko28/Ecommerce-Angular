import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Core/Data/Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private apiUrl = 'https://your-api-url.com/users'; // Replace with your API URL
  apiUrl=environment.apiUrl+'Usermgt';
  constructor(private http: HttpClient) { }

  getUsers(param_userIds:any): Observable<User[]> { 
   var url=this.apiUrl+'/0/0/noIds';
   if(param_userIds!=''){url=this.apiUrl+'/-1/0/'+param_userIds;}
    return this.http.get<User[]>(url); 
   
  }
  getUsers_Of_role(param_role:string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"/0/"+param_role+'/noIds');
  }
  getUsers_Of_role_paging(PageNumber:number=0,PageSize:number=0,param_role:string,param_sellerid:any=0): Observable<User[]> {
   var url=this.apiUrl+"/0/"+param_role+'/noIds/mobilenumber/'+PageNumber+'/'+PageSize+'/'+param_sellerid;
    
    return this.http.get<User[]>(url);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}/''/noIds`; console.log('getuser url:'+url)
    return this.http.get<User>(url);
  }
  getUsers_Of_mobilenumber(param_mobilenumber:string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+"/0/-1"+'/noIds/'+param_mobilenumber);
  }
  addUser(user: User): Observable<User> {//adduser managed in node api by put and not post is used
    const url = `${this.apiUrl}/${user.id}`;console.log('adding user with url:'+url)
    return this.http.put<User>(url, user);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;console.log('updating user with object:'+JSON.stringify(user))
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}