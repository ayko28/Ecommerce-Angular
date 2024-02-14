import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { SellercommissionService } from 'src/app/shared/Services/sellercommission.service';
import { UserService } from 'src/app/shared/Services/user.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  
  myForm!: FormGroup;
  profile:any;
  currentUser:any;

  isSubmitted:boolean=false;
  submitClicked:any='';
  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService
    ,private servUser:UserService
    ,private servSellercommission:SellercommissionService
    ,private servCategory:CategoryService
    ,private authServ:AuthenticationService
    ,private notify:NotificationService
    ,private servAuth:AuthenticationService
    , private location: Location,private router:Router){

      if(this.servAuth.currentUserValue){
        this.currentUser = this.servAuth.currentUserValue;
        }
   
  }

  async ngOnInit(){    this.myForm = this.formBuilder.group({
      id:[''],
      userid:[''],
      display_name:['',[Validators.required,Validators.min(3),Validators.max(50)]],
      oldpassword:[],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],passwordRepeat:[],
      userrole:[],
      firm_name:[],
      firm_addr:[],      
      IsActive:[]
    
    });
 
    await this.get_Profiler_Details();

    this.myForm.patchValue({
      id:this.profile.id,
      userid: this.profile.userid,
      display_name:this.profile.display_name,
      password:'NotEditing*123',
      userrole:this.profile.userrole,
      firm_name:this.profile.firm_name,
      firm_addr:this.profile.firm_addr,
      IsActive:this.profile.IsActive        
    });
  }

  get_Profiler_Details(){
    return new Promise((resolve, reject) => {
    
      this.servUser.getUser(this.currentUser.id).subscribe((res:any)=>{
      this.profile=res[0]; 
    
      resolve(true);
    });
  });
  }



  get errorControl() {
    return this.myForm.controls;
  }
  public onSubmitClick(): void {
    this.submitClicked = 'Submit';
  }
  public onCancel(): void {
    this.submitClicked = 'Cancel';
  }
  
  onSubmit(){

    if(!this.myForm.valid){return;}
    if(this.submitClicked=='Cancel'){this.location.back();return;}
    
    const passwordValue = this.myForm.get('password')?.value;
    
    if ( passwordValue === 'NotEditing*123'){this.location.back(); return;}
 if (this.errorControl['password'].value!=this.errorControl['passwordRepeat'].value){alert('Repeat Password not matching');return}
 
    this.servUser.updateUser(this.myForm.value).subscribe(response => {
      alert('Password changed successfully, login agn');
   //this.location.back();
   this.router.navigate(['Auth']);
          
          // this.notify.showSuccess('Customer Data Changed Successfully','Customer')
    },(error)=>{alert('Failed to change password:')})
  

  }
}
