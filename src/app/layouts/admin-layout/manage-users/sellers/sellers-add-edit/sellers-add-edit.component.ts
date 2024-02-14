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
  selector: 'app-sellers-add-edit',
  templateUrl: './sellers-add-edit.component.html',
  styleUrls: ['./sellers-add-edit.component.scss']
})
export class SellersAddEditComponent {


  selectedSeller_id: number | null = null;
  
  @Input() param_Seller_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string=''
  product_Selected:any;
  myForm!: FormGroup;
  imageFile!: File;
  defaultDate = "1987-06-30";
  isSubmitted = false;isSubmitted_uploadform=false;
  categoryList:any[]=[];
  sellerList:any[]=[];
  currentUser:any;
  submitClicked='';
  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService
    ,private servUser:UserService
    ,private servSellercommission:SellercommissionService
    ,private servCategory:CategoryService
    ,private servAuth:AuthenticationService
    ,private notify:NotificationService){
  
  }
 
  ngOnInit() {
    
    if(this.servAuth.currentUserValue){
     this.currentUser = this.servAuth.currentUserValue;
     }

    this.myForm = this.formBuilder.group({
      id:[0],
      userid:[''],
      display_name:['',[Validators.required,Validators.min(3),Validators.max(50)]],
      password:[], oldpassword:[],
      userrole:['Seller'],
      firm_name:[],
      firm_addr:[],shop_type:['',[Validators.required,Validators.min(6),Validators.max(25)]],
      IsActive:[],area_code:['',Validators.required],
      CREATEDBY_username:[]
    /*   f3:['xyz',Validators.required],    
      f4:['INR',Validators.required],  
      f5:['Maintenance',Validators.required],  */
    
    })
  
    this.getSellerList();

  }
 async ngOnChanges(changes: SimpleChanges) {
  
    if (changes['param_Seller_id']) {
         // Call your method here
     // this.getCategories();
        if (this.param_Seller_id==0){ this.addedit_OPmode="Add";    this.myForm.reset(); }
       else {this.addedit_OPmode="Edit"}

       
    //patchvalues
    if (this.param_Seller_id) {
  
    // await this.get_Product();
    //await this.get_Seller_Commission_Setting();
    await this.get_Seller_Details();
     // setTimeout(() => {
        
      this.myForm.patchValue({
        id:this.product_Selected.id,
        userid: this.product_Selected.userid,
        display_name:this.product_Selected.display_name,
        area_code:this.product_Selected.area_code,
        password:'NotEditing*123',oldpassword:'iamadmin',
        userrole:this.product_Selected.userrole,
        firm_name:this.product_Selected.firm_name,
        firm_addr:this.product_Selected.firm_addr,
        shop_type:this.product_Selected.shop_type,
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
    
      this.servSellercommission.get_Seller_Commission_Setting(this.param_Seller_id,true).subscribe((res:any)=>{
      this.product_Selected=res[0];
    
      resolve(true);
    });
  });
  }

  get_Seller_Details(){
    return new Promise((resolve, reject) => {
    
      this.servUser.getUser(this.param_Seller_id).subscribe((res:any)=>{
      this.product_Selected=res[0]; 
    
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
      
    if(this.submitClicked=='Cancel'){ this.formSaved.emit(true);return;}
    
    if(this.addedit_OPmode=='Add'){
     // this.myForm.patchValue({ seller_id: this.selectedSeller_id});
     this.myForm.patchValue({ id: 0});
     this.myForm.patchValue({ userrole: 'Seller'});
      this.myForm.patchValue({ CREATEDBY_username: this.currentUser.display_name});

    this.servUser.addUser(this.myForm.value).subscribe(response => {
      console.log('trying to Add user...')
           this.formSaved.emit(true);this.myForm.reset();
           this.notify.showSuccess('Seller Added Successfully','Seller')
    });
  }
  else if(this.addedit_OPmode=='Edit')
  { 
   
    this.servUser.updateUser(this.myForm.value).subscribe(response => {
      console.log('trying to update product...')
           this.formSaved.emit(true);this.myForm.reset();
           
           this.notify.showSuccess('Seller Data Changed Successfully','Seller')
    });
  }
  
  }
  
  

  onSelectProduct(selectedItem: any) {
    console.log('in onSelectProduct')
    this.selectedSeller_id = selectedItem.id;
  }
  
}

