import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, Injector } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { PromotionService } from 'src/app/shared/Services/promotion.service';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import {getTimepickerConfig} from './timepicker-config'
import { NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { NotificationService } from 'src/app/shared/Services/notification.service';

@Component({
  selector: 'app-order-promotion-add-edit',
  templateUrl: './order-promotion-add-edit.component.html',
  styleUrls: ['./order-promotion-add-edit.component.scss']
})
export class OrderPromotionAddEditComponent {



  bsConfig!: Partial<BsDatepickerConfig>;
  /* timepickerConfig: TimepickerConfig = Object.assign({}, {
    showMeridian: false,
    hourStep: 1,
    minuteStep: 5,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    showSpinners: true,
    arrowkeys: true,
    theme: 'default',
    alignSelectorRight: false,
    minutesLimit: null,
    hours24Format: false,
    timeSeparator: ':'
  }); */
  timepickerConfig: TimepickerConfig =getTimepickerConfig();

  @Input() param_PromoProd_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string='';
  product_Selected:any;
  myForm!: FormGroup;
  imageFile!: File;
  defaultDate = "1987-06-30";
  isSubmitted = false;isSubmitted_uploadform=false;
  PromotionTypeList:any[]=[];ProductList:any[]=[];
  /* private datePipe!: DatePipe */

  
  submitClicked = '';

  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService
    ,private servCategory:CategoryService,private servPromotion:PromotionService
    ,private authServ:AuthenticationService
    ,private injector: Injector
    ,private datePipe: DatePipe
    ,private notify:NotificationService
    ){
  
       this.bsConfig = {
        dateInputFormat: 'DD/MM/YYYY HH:mm:ss',
        //datepickerMode: 'day',
        containerClass: 'theme-default',
      }; 
      
  /*
      this.bsConfig = Object.assign({}, {
        containerClass: 'theme-default',
        dateInputFormat: 'DD/MM/YYYY'
      });*/
    
    }


    
  
  ngAfterViewInit(){
    this.getPromotionMaster();this.getProductList();
 
  }
  getPromotionMaster(){
    this.servPromotion.getPromotionMast().subscribe((res:any)=>{this.PromotionTypeList=res});
    }
    getProductList(){
      var  userid:any='';
      if(this.authServ.currentUserValue!.id!=undefined){userid=this.authServ.currentUserValue!.id}
      this.servProduct.getProducts_Ofseller(userid).subscribe((res:any)=>{this.ProductList=res});
    }
  ngOnInit() {
    
    

    this.myForm = this.formBuilder.group({
      id:[],
      seller_id:['', Validators.required],
      promoType:['', Validators.required],  
      promotionName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      discountAmount:['',[Validators.min(10),Validators.max(9999)]],
      discountPercentage:['',[Validators.min(1),Validators.max(90)]],
      minOrderAmount:['', [Validators.required,Validators.min(100)]],
      startDate: ['', Validators.required],
      //startTime:[''],
      endDate:['', Validators.required]
    })
  
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedYear = `${year}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return formattedDate;
  }
  
  formatDate1(date: Date): string {
    const day = date.getDate();
    const month =date.getMonth() + 1; // Months are zero-based
 
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
   
    const formattedDate = `${formattedDay}-${formattedMonth}-${date.getFullYear()}`;
  //const formattedDate = `${date.getFullYear()}/${formattedMonth}/${formattedDay}`;
    return formattedDate;
  }
  
  
  format2Date(date: Date): string {
    const day = date.getDate()+1;
    const month =date.getMonth() + 1; // Months are zero-based
 
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
   
   // const formattedDate = `${formattedDay}-${formattedMonth}-${date.getFullYear()}`;
  const formattedDate = `${date.getFullYear()}/${formattedMonth}/${formattedDay}`;
    return formattedDate;
  }
  
  
 async ngOnChanges(changes: SimpleChanges) {
    if (changes['param_PromoProd_id']) {
         // Call your method here
      this.getPromotionMaster();
        if (this.param_PromoProd_id==0){ this.addedit_OPmode="Add";    this.myForm.reset(); }
       else {this.addedit_OPmode="Edit"}

       console.log('detecting change param_PromoProd_id:'+this.param_PromoProd_id)
    //patchvalues
    if (this.param_PromoProd_id) {
  
     await this.get_Product();
     // setTimeout(() => {
      var  userid:any='';
      if(this.authServ.currentUserValue!.id!=undefined){userid=this.authServ.currentUserValue!.id}

    
console.log('product_Selected.startDate order:'+'-->'+this.product_Selected.startDate+'<--');
console.log('transformmatted startDate:'+this.datePipe.transform(this.product_Selected.startDate, 'dd/MM/yyyy'))
console.log('product_Selected.minOrderAmount order:'+'-->'+this.product_Selected.minOrderAmount+'<--');
      // Format the dates
const formattedStartDate = this.datePipe.transform(this.product_Selected.startDate, 'dd/MM/yyyy HH:mm:ss');
const formattedEndDate = this.datePipe.transform(this.product_Selected.endDate, 'dd/MM/yyyy HH:mm:ss');

//const formattedStartDate =this.formatDate(new Date(this.product_Selected.startDate));
//console.log('formattedStartDate:'+formattedStartDate)
//const currentDate = new Date();const formattedStartDate ='15/06/2023 00:00:00';

//const formattedEndDate =this.formatDate(new Date(this.product_Selected.endDate));

//const formattedStartDate =this.formatDate(new Date(this.product_Selected.startDate));
//const formattedEndDate =this.formatDate(new Date(this.product_Selected.endDate));


//console.log('formattedStartDate:'+this.format2Date(formattedStartDate))//, 'yyyy-MM-dd', 'en-US'))

//console.log(' formatDate :'+ formatDate(formattedStartDate, 'yyyy-MM-dd', 'en-US'))

      console.log('patching id value:'+this.product_Selected.id)
      console.log('patching order sdate:'+formattedStartDate)
      this.myForm.patchValue({
      
        id:this.product_Selected.id,
        seller_id: userid,
        promoType:this.product_Selected.promotionType,
        promotionName:this.product_Selected.promotionName,
       discountAmount:this.product_Selected.discountAmount,
       discountPercentage:this.product_Selected.discountPercentage,
       
        startDate: formattedStartDate,
        endDate:formattedEndDate,
         minOrderAmount:this.product_Selected.minOrderAmount

        /* startDate: formattedStartDate,//   formatDate(formattedStartDate, 'yyyy-MM-dd', 'en-US'),
         endDate: formattedEndDate// formatDate(formattedEndDate, 'yyyy-MM-dd', 'en-US')   */
      });
    //  }, 300);
    }
    }
  }
  get_Product(){
    return new Promise((resolve, reject) => {
    this.servPromotion.get_Promotion_OrderById(this.param_PromoProd_id).subscribe((res:any)=>{
      this.product_Selected=res[0];
      console.log('mm in getpromotion of order res[0] is:'+ JSON.stringify(res[0]))

      resolve(true);
    });
  });
  }
 
  
  onImageSelected(event:any) {
    this.imageFile = event.target.files[0];
  }
  
  
get errorControl() {
  return this.myForm.controls;
}

//decider submit or delete
public onSubmitClick(): void {
  this.submitClicked = 'Submit';
}

public onDeleteClick(): void {
  this.submitClicked = 'Delete';
}
public onCancelClick(): void {
  this.submitClicked = 'Cancel';
}
  onSubmit() {
  
   if(this.submitClicked=='Delete'){ 
    console.log(' hey i want to delete');
    console.log('this.myForm.value:'+JSON.stringify(this.myForm.value))
    this.servPromotion.deletePromotion_Order(this.myForm.value).subscribe(response => {
      this.formSaved.emit(true);this.myForm.reset();
      this.addedit_OPmode='';
    });
    return }
    else  if(this.submitClicked=='Cancel'){
      this.formSaved.emit(true);this.myForm.reset();
      this.addedit_OPmode='';
      return
    }
    // Handle form submission logic here
  
    /* this.formSaved.emit(true);this.myForm.reset(); */
    //const formData = new FormData();
    var  userid:any='';
    if(this.authServ.currentUserValue!.id!=undefined){userid=this.authServ.currentUserValue!.id}
    this.myForm.patchValue({seller_id:userid});
 console.log(this.myForm.value);
    console.log('this.authServ.currentUserValue!.id:'+userid)
//console.log('aaaa:'+this.errorControl)
    /* formData.append('id',this.param_Product_id.toString());    
    formData.append('seller_id',userid);    
    formData.append('productId', this.myForm.value.productId);
 */
    if(this.addedit_OPmode=='Add'){ 
      
  this.isSubmitted=true;
      console.log('this.myForm.value:'+JSON.stringify(this.myForm.value));
      console.log('PromotionTypeList:'+JSON.stringify(this.PromotionTypeList))
    this.servPromotion.addPromotion_Order(this.myForm.value).subscribe(response => {
           this.formSaved.emit(true);this.myForm.reset();
           this.addedit_OPmode='';
           
           this.notify.showInfo('Promotion Added Successfully','Promotion');
    });
  }
  else if(this.addedit_OPmode=='Edit')
  {console.log('aaaaaabbbaaaaaaaa');

  this.isSubmitted=true;
  setTimeout(() => {
      
  //console.log('format2Date passing a date:'+  this.errorControl['startDate'].value)
  //console.log('startDate is :'+this.errorControl['startDate'].value)
//  console.log('isValidDate startDate:'+this.isValidDate(this.formatDate1(this.errorControl['startDate'].value)))
console.log('startdate before submit is:'+((this.errorControl['startDate'].value)))
console.log('endDate before submit is:'+((this.errorControl['endDate'].value)))
  //this.myForm.patchValue({startDate:(this.errorControl['startDate'].value)})
  //this.myForm.patchValue({endDate:(this.errorControl['endDate'].value)})
    this.servPromotion.editPromotion_Order(this.myForm.value).subscribe(response => {
           this.formSaved.emit(true);this.myForm.reset();
           this.addedit_OPmode='';
           
           this.notify.showInfo('Changes Done Successfully','Promotion');
    });

   
    }, 3000);
  }
  


  }//end submit

  
  isValidDate(dateString:any) {
    return !isNaN(Date.parse(dateString));
  }
}
