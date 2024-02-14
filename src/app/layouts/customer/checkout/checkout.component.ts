import { Component,OnInit, Input, SimpleChanges } from '@angular/core';
import { RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/shared/Services/order.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { CommonService } from 'src/app/shared/Services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {


//rAZORPAY PART
RPOrderid!:any;RPamount!:any;RPcurrency!:any;RPnotes!:any;RPreceipt!:any;
OrderAmount_to_pay!:any;

private apiUrl=environment.apiUrl;
currSeller!:any;
//END rAZORPAY PART
  
  myForm!: FormGroup;
  //@Input() cartitemsToPlaceOrder!: Array<any>;
  cartitemsToPlaceOrder!: any[];
  totalPrice: any;discount:number=0;
  myarr:any;

  currentUser:any;

  seller_id!:number;
  unit_master!:any;
  constructor(private http:HttpClient,private router: Router,private route:ActivatedRoute,private servAuth:AuthenticationService,public formBuilder: FormBuilder
    ,private servOrder:OrderService
    ,private servUnitmgt:UnitmgtService,public servCommon:CommonService){ 
   console.log('constructor runing in checkout....')
   this.servAuth.currentUser.subscribe(x => this.currentUser = x);
   console.log('cvalue:'+  JSON.stringify(this.servAuth.currentUserValue!.userid));
  }

async ngOnInit(){

  this.unit_master= await this.servUnitmgt.getUnitMasterwithpromise();
  this.myForm = this.formBuilder.group({
  
    userid:['',[Validators.required,Validators.min(3),Validators.max(20)]],
    seller_id:[],
    totalPrice:[]

  })

 
   await this.receive_order();
  
 this.calculateTotalPrice();this.patchFormvalues();

   
//
  }
 
  
  //for Razorpay
  
createRazoppay_Order(param_amt_to_pay:number){
 // this.currSeller=param_seller;//this is only for button hide unhide
  var url=this.apiUrl+'Razor';//
//var url='http://localhost:3041/api/'+'Razor';
  var options={amount: param_amt_to_pay,currency:"INR",receipt:"RPreceipt",notes:"RPnotes"};

this.OrderAmount_to_pay=param_amt_to_pay;

  console.log('creating order with options:'+JSON.stringify(options))
  this.http.post(url,options).subscribe((res:any)=>{

    console.log('rrrrrrrrrrrrresponse:'+JSON.stringify(res.id));
    this.RPOrderid=res.id;
    this.RPamount=this.OrderAmount_to_pay;
    
    this.RPcurrency="INR";
    
    this.RPreceipt='RPreceipt';
    
    this.RPnotes='RPnotes';

  })
}

handlePaymentSuccess(paymentDetails: any) {
  console.log('m in cartDB Payment successful:', paymentDetails);
  this.onSubmit();
 // console.log('currSeller.seller_name idx currSeller.seller_id :'+this.currSeller.seller_name+','+ '99' + this.currSeller.seller_id)
 // this.PlaceOrder(this.currSeller.seller_name,99,this.currSeller.seller_id)
  // Handle the successful payment logic here
}

//end Razorpay

  patchFormvalues(){
    this.myForm.patchValue({
      userid:this.servAuth.currentUserValue!.userid
    , seller_id:this.seller_id,
    totalPrice:this.totalPrice
    });


  }

  receive_order(){
    return new Promise((resolve,reject)=>{

      this.route.queryParams.subscribe(params => {console.log('params:'+params['cartitemsToPlaceOrder'])
      const cartitems = params['cartitemsToPlaceOrder'];

      this.cartitemsToPlaceOrder=JSON.parse(cartitems);
      this.seller_id=this.cartitemsToPlaceOrder[0].seller_id;

      this.totalPrice=this.cartitemsToPlaceOrder.reduce((acc, obj) => {
        return acc + obj.price * obj.quantity;
      }, 0);

      this.discount=params['discount']
      
    });

    resolve(true);

    })
  }


  calculateTotalPrice() {
  console.log('calc for :'+this.cartitemsToPlaceOrder)

  this.myarr=[{'id':1,'price':10,'quantity':7}];
  console.log('myarr:'+JSON.stringify(this.myarr))
        this.totalPrice =this.cartitemsToPlaceOrder.reduce((total:any, item:any) =>total+ (item.price*item.quantity
          //*0.001
* this.servCommon.GetDisplayNameByKey(this.unit_master,'id',item.selectedUnit,'conversion_factor')
          ) , 0);
  this.totalPrice=Math.ceil(this.totalPrice);
  }

  onSubmit(){
 var userId=this.currentUser.id;
        this.servOrder.CheckOutOrder('PAID',userId,this.seller_id,this.cartitemsToPlaceOrder,this.totalPrice,this.discount);  
  }


}

