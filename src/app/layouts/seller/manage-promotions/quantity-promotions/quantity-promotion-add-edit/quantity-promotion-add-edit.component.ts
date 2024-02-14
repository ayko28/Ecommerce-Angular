import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, Injector } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

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
  selector: 'app-quantity-promotion-add-edit',
  templateUrl: './quantity-promotion-add-edit.component.html',
  styleUrls: ['./quantity-promotion-add-edit.component.scss']
})
export class QuantityPromotionAddEditComponent {

  //@Input() 
  quantityStagesFormArray!: FormArray;


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
  
  addedit_OPmode:string=''
  product_Selected:any;
  myForm!: FormGroup;
  imageFile!: File;
  defaultDate = "1987-06-30";
  isSubmitted = false;isSubmitted_uploadform=false;
  PromotionTypeList:any[]=[];ProductList:any[]=[];

  submitClicked = '';
  
  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService
    ,private servCategory:CategoryService,private servPromotion:PromotionService
    ,private authServ:AuthenticationService
    ,private injector: Injector
    ,private datePipe: DatePipe
    ,private notify:NotificationService){
  
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
    
      this.myForm = this.formBuilder.group({
        id:[],
        seller_id:[''],
        productId:[''],
        promoType:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],  
        promotionName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
        quantityStagesFormArray: this.formBuilder.array([]),
      //  discountAmount:['0',[Validators.min(10),Validators.max(9999)]],
       // discountPercentage:['0',[Validators.min(1),Validators.max(90)]],
       startDate: ['', Validators.required],
       //startTime:[''],
       endDate:['']
      })
     // this.quantityStagesFormArray = this.formBuilder.array([]); // Get a reference to the quantityStagesFormArray for easier access
    this.quantityStagesFormArray = this.myForm.get('quantityStagesFormArray') as FormArray;


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
    
    

    /* this.myForm = this.formBuilder.group({
      id:[],
      seller_id:[''],
      productId:[''],
      promoType:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],  
      promotionName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      quantityStagesFormArray: this.formBuilder.array([]),
    //  discountAmount:['0',[Validators.min(10),Validators.max(9999)]],
     // discountPercentage:['0',[Validators.min(1),Validators.max(90)]],
     
    }) */
  
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
  // const formattedDate = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
  }
  format2Date(date: Date): string {
    const day = date.getDate();
    const month =date.getMonth() + 1; // Months are zero-based
 
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
   
  // const formattedDate = `${formattedDay}-${formattedMonth}-${date.getFullYear()}`;
   const formattedDate = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
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

      
console.log('product_Selected.startDate product:'+'-->'+this.product_Selected.startDate+'<--');
//const formattedStartDate =this.formatDate(new Date(this.product_Selected.startDate));
//const formattedEndDate =this.formatDate(new Date(this.product_Selected.endDate));
   // Format the dates
   const formattedStartDate = this.datePipe.transform(this.product_Selected.startDate, 'dd/MM/yyyy HH:mm:ss');
   const formattedEndDate = this.datePipe.transform(this.product_Selected.endDate, 'dd/MM/yyyy HH:mm:ss');
   
//console.log('formattedStartDate:'+formattedStartDate)


      console.log('patching id value:'+this.product_Selected.id)
      console.log('patching product sdate:'+formattedStartDate)
      this.myForm.patchValue({
        id:this.product_Selected.id,
        seller_id: userid,
        productId:this.product_Selected.productId,
        promoType:this.product_Selected.promotionType,
        promotionName:this.product_Selected.promotionName,
        
        discountAmount:this.product_Selected.discountAmount,
        discountPercentage:this.product_Selected.discountPercentage,
        startDate:formattedStartDate,
        endDate:formattedEndDate
      });
    //  }, 300);
    }
    }
  }

  addStage(): void { 
    this.submitClicked='AddingStage';
    const newStage = this.formBuilder.group({
      quantityRangeStart: ['', Validators.required],
      quantityRangeEnd: ['', Validators.required],
      discountAmount:['',Validators.required],
      discountPercentage: ['', Validators.required]
    });
    this.quantityStagesFormArray.push(newStage); console.log('bbbbbbbbbbbbbbbb')
  
  }
 
  removeStage(index: number): void {
    this.quantityStagesFormArray.removeAt(index);
  }

  /* get_Product(){
    return new Promise((resolve, reject) => {
      console.log('param_PromoProd_id:'+this.param_PromoProd_id)
    this.servPromotion.get_Promotion_QuantityById(this.param_PromoProd_id).subscribe((res:any)=>{
      this.product_Selected=res[0];
      console.log('mm in getpromotion of quantity res[0] is:'+ JSON.stringify(res))

     
      setTimeout(() => {
        resolve(true);
      }, 1000);

setTimeout(() => {
   //--------------------------------------------------
   res.forEach((item:any)=> {
    console.log('adding stage:'+JSON.stringify((item)))
    this.quantityStagesFormArray.push(this.createQuantityStage(item));
  });
  //--------------------------------------------------
}, 5000);


    });
  });
  } */

  get_Product() {
    return new Promise((resolve, reject) => {
      // ...
      this.servPromotion.get_Promotion_QuantityById(this.param_PromoProd_id).subscribe((res: any) => {
        // ...
        this.product_Selected=res[0];
      console.log('res[0]:'+JSON.stringify(res[0]));console.log('param_PromoProd_id:'+this.param_PromoProd_id)
          res.forEach((item: any) => {
            this.quantityStagesFormArray.push(this.createQuantityStage(item));
          });
          resolve(true);
        
      });
    });
  }
  

  
 createQuantityStage(item: any): FormGroup {
  return this.formBuilder.group({
    quantityRangeStart: item.quantityRangeStart,
    quantityRangeEnd: item.quantityRangeEnd,
    discountAmount:item.discountAmount,
    discountPercentage: item.discountPercentage
  });
} 

  
/* 
createQuantityStage(item: any): FormGroup {
  return this.formBuilder.group({
    quantityRangeStart: [item.quantityRangeStart],
    quantityRangeEnd: [item.quantityRangeEnd],
    discountPercentage: [item.discountPercentage]
  });
}*/


 /*  get_Product(){
    return new Promise((resolve, reject) => {
    this.servProduct.getProduct(this.param_Product_id).subscribe((res:any)=>{
      this.product_Selected=res[0];console.log('m in addedt getting a user:'+JSON.stringify(res)+' abc:'+this.param_Product_id)

      resolve(true);
    });
  });
  } */
  
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
    if(this.submitClicked=='AddingStage'){
return;
    }
    else    if(this.submitClicked=='Delete'){ 
    console.log(' hey i want to delete');
    console.log('this.myForm.value in product:'+JSON.stringify(this.myForm.value))
    this.servPromotion.deletePromotion_Product(this.myForm.value).subscribe(response => {
      this.formSaved.emit(true);this.myForm.reset();
      this.addedit_OPmode='';
    });
    return }
    else if(this.submitClicked=='Cancel'){
      this.formSaved.emit(true);this.myForm.reset(); this.addedit_OPmode='';
        return
    }
    console.log(this.myForm.value);
    // Handle form submission logic here
  
    /* this.formSaved.emit(true);this.myForm.reset(); */
    //const formData = new FormData();
    var  userid:any='';
    if(this.authServ.currentUserValue!.id!=undefined){userid=this.authServ.currentUserValue!.id}
    this.myForm.patchValue({seller_id:userid});

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
    this.servPromotion.addPromotion_Product(this.myForm.value).subscribe(response => {
           this.formSaved.emit(true);this.myForm.reset();
           
           this.notify.showInfo('Promotion Added Successfully','Promotion');
    });
  }
  else if(this.addedit_OPmode=='Edit')
  {
    
  this.isSubmitted=true;
    //console.log('aaaaaaaaaaaaaa:this.errorControl["startDate"].value');
  //console.log(this.errorControl['startDate'].value);console.log('check here:->'+new Date('2023/06/13'))
//  this.myForm.patchValue({startDate:this.format2Date(this.errorControl['startDate'].value)})
this.myForm.patchValue({id:this.param_PromoProd_id});

console.log('this.myForm.value here submitting:'+ JSON.stringify(this.myForm.value))

console.log('param_PromoProd_id:'+this.param_PromoProd_id);
    this.servPromotion.editPromotion_Quantity(this.myForm.value).subscribe(response => {
           this.formSaved.emit(true);this.myForm.reset();
           
           this.notify.showInfo('Changes Done Successfully','Promotion Quantity');
    });
  }
  


  }
}
