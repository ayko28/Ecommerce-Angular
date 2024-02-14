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

@Component({
  selector: 'app-commision-percents-add-edit',
  templateUrl: './commision-percents-add-edit.component.html',
  styleUrls: ['./commision-percents-add-edit.component.scss']
})
export class CommisionPercentsAddEditComponent {
  

  selectedSeller_id: number | null = null;
  
  @Input() param_Product_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string=''
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
    ,private notify:NotificationService){
  
  }
 
  ngOnInit() {
    
    

    this.myForm = this.formBuilder.group({
      seller_id:[''],
      seller_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      commission_percent:['',[Validators.min(0),Validators.max(50)]],
      credit_limit:['',[Validators.min(1000),Validators.max(10000)]],
      RP_key:['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
    /*   f3:['xyz',Validators.required],    
      f4:['INR',Validators.required],  
      f5:['Maintenance',Validators.required],  */
    
    })
  
    this.getSellerList();

  }
 async ngOnChanges(changes: SimpleChanges) {
    if (changes['param_Product_id']) {
         // Call your method here
     // this.getCategories();
        if (this.param_Product_id==0){ this.addedit_OPmode="Add";    this.myForm.reset(); }
       else {this.addedit_OPmode="Edit"}

    //patchvalues
    if (this.param_Product_id) {
  
    // await this.get_Product();
    await this.get_Seller_Commission_Setting();
     // setTimeout(() => {
        
      this.myForm.patchValue({
        seller_id: this.product_Selected.seller_id,
        seller_name:this.product_Selected.seller_name,
        commission_percent:this.product_Selected.commission_percent,
        credit_limit:this.product_Selected.credit_limit,
        RP_key:this.product_Selected.RP_key
      });
    //  }, 300);
    }
    }
  }
  
  
  getSellerList(){
    this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{this.sellerList=res});
    }
  
  get_Seller_Commission_Setting(){
    return new Promise((resolve, reject) => {
    
      this.servSellercommission.get_Seller_Commission_Setting(this.param_Product_id,true).subscribe((res:any)=>{
      this.product_Selected=res[0];
    
      console.log('aaaaaaaaaaaaaaaa here is get data of comm seting:'+JSON.stringify(res[0]))
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

public onDeleteClick(): void {
  this.submitClicked = 'Delete';
}
public onCancelClick(): void {
  this.submitClicked = 'Cancel';
}
  onSubmit() {
      
if(this.submitClicked=='Cancel'){
  this.formSaved.emit(true);this.myForm.reset();
  this.addedit_OPmode='';
  return
}
    if(this.addedit_OPmode=='Add'){
      this.myForm.patchValue({ seller_id: this.selectedSeller_id})
    this.servSellercommission.update_Seller_Commission_Setting(this.myForm.value).subscribe(response => {
      console.log('trying to Add commission setting...')
           this.formSaved.emit(true);this.myForm.reset();console.log('update product done...')
           this.notify.showInfo('Commission Setting Saved...','Commission')
    });
  }
  else if(this.addedit_OPmode=='Edit')
  { 
    this.servSellercommission.update_Seller_Commission_Setting(this.myForm.value).subscribe(response => {
      console.log('trying to update product...')
           this.formSaved.emit(true);this.myForm.reset();
           this.notify.showInfo('Update Commission Setting done...','Commission')
    });
  }
  
  }
  
  

  onSelectProduct(selectedItem: any) {
    console.log('in onSelectProduct')
    this.selectedSeller_id = selectedItem.id;
  }
  
}

