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
import { Router } from '@angular/router';


class CustomFormGroup extends FormGroup {
  constructor(controls: { [key: string]: AbstractControl; }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  get passwordsMatch() {
    return this.errors && this.errors['passwordsMatch'];
  }
}


@Component({
  selector: 'app-signupcustomer',
  templateUrl: './signupcustomer.component.html',
  styleUrls: ['./signupcustomer.component.scss']
})
export class SignupcustomerComponent {




  mobileNumber!: string;otp_which_sent_to_customer!:string;wait_otpmatchstarted:boolean=false;
  alExists:boolean=false;
  selectedSeller_id: number | null = null;
  
  @Input() param_Customer_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string='Add'
  product_Selected:any;
  myForm!: FormGroup;
  imageFile!: File;
  defaultDate = "1987-06-30";
  isSubmitted = false;isSubmitted_uploadform=false;
  categoryList:any[]=[];
  sellerList:any[]=[];

  submitClicked='';
  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService
    ,private servUser:UserService
    ,private servSellercommission:SellercommissionService
    ,private servCategory:CategoryService
    ,private authServ:AuthenticationService
    ,private otpService: OtpService
    ,private notify:NotificationService
    ,private router:Router){
  
  }
 
  ngOnInit() {


    this.param_Customer_id=0;
    

    this.myForm = this.formBuilder.group({
      id:[''],
      userid:['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],//mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      display_name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
      password:['',[Validators.required,this.passwordValidator]],
      passwordRepeat:['',[Validators.required,this.passwordValidator]],
      otp:[],
      userrole:[],
      CREATEDBY_username:[]
    /*   f3:['xyz',Validators.required],    
      f4:['INR',Validators.required],  
      f5:['Maintenance',Validators.required],  */
    
    }, { validators: this.passwordsMatchValidator })
  
    this.getSellerList();

  }
 async ngOnChanges(changes: SimpleChanges) {
    if (changes['param_Customer_id']) {
         // Call your method here
     // this.getCategories();
        if (this.param_Customer_id==0){ this.addedit_OPmode="Add";    this.myForm.reset(); }
       else {this.addedit_OPmode="Edit"}

    //patchvalues
    if (this.param_Customer_id) {
  
    // await this.get_Product();
    //await this.get_Seller_Commission_Setting();
    await this.get_Seller_Details();
     // setTimeout(() => {
        
      this.myForm.patchValue({
        id:this.product_Selected.id,
        userid: this.product_Selected.userid,
        display_name:this.product_Selected.display_name,
        password:this.product_Selected.password,
        userrole:this.product_Selected.userrole,
     
      });
    //  }, 300);
    }
    }
  }
  
  
  getSellerList(){
    this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{this.sellerList=res});
    }
  
  get_Seller_Commission_Setting_notinuse(){
    return new Promise((resolve, reject) => {
    
      this.servSellercommission.get_Seller_Commission_Setting(this.param_Customer_id,true).subscribe((res:any)=>{
      this.product_Selected=res[0];
    
      resolve(true);
    });
  });
  }

  get_Seller_Details(){
    return new Promise((resolve, reject) => {
    
      this.servUser.getUser(this.param_Customer_id).subscribe((res:any)=>{
      this.product_Selected=res[0]; console.log('userdetail:'+JSON.stringify(res[0]))
    
      resolve(true);
    });
  });
  }
  
get errorControl() {
  return this.myForm.controls;
}
 // Helper method to access form controls
 get f() {
  return this.myForm.controls;
}

entering_userid_to_register(){ 
  this.alExists=false;
  if(this.errorControl['userid'].value.toString().length==10){
  console.log('fired entering_userid_to_register')
  this.servUser.getUsers_Of_mobilenumber(this.errorControl['userid'].value).subscribe((res:any)=>{
   /*  console.log('res:'+JSON.stringify(res[0].userid)); */
   if(res[0].userid==this.errorControl['userid'].value.toString()){ this.alExists=true;}
  })}
}
Register_NewCustomer()
{
  
this.mobileNumber=this.errorControl['userid'].value;


this.otpService.sendotpORregister({
  id:0,  userid:this.mobileNumber, 
  display_name:this.errorControl['display_name'].value,
  password:this.errorControl['password'].value,
  userrole:'Customer',
  IsActive:true},'register')
  .subscribe(
    response => {console.log('response of registring user:'+response)}
    ,
      error => {
        console.error('Failed to register customer');
        console.error(error);
      }
      )
}
sendOTP() {
this.mobileNumber=this.errorControl['userid'].value;
  this.otpService.sendotpORregister({mobileNumber:this.mobileNumber},'sendotp')
    .subscribe(
      response => {

       this.otp_which_sent_to_customer= response.otp_which_sent_to_customer;
       this.wait_otpmatchstarted=true;
       setTimeout(() => { //after half minutes wipe out otp
        this.wait_otpmatchstarted=false;this.otp_which_sent_to_customer='';
       }, 30000);

        console.log(response.message);console.log('otp:'+response.otp_which_sent_to_customer)
      },
      error => {
        console.error('Failed to send OTP');
        console.error(error);
      }
    );
}
 passwordValidator(control: any): { [key: string]: boolean } | null {
  const password = control.value;
  if (!password) {
    return null;
  }

  // Check if the password contains at least one capital letter
  if (!/[A-Z]/.test(password)) {
    return { uppercase: true };
  }

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


public onSubmitClick(): void {
  this.submitClicked = 'Submit';
}

public onRegistrationRequest(): void {
  this.submitClicked = 'Request';
}

  onSubmit() {
      
if(this.submitClicked=='Request'){
  if(this.myForm.valid){  
    //if(this.passwordsMatchValidator()){
        this.sendOTP();   
    //}
      }
}

else   if(this.submitClicked=='Submit')  {
  console.log('m ready to match otp');
  console.log('condition check:'+this.errorControl['otp'].value)
  if(this.errorControl['otp'].value===this.otp_which_sent_to_customer){
    this.Register_NewCustomer();
  //  this.notify.showSuccess("You have been registered successfully, Thanks for showing awareness and welcome to Kolhapur Bazzar","Cutomer Registration")
  alert('You have been registered successfully, Thanks for showing awareness and welcome to Kolhapur Bazzar')
  this.router.navigate(['/Auth']);
  }else{
    //this.notify.showWarning("You Entered Wrong OTP","Cutomer Registration")}
    alert('You Entered Wrong OTP","Cutomer Registration')
  }
}
    
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

