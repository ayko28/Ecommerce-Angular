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
  selector: 'app-customers-add-edit',
  templateUrl: './customers-add-edit.component.html',
  styleUrls: ['./customers-add-edit.component.scss']
})
export class CustomersAddEditComponent {



  selectedSeller_id: number | null = null;
  
  @Input() param_Customer_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string=''
  product_Selected:any;
  myForm!: FormGroup;
  imageFile!: File;
  defaultDate = "1987-06-30";
  isSubmitted = false;isSubmitted_uploadform=false;
  categoryList:any[]=[];
  sellerList:any[]=[];
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
      id:[''],
      userid:[''],
      display_name:['',[Validators.required,Validators.min(3),Validators.max(50)]],
      password:[], oldpassword:[],
      userrole:[],
      IsActive:[]
    /*   f3:['xyz',Validators.required],    
      f4:['INR',Validators.required],  
      f5:['Maintenance',Validators.required],  */
    
    })
  
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
        password:'NotEditing*123',oldpassword:'iamadmin',
        userrole:this.product_Selected.userrole,
        IsActive:this.product_Selected.IsActive        
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
  onSubmit() {
      

    if(this.addedit_OPmode=='Add'){
      this.myForm.patchValue({ seller_id: this.selectedSeller_id})
    this.servUser.addUser(this.myForm.value).subscribe(response => {
      console.log('trying to add customer...')
           this.formSaved.emit(true);this.myForm.reset();
           this.notify.showSuccess('Customer Added Successfully','Customer')
    });
  }
  else if(this.addedit_OPmode=='Edit')
  { 
    this.servUser.updateUser(this.myForm.value).subscribe(response => {
      console.log('trying to update product...')
           this.formSaved.emit(true);this.myForm.reset();
           this.notify.showSuccess('Customer Data Changed Successfully','Customer')
    });
  }
  
  }
  
  

  onSelectProduct(selectedItem: any) {
    console.log('in onSelectProduct')
    this.selectedSeller_id = selectedItem.id;
  }
  
}

