import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { SellercommissionService } from 'src/app/shared/Services/sellercommission.service';
import { UserService } from 'src/app/shared/Services/user.service';
import { UserExtraService } from 'src/app/shared/Services/user-extra.service';
import { OtpService } from 'src/app/Core/Services/otp.service';
import { Router } from '@angular/router';
import { SellerareaService } from 'src/app/shared/Services/sellerarea.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';
@Component({
  selector: 'app-display-customers',
  templateUrl: './display-customers.component.html',
  styleUrls: ['./display-customers.component.scss']
})
export class DisplayCustomersComponent {



  myForm!: FormGroup;

  @Output() customer_id_for_Addedit=new EventEmitter<number>();
  @Output() customer_id_for_Detail=new EventEmitter();
  @Output() product_id_Selected=new EventEmitter<number>();
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  Seller_Commission_Setting!:any[];
  sellers:any[]=[];
  product_Selected:any;
  categoryList:any[]=[];
  users!:any[];
  pendingapprovalformobilenumber:any='';
mobileNumber!:string;otp_which_sent_to_customer!:string;wait_otpmatchstarted:boolean=false;
isDetectedareaconflict:boolean=false;
 constructor(public formBuilder: FormBuilder, private notify:NotificationService,public servCommon:CommonService,private servCategory:CategoryService,
  private servProduct:ProductService,
  private servSellerCommission:SellercommissionService,
  private servUser:UserService,private servUserExtra:UserExtraService,
  private servSellerarea:SellerareaService,
  private authServ:AuthenticationService,
  private otpService:OtpService,
  private router:Router){

 }
gotoRegisterApprove(){
    this.router.navigate(['seller/registerapproveconsumer',this.pendingapprovalformobilenumber])
}
async ngOnInit(){
  
   //check any pending approval for registration
   var alExists=await this.alreadyExist_Consumer('1111111111',1,'pending',this.authServ.currentUserValue!.id);
 
  // if(alExists==true){   alert("already existing pending consumer") }
  this.get_Users();
  setTimeout(() => {
  //  this.get_seller_commission_percents();   
  this.get_Users_seller_Only();

  this.getCategories();
  
  this.eventsSubscription = this.events.subscribe(() => this.get_Users_seller_Only());
  }, 2000);
}

sendOTP(mobileNumber:any) {
  return new Promise((resolve, reject) => {
    this.otpService.sendotpORregister({mobileNumber:mobileNumber},'sendotp')
      .subscribe(
        response => {
  
         this.otp_which_sent_to_customer= response.otp_which_sent_to_customer;resolve(this.otp_which_sent_to_customer);
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

      });
  }

  Detect_Areacodeconflict(){
    this.isDetectedareaconflict=false;
    if(this.mobileNumber.toString().length==10){
        var objBody={mobileNumber:this.mobileNumber,newsellerid:this.authServ.currentUserValue!.id}
      this.servSellerarea.checkareaconflict(this.mobileNumber,this.authServ.currentUserValue!.id)
      .subscribe((result:any) => {
        if (result.conflict) {
          this.notify.showWarning('Conflict occurred','Group Code'); alert('Conflict occured')
            this.isDetectedareaconflict=true;
            // Handle conflict logic
        } else {
           // alert('No conflict');
            // Handle no conflict logic
        }
    });
      
    }      
  }


async New_Consumer(){ 
 if(this.mobileNumber.toString().length==10){
  var alExists=await this.alreadyExist_Consumer(this.mobileNumber,0,'0',this.authServ.currentUserValue!.id);
 
  if(alExists==true){   this.notify.showInfo("already existing consumer","Consumer care");
  }
    else{
  var otpfromsupplier=await this.sendOTP(this.mobileNumber);  this.notify.showInfo('Sent OTP to New Consumer',"Communicating");
  this.servUserExtra.New_Consumer({mobileNumber:this.mobileNumber,seller_id:this.authServ.currentUserValue!.id,otpfromsupplier:otpfromsupplier})
  .subscribe((res:any)=>{
    console.log('response of new consumer added:'+JSON.stringify(res));
    
  })

  this.mobileNumber='';
  }  

 }
}

alreadyExist_Consumer(mobileNumber:any,from_userExtra:number,approval_status:any='0',seller_id:any=0){
  console.log('mobilenumber:'+mobileNumber+' ,from_userExtra:'+from_userExtra+',approval_status:'+approval_status+', seller_id:'+seller_id)
  return new Promise((resolve, reject) => {
    this.servUserExtra.getConsumers(mobileNumber,from_userExtra,approval_status,seller_id).subscribe((res:any)=>{
      console.log('getConsumer response:'+JSON.stringify(res))
      if(res[0] && res[0].userid){ 
        var result=res;
        console.log('result filter:'+JSON.stringify(res.filter((el:any)=>el.approval_status=='pending')))
        
        //
        if(res.filter((el:any)=>el.approval_status=='pending').length){
        this.pendingapprovalformobilenumber=res.filter((el:any)=>el.approval_status=='pending')[0].userid;
        }
         resolve(true);   
      }
      else resolve(false); 
      
    })
  
});

}
getCategories(){
  this.servCategory.getCategorys().subscribe((res:any)=>{this.categoryList=res});
  }
ngOnDestroy() {
  this.eventsSubscription.unsubscribe();
}
 //logic tip: To hide product-add-edit component, pass undefined for product id
 // asbelow
 //  this.customer_id_for_Addedit.emit(undefined)

 get_Users(){
  this.servUser.getUsers('').subscribe((res:any)=>{
    //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
    this.users=res;
    
 });}

 addProduct(){
  this.customer_id_for_Addedit.emit(0);
 }
 editProduct(param_Product:any){ 
  this.customer_id_for_Detail.emit(undefined);
   this.customer_id_for_Addedit.emit(param_Product.id);
 }
 selectProduct(param_Product:any){
  this.customer_id_for_Addedit.emit(undefined);
   this.customer_id_for_Detail.emit(param_Product.id);
 }

 get_Users_seller_Only(){
  this.servUser.getUsers_Of_role('Customer').subscribe((res:any)=>{
 this.sellers=res;
    
 });
 }

}
