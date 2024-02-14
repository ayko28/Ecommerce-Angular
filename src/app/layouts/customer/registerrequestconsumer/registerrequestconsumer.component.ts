import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn  } from '@angular/forms';

import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { SellercommissionService } from 'src/app/shared/Services/sellercommission.service';
import { UserService } from 'src/app/shared/Services/user.service';

import { OtpService } from 'src/app/Core/Services/otp.service';

import { NotificationService } from 'src/app/shared/Services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserExtraService } from 'src/app/shared/Services/user-extra.service';


@Component({
  selector: 'app-registerrequestconsumer',
  templateUrl: './registerrequestconsumer.component.html',
  styleUrls: ['./registerrequestconsumer.component.scss']
})
export class RegisterrequestconsumerComponent {

  mobileNumber!: string;
  alExists:boolean=false;
  selectedSeller_id: number | null = null;
  
  @Input() param_Customer_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string='Add'
  product_Selected:any;
  myForm!: FormGroup;
  
  isSubmitted = false;isSubmitted_uploadform=false;
    
  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService
    ,private servUser:UserService
    ,private servUserExtra:UserExtraService
    ,private servSellercommission:SellercommissionService
    ,private servCategory:CategoryService
    ,private authServ:AuthenticationService
    ,private otpService: OtpService
    ,private notify:NotificationService
    ,private router:Router
    ,private route:ActivatedRoute
    //,private servAuth:AuthenticationService
    ){
  
  }
 
 async ngOnInit() {

    this.param_Customer_id=0;
    

    this.myForm = this.formBuilder.group({
      id:[''],
      userid:['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],//mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      display_name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      consumer_address:['',[Validators.required,Validators.minLength(20),Validators.maxLength(200)]],
      password:['',[Validators.required,this.passwordValidator]],
      passwordRepeat:['',[Validators.required,this.passwordValidator]],
      action:[],
    /*   f3:['xyz',Validators.required],    
      f4:['INR',Validators.required],  
      f5:['Maintenance',Validators.required],  */
    
    }, { validators: this.passwordsMatchValidator })
  

    this.route.params.subscribe((params: any) => this.mobileNumber = params['mobilenumber']);
    
   this.myForm.patchValue({
  
     userid: this.mobileNumber
  
   });
   
   
    //check if already applied for registartion
    var alExists=await this.alreadyExist_Consumer(this.mobileNumber,1,'pending');
    
   if(alExists){alert('Already u applied for registartion, just request ur shop owner to approve ur request'); this.router.navigate(['/']);}

  }

  

  alreadyExist_Consumer(mobileNumber:any,from_userExtra:any=0,approval_status:any='',seller_id:any=0){
    return new Promise((resolve, reject) => {
      this.servUserExtra.getConsumers(mobileNumber,from_userExtra,approval_status,seller_id).subscribe((res:any)=>{
        console.log('getConsumer response:'+JSON.stringify(res))
        if(res[0] && res[0].userid){  resolve(true);   }
        else resolve(false); 
        
      })
    
  });
  
  }
  
  preserved_alreadyExist_Consumer(mobileNumber:any,from_userExtra:any){
  return new Promise((resolve, reject) => {
    this.servUserExtra.getConsumers(mobileNumber,from_userExtra).subscribe((res:any)=>{
      console.log('getConsumer response:'+JSON.stringify(res))
      if(res[0] && res[0].userid){  resolve(true);   }
      else resolve(false); 
      
    })
  
});

}
get errorControl() {
  return this.myForm.controls;
}
 // Helper method to access form controls
 get f() {
  return this.myForm.controls;
}

Register_Consumer_Request(){
  var objBody={
    mobileNumber:this.errorControl['userid'].value,
    //seller_id:this.servAuth.currentUserValue?.
    
   display_name:this.errorControl['display_name'].value,
   consumer_address:this.errorControl['consumer_address'].value,
   password:this.errorControl['password'].value,
   action:'register_request'
   }
  this.servUserExtra.SendRegistrationRequest(objBody).subscribe();
}

Register_NewCustomernotinuse()
{
  
this.otpService.sendotpORregister({
   mobileNumber:this.errorControl['userid'].value,
   //seller_id:this.servAuth.currentUserValue?.
   
  display_name:this.errorControl['display_name'].value,
  consumer_address:this.errorControl['consumer_address'].value,
  password:this.errorControl['password'].value,
  action:'register_request'
  },'register_request')
  .subscribe(
    response => {console.log('response of registring user:'+response)}
    ,
      error => {
        console.error('Failed to register customer');
        console.error(error);
      }
      )
}

 passwordValidator(control: any): { [key: string]: boolean } | null {
  const password = control.value;
  if (!password) {
    return null;
  }

  /* // Check if the password contains at least one capital letter
  if (!/[A-Z]/.test(password)) {
    return { uppercase: true };
  } */

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {
    return { digit: true };
  }

  // Check if the password has a minimum length of 5 characters
  if (password.length < 5) {
    return { minlength: true };
  }

  return null;
}

 passwordsMatchValidator:ValidatorFn=(control: any): { [key: string]: boolean } | null =>{
  
  const password = control.get('password');
  const passwordRepeat = control.get('passwordRepeat');
 
  if (password && passwordRepeat && password.value !== passwordRepeat.value) {
   
    return { 'passwordsMatch': true };
  }

  return null;
}




  onSubmit() {
      

  if(this.myForm.valid){ 
    
   this.Register_Consumer_Request();
  //  this.notify.showSuccess("You have been registered successfully, Thanks for showing awareness and welcome to Kolhapur Bazzar","Cutomer Registration")
  alert('Request sent for approval to supplier,Please ask ur supplier to approve your request');
  alert('Redirecting you to login, just ask you supplier to Approve your request');
  //
  this.authServ.logout();
  this.router.navigate(['Auth']);
  //
//  this.router.navigate(['/']);
  }else{alert('invalid form')}

    
/* 
    if(this.addedit_OPmode=='Add'){
      this.myForm.patchValue({ id: 0});
     this.myForm.patchValue({ userrole: 'Customer'});
      this.myForm.patchValue({ CREATEDBY_username: 'self'});

      console.log('check form value here ->>>>>>>>>>>>>>>>')
      console.log(this.myForm.value)
    this.servUser.addUser(this.myForm.value).subscribe(response => {
      console.log('trying to sign up new customer...')
           this.formSaved.emit(true);this.myForm.reset();console.log('update product done...')
    });
  }
  else if(this.addedit_OPmode=='Edit')
  { 
    this.servUser.updateUser(this.myForm.value).subscribe(response => {
      console.log('trying to update product...')
           this.formSaved.emit(true);this.myForm.reset();console.log('update product done...')
    });
  }
   */
  }
  
  

  onSelectProduct(selectedItem: any) {
    console.log('in onSelectProduct')
    this.selectedSeller_id = selectedItem.id;
  }
  
}


