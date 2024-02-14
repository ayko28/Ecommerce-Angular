import { ChangeDetectorRef, Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonService } from 'src/app/shared/Services/common.service';
import { ExternalLibraryService } from 'src/app/shared/Services/external-library.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { ParameterService } from 'src/app/shared/Services/parameter.service';
import { SellercommissionService } from 'src/app/shared/Services/sellercommission.service';
import { WindowRefService } from 'src/app/window-ref.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss']
})
export class RazorpayComponent {
  responseerrorcode:any;responseerrordescription:any;
  RPResponse:any;
  @Input() param_RP_Orderid!:string;
  @Input() param_RP_Amount!:string;
  @Input() param_RP_currency:string='INR';
  @Input() param_RP_receipt!:string;
  @Input() param_RP_Notes:string='Commission Paid';
  @Input() Seller_id_of_whom_to_pay!:number;
  @Output() paymentSuccess: EventEmitter<any> = new EventEmitter<any>();

  razorpayResponse:any;
  
  showModal = false;
  Razorpay_key:any;
  constructor(private razorpayService: ExternalLibraryService, private cd:  ChangeDetectorRef
        ,private servAuth:AuthenticationService
    ,private servSellercommission:SellercommissionService
    ,private servParameter:ParameterService
        ,private servCommon:CommonService
        ,private notify:NotificationService
    //,private navCtrl:NavController
    ,private winRef: WindowRefService){}
 async ngOnInit() {
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();

      //Default we  set here Razorpay_key
      // this.Razorpay_key='';  
    if(this.servAuth.currentUserValue?.userrole=='Seller'){ await this.get_RazorPay_key('me');}
else if(this.servAuth.currentUserValue?.userrole=='Customer'){ await this.get_RazorPay_key('Seller');}

  }
get_RazorPay_key(pay_to_whome:any){
  return new Promise((resolve, reject) => {
  
    if(pay_to_whome=='me'){
    //for my Razorpay key
    this.servParameter.get_Parameter_Setting().subscribe((res:any)=>{
      this.Razorpay_key=res[0].RP_key;
    console.log('retireved mine rp key  from DB....................'+res[0].RP_key)
      resolve(true);
    });
    }
    else if(pay_to_whome=='Seller'){//this.servAuth.currentUserValue?.id
   this.servSellercommission.get_Seller_Commission_Setting(this.Seller_id_of_whom_to_pay,true).subscribe((res:any)=>{
    this.Razorpay_key=res[0].RP_key;
  console.log('retireved sellers  rp key from DB whos id is '+this.Seller_id_of_whom_to_pay+'....................'+res[0].RP_key)
    resolve(true);
  }); 
}
   

});
}
  RAZORPAY_OPTIONS = {
     "key": "", 
    "amount":  this.param_RP_Amount ,
    "name": "Pay",
    "order_id": this.param_RP_Orderid,
    "handler": function (response:any){
      console.log(response.razorpay_payment_id);
      console.log(response.razorpay_order_id);
      console.log(response.razorpay_signature);
      
  },
    "description": "Load Wallet",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
      "name": "",
      "email": "test@test.com",
      "contact": "989084`532",
      "method": ""
    },
    "modal": {
      //"ondismiss": this.razorPayFailureHandler.bind(this)
    },
    "theme": {
      "color": "#0096C5"
    }
  };


  //rzp_test_vmjtxiBj8VbrZj
  public proceed() {
    //rzp_test_vmjtxiBj8VbrZj
  
    this.RAZORPAY_OPTIONS.key =this.Razorpay_key;
    this.RAZORPAY_OPTIONS.amount = this.param_RP_Amount + '00';

    //dismiss
    //this.RAZORPAY_OPTIONS['modal.ondismiss'] = this.razorPaySuccessHandler.bind(this);
    this.RAZORPAY_OPTIONS['modal'] = { ondismiss: this.razorPayFailureHandler.bind(this) };

    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

   /* let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open(); */
    //these above 2 lines has been replaced by below
    //this.navCtrl.isNavigationBarHidden = true

    const rzp = new this.winRef.nativeWindow.Razorpay(this.RAZORPAY_OPTIONS);
    rzp.on('payment.cancel', this.cancelCallback);
    //
    let me=this;
    rzp.on('payment.failed', function (response:any){
      me.responseerrorcode=response.error.code;
      me.responseerrordescription=response.error.description;
    me.servCommon.presentToast('middle',response.error.code+'-'+response.error.description)
     
});
    //
  rzp.open();
  }
   cancelCallback = (error:any) =>{
    console.log('this is a cancelCallback.............................')
   this.servCommon.presentToast('middle', 'cancelCallback working...'+error.description + 'errorcode:'+ error.code ) ;
          };

razorPayFailureHandler(error: any) {
            console.log('Payment failed');
            // Perform any necessary actions for failure
          }


public razorPaySuccessHandler=(response:any) =>{

    /* if (response.razorpay_payment_id) {
      console.log('Payment is successful');
      console.log('Razorpay Payment ID:', response.razorpay_payment_id);
      
    } else {
      console.log('Payment is a failure');
   
    } */


    console.log('this is razorPaySuccessHandler...........................');
    console.log('in razorPaySuccessHandler, Orderid:'+this.param_RP_Orderid)
    console.log('in razorPaySuccessHandler, response.razorpay_payment_id:'+response.razorpay_payment_id)
  //  this.servCommon.presentToast('middle',' Generated orderid:'+this.param_RP_Orderid )
   this.notify.showInfo('Success for pay commission','Commission');
   // Emit the paymentSuccess event with the payment details
  this.paymentSuccess.emit(response);
   //var obj={ userAutoId:this.param_userAutoId , Bank_ID:this.Bank_ID,  PayAmt:this.param_RP_Amount , PayType: 'Online Internal',  PayDate:Date(), Narration:this.param_RP_Notes, ApprovalStatus:'Approved'}

    //this.servIntMaintenance.paymentInternalNew(obj,this.currentUser.display_name).subscribe((res:any)=>{

    //})

    this.razorpayResponse = `Razorpay Response`;
    this.showModal = true;
    this.cd.detectChanges() 
   // document.getElementById('razorpay-response').style.display = 'block';
  }

}
