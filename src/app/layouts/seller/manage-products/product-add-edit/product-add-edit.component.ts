import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent {

  @Input() param_currUserId:any=0

  @Input() param_Product_id!:number;@Output() formSaved=new EventEmitter<boolean>();
  
  addedit_OPmode:string=''
  product_Selected:any;
  myForm!: FormGroup;
  imageFile!: File;
  defaultDate = "1987-06-30";
  isSubmitted = false;isSubmitted_uploadform=false;
  categoryList:any[]=[];unit_master:any[]=[];
  isLoading:boolean=true;
  show_customQuantity_Details:boolean=false;
  searchNM:string='';products_matching:any[]=[];
  submitClicked='';
  shop_type_OfThis_seller_notinuse:any='';
  constructor(public formBuilder: FormBuilder
    ,private servProduct:ProductService,private servUnitmgt:UnitmgtService
    ,private servCategory:CategoryService,private servUser:UserService
    ,private authServ:AuthenticationService
    ,private notify:NotificationService,public servCommon:CommonService,private location:Location){
  
  }

  ngAfterViewInit(){
    this.getCategories();this.getUnit_Master();
    var varsellerid:number|undefined=this.authServ.currentUserValue!.id;
    this.servUser.getUser(varsellerid!).subscribe((res:any)=>{
      console.log('find shoptype in response:'+JSON.stringify(res))
 // this.shop_type_OfThis_seller=res[0].shop_type;
    })
  }
  getCategories(){
    this.servCategory.getCategorys().subscribe((res:any)=>{this.categoryList=res});
    }
   getUnit_Master(){
    
    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;
    this.unit_master=this.unit_master.filter((aUnit:any)=>aUnit.chooseasaunit==true)
    })

   }
  ngOnInit() {
    
    

    this.myForm = this.formBuilder.group({
      
      seller_id:[''],
      
      product_name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      imageUrl:[''],   
      category:['',[Validators.required]], unit_id:[]  ,
      price:['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      discount_text:[''],//,[Validators.minLength(3),Validators.maxLength(50)]
      icon: [],
      description:[''],//,[Validators.required],Validators.minLength(3),Validators.maxLength(50)
      IsOnlyForAdvertise:[false],OutOfStock:[false]
      //,Allowed_customPrice:[]
      ,Allowed_customQuantity:[],
    
    })
  
  }
 async ngOnChanges(changes: SimpleChanges) {
  //for admin behalf
  if (changes['param_currUserId']) {
    // Handle the changes to the currentUser input property
    
  }
  //end for admin behalf
    if (changes['param_Product_id']) {
         // Call your method here
      this.getCategories();
        if (this.param_Product_id==0){ this.addedit_OPmode="Add";    this.isLoading=false;   this.myForm.reset(); }
       else {this.addedit_OPmode="Edit"}

    //patchvalues
    if (this.param_Product_id) {
  
      this.isLoading=true;
     await this.get_Product();
     this.isLoading=false;
     // setTimeout(() => {
        
      this.myForm.patchValue({
        seller_id: this.product_Selected.seller_id,
        
        product_name: this.product_Selected.product_name,
        category:this.product_Selected.category_id,unit_id:this.product_Selected.unit_id,
        price:this.product_Selected.price,
        description:this.product_Selected.description,
        IsOnlyForAdvertise:this.product_Selected.IsOnlyForAdvertise,
        OutOfStock:this.product_Selected.OutOfStock,
        discount_text:this.product_Selected.discount_text,
        imageUrl:this.product_Selected.imageUrl
        //,Allowed_customPrice:this.product_Selected.Allowed_customPrice
        ,Allowed_customQuantity:this.product_Selected.Allowed_customQuantity
      });
    //  }, 300);
    }
    else {this.isLoading=false;}
    }
  }
  get_Product(){
    return new Promise((resolve, reject) => {
    this.servProduct.getProduct(this.param_Product_id).subscribe((res:any)=>{
      this.product_Selected=res[0];
      //console.log('m in addedt getting a user:'+JSON.stringify(res)+' abc:'+this.param_Product_id)
      //console.log('res[0]:'+JSON.stringify(res[0]))
      resolve(true);
    });
  });
  }
  
  onImageSelected(event:any) {
    this.imageFile = event.target.files[0]; console.log('event.target.files[0];'+event.target.files[0])
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
    this.isSubmitted=true;
    
  
    if(this.submitClicked=='Cancel'){ this.formSaved.emit(true);return;}

    /* this.formSaved.emit(true);this.myForm.reset(); */
    if(!this.myForm.valid){return;}

      // Handle form submission logic here
    const formData = new FormData();
    var  userid:any='';
    console.log('while submitting param_currUserId is:'+this.param_currUserId.id)
    if(this.authServ.currentUserValue!.id!=undefined){
      //userid=this.authServ.currentUserValue!.id
      userid=this.param_currUserId.id;
    }
    formData.append('id',this.param_Product_id.toString());    
    formData.append('seller_id',userid);    
    formData.append('product_name', this.myForm.value.product_name);    
    formData.append('category_id', this.myForm.value.category);    
    
    formData.append('price', this.myForm.value.price);
    formData.append('discount_text', this.myForm.value.discount_text);
    formData.append('description', this.myForm.value.description);
    
    formData.append('IsOnlyForAdvertise', this.myForm.value.IsOnlyForAdvertise);
    
    formData.append('OutOfStock', this.myForm.value.OutOfStock);
    formData.append('unit_id', this.myForm.value.unit_id);
    
   // formData.append('Allowed_customPrice', this.myForm.value.Allowed_customPrice);
    
    formData.append('Allowed_customQuantity', this.myForm.value.Allowed_customQuantity);
    
    formData.append('CREATEDBY_username', this.param_currUserId.display_name);

    if(this.imageFile && this.imageFile.name){
    formData.append('imageUrl', this.imageFile.name);  
    formData.append('icon', this.imageFile);
   }

   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    if(this.addedit_OPmode=='Add'){
      this.addedit_OPmode='';
    this.servProduct.addProduct(formData).subscribe(response => {
           this.formSaved.emit(true);this.myForm.reset();

           this.notify.showSuccess('Product Added successfully','New Product');
    });
  }
  else if(this.addedit_OPmode=='Edit')
  {
    this.addedit_OPmode='';
         
    this.servProduct.updateProduct(formData).subscribe(response => {
      console.log('trying to update product...');      
      console.log('here is response:'+JSON.stringify(response))
           this.formSaved.emit(true);this.myForm.reset();console.log('update product done...');
           
           this.notify.showInfo('Changes Done Successfully','Product');
    }); //end edit
    
  }
  


  }
  
  searchByName(){
  
    if(this.searchNM.toString().length==0){ this.products_matching.length=0;   }
    else if(this.searchNM.toString().length>=3){
      this.servProduct.getProductByPartialName(this.authServ.currentUserValue!.id,this.searchNM).subscribe((resSearchByName:any)=>{
          //console.log('ps ny nm:'+JSON.stringify(resSearchByName));
          this.products_matching=resSearchByName;
      })
    }
  }
}
