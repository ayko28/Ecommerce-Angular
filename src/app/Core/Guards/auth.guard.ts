import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../Services/authentication.service';
import { Role } from 'src/app/Core/Data/Models/role';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }

  /* canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } */
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    var currentUser:any;
    if(this.authenticationService.currentUserValue){
      currentUser = this.authenticationService.currentUserValue;
     }
  
  //this.authenticationService.currentUser.subscribe(res=>{currentUser=res})


     //this.authenticationService.currentUser.subscribe(res=>{currentUser=res;})
    if (currentUser) {
      
        // check if route is restricted by role
        //if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
          if (route.data['roles'] && route.data['roles'].indexOf(currentUser.userrole) === -1) {
        
            this.router.navigate(['/']);
            return false;
        }
        
        
        
               return true;
                //this.router.navigate(['/treat']);return true;
    }
else{
   
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {  queryParams: { returnUrl: state.url } });
    return false;}

}
  
}
