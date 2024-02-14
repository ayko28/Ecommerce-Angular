import { Injectable } from '@angular/core';

import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { throwError,of, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

import {mergeMap, delay, retryWhen} from 'rxjs/operators';
import { CommonService } from 'src/app/shared/Services/common.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';


export const maxRetries = 3;
export const delayMs = 3000;

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService,private servCommon:CommonService,private notify:NotificationService) {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
   // const token = this.authService.getAuthToken();
   const token = localStorage.getItem('Token');
//token=token.sub("\"", "");
if(token){
token!=token!.replace(/['"]+/g, '');
}
                              //  console.log('we r in AuthInterceptorService trying url:'+ request.url+' with token:'+token);

   if (token) {
    //console.log(`I have token:${token}`)
     // If we have a token, we set it to the header
     request = request.clone({
//  setHeaders: {Authorization: 'Authorization token '+localStorage.getItem('Token')}
      setHeaders: {Authorization: `Authorization ${token}`}
  // setHeaders: {Authorization: `Authorization  Bearer xyz`}
       // setHeaders: {authorization: `Authorization Bearer ${token}`}
        /* headers: request.headers.set(
          'Authorization',
          token
        ) */
     });
  }

  return next.handle(request).pipe(

     

  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
    //alert('err:'+JSON.stringify(err))
    var xyz=this.MyCustomError(err.error.Message);

      if (err.status === 201){
        this.notify.showError("Something went wrong!","Error")     
      }
      else	 if (err.status === 401) {
       	 // redirect user to the logout page
       }
       else  if (err.status === 404) {
        this.notify.showError("Something went wrong! Or No records found","Error")
     }
     else if (err.status === 409) { //if Flat 501 is already allocated Flat then u cant assign that some one else again
        // redirect user to the logout page
       this.notify.showError("Something went wrong! Or You might tried with duplicate record, as conflict occured","Error")
     } else  if (err.status === 500) {
      this.notify.showError(xyz,"Something went wrong! Or Request cannot be fulfilled")
   }
 	 }
  	return throwError(err);
	})
   )
   //.pipe(retry(3)); // Retry failed request up to 3 times.
   .pipe(
    retryWhen((error) => {
    return error.pipe(
      mergeMap((error, index) => {
        if (index < maxRetries ) {//  if (index < maxRetries && error.status == 500) {
          return of(error).pipe(delay(delayMs));
        }

        throw error;
      })
    )}
)
   )
  }

  MyCustomError(errMessage:string){
    if(errMessage.toString().indexOf('expects parameter')!=-1){return "SP Param missing"}
    else  if(errMessage.toString().indexOf('has too many argument')!=-1){return "SP Provided Additional Param"}
      return 'my custom error message'
  }
}