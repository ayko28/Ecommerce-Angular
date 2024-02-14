import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit { loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authServ: AuthenticationService
  ) { 
      console.log('checking whether already logged in? Y/N:');
      // redirect to home if already logged in
      if (this.authServ.currentUserValue) { console.log('already logged in')
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
 public get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
     /*  this.authServ.loginbycredential(this.f['username'].value, this.f['password'].value)
          .pipe(first())
          .subscribe(
              (data:any) => { 
                  if(data.userrole.toLocaleUpperCase()=='SELLER'){
           //  Commonsettings.RunningBanner="Without casepaper number , patient cannot be enrolled for treatment";
           this.router.navigateByUrl("seller");
                  }
                  else if(data.userrole.toLocaleUpperCase()=='CUSTOMER'){
                   // Commonsettings.RunningBanner="Hi Doctor";
                   this.router.navigate(['/']);//navigateByUrl("home"); 
                         }
                         else if(data.userrole.toLocaleUpperCase()=='ADMIN'){
                            console.log(data.userrole.toLocaleUpperCase()+' navigate to admin oute')
                          //  Commonsettings.RunningBanner="Mama thank you very much";
                          this.router.navigateByUrl("admin");
                                 }
                                 else{
                              console.log('feel no cred correct')
                                      this.router.navigate([this.returnUrl]);

                                 }
                               
                 
              },
              (error:any) => {
                  this.error = error;
                  this.loading = false;
              }); */
              this.authServ.loginbycredential(this.f['username'].value, this.f['password'].value)
  .pipe(first())
  .subscribe(
    (data: any) => {
      // Handle successful login
      if (data.userrole.toLocaleUpperCase() == 'SELLER') {
        this.router.navigateByUrl("seller");
      } else if (data.userrole.toLocaleUpperCase() == 'CUSTOMER') {
        this.router.navigate(['/']);
      } //registerconsumer
      else if (data.userrole.toLocaleUpperCase() == 'CUSTOMEREXTRA') {
        this.router.navigate(['/registerequestconsumer',this.f['username'].value]);
      } 
      else if (data.userrole.toLocaleUpperCase() == 'ADMIN') {
        this.router.navigateByUrl("admin");
      } else if (data.userrole.toLocaleUpperCase() == 'DBOY') {
        this.router.navigate(['/']);
      } else {
        // Invalid credentials
        console.log('Invalid credentials');
        this.error = 'Incorrect credentials';
        this.loading = false;
      }
    },
    (error: any) => {
      // Handle login error
      console.log('Login error');
      this.error = 'An error occurred while logging in';
      this.loading = false;
    }
  );

  }
}

