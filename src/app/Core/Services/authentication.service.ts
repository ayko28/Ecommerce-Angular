import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../Data/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private apiUrl=environment.apiUrl;
  private currentUserSubject!: BehaviorSubject<User|null>;
 // private currentUserSubject!: BehaviorSubject<any>;
   public currentUser!: Observable<User|null>;
   //  public currentUser!: Observable<any>;
  
    constructor(private http: HttpClient,private router:Router) {

     //localStorage.removeItem('currentUser');

      const CU=localStorage.getItem('currentUser');
      if(CU){        
      this.currentUserSubject = new BehaviorSubject<User|null>(JSON.parse(CU));
      }
     /**/ else{       
       this.currentUserSubject = new BehaviorSubject<User|null>(null);
              }  

      this.currentUser = this.currentUserSubject.asObservable();        
  }

 /**/  public get currentUserValue(): User |null{
    return this.currentUserSubject.value;
} 

/* 

loginbycredential(userid: string, password: string) { // id:bycredential
  
  var url=this.apiUrl+'login'+'/bycredential';
  return this.http.post<any>(url, { userid, password })
      .pipe(map(res => {
       
          // login successful if there's a jwt token in the response
         // if (user && user.token) {
          if (res.user ) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
           
              
             localStorage.setItem('currentUser', JSON.stringify(res.user));
             localStorage.setItem('Token',JSON.stringify(res.accessToken))
    
           

              this.currentUserSubject.next(res.user);


            
          }

          return res.user;
      }));
} */
loginbycredential(userid: string, password: string) {
  var url = this.apiUrl + 'login' + '/bycredential';
//  this.loading = true; // Set loading indicator to true

  return this.http.post<any>(url, { userid, password })
    .pipe(
      delay(900), // Add a delay to simulate network latency (optional)
      map(res => {
     //   this.loading = false; // Set loading indicator to false after the response arrives

        if (res.user) {
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          localStorage.setItem('Token', JSON.stringify(res.accessToken))
          this.currentUserSubject.next(res.user);
        }

       
        
        return res.user;
      }) ,
      catchError(error => {
       // this.loading = false; // Set loading indicator to false in case of an error
        throw error; // Rethrow the error to be caught by the subscriber
      })/* */
    );
}

logout(isDirectCloseBrowser:boolean=false) {
 /*  var url=this.apiUrl+'/login/'+isDirectCloseBrowser;
   this.http.put<any>(url, {  }).subscribe(res=>{}); */

  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);


  
  
}

AuthRole(){
  //return 'someRole'
  
  //this.currentUser!.userrole
  var currentUser:any;
  if(this.currentUserValue){
    currentUser = this.currentUserValue;
   }
 
  if(currentUser){

   // alert(currentUser.role)

      return currentUser.userrole;
    }
      else{ return 'Emty Role';}

}

AuthUsername(){
  //return 'someRole'
  
  //this.currentUser!.userrole
  var currentUser:any;
  if(this.currentUserValue){
    currentUser = this.currentUserValue;
   }
 
  if(currentUser){

   // alert(currentUser.role)

      return currentUser.display_name;
    }
      else{ return 'Emty username';}

}





isUserLoggedIn():boolean{
  var currentUser:any;
  if(this.currentUserValue){
    currentUser = this.currentUserValue;
   }
 
  if(currentUser){

   // alert(currentUser.role)

      return true;
    }
      else{ return false;}

    }





}
