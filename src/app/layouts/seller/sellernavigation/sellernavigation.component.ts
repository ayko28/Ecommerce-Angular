import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

@Component({
  selector: 'app-sellernavigation',
  templateUrl: './sellernavigation.component.html',
  styleUrls: ['./sellernavigation.component.scss']
})
export class SellernavigationComponent {
  constructor(private authServ:AuthenticationService,private router:Router){

  }
  Logout()
  {
    
    this.authServ.logout();
    this.router.navigate(['home']);
  }
}
