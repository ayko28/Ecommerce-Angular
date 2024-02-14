import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/Core/Data/Models/cart-item.model';
import { Product } from 'src/app/Core/Data/Models/product.model';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CartDBService } from 'src/app/shared/Services/cart-db.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { ProductService } from 'src/app/shared/Services/product.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {
  @Input() product: any;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  modalRef: NgbModalRef | undefined;
  quantity:any=1;

  currentUser:any;
  selectedUnit!: number;quantity_InNosInRupeesInGms:any='InNos';
  unit_master:any[]=[];
  
  productForm:FormGroup;
  Unit_Master:any[]=[{id:1,unit_name:'Nos'},{id:2,unit_name:'Lilo'},{id:3,unit_name:'Gram'}];
  constructor(private fb:FormBuilder,private modalService: NgbModal,public activeModal: NgbActiveModal
    ,private servAuth:AuthenticationService,private servProduct:ProductService,private cartService:CartDBService
   ,private notify:NotificationService,private servUnitmgt:UnitmgtService,public servCommon:CommonService
    ) {

  
    if(this.servAuth.currentUserValue){
      this.currentUser = this.servAuth.currentUserValue;
     }
     this.productForm = this.fb.group({
      // ... Other form controls
      customPrice: [null],//, [Validators.required, Validators.min(5), Validators.max(100)]
      customQuantity: [null],//, [Validators.required, Validators.min(25), Validators.max(1000)]
      selectedUnit: 1
    });
     
    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})

  }

  ngOnInit(){
  
    this.getCartItems();
  }
  
//product.id

async getCartItems() {

  //this.product.selectedUnit=this.product.unit_id;
//if(this.product.unit_id==1){this.quantity_InNosInRupeesInGms='Nos'}
//else if(this.product.unit_id==2){this.quantity_InNosInRupeesInGms='InRupees'}
//else if(this.product.unit_id==3){this.quantity_InNosInRupeesInGms='InGms'}

var selectedUnit:number=1;
var CPorCQ:any='Nos';
this.quantity_InNosInRupeesInGms="InNos";
var price:any;
  console.log('getcartitems search productid:'+this.product.id);
  await  this.cartService.getCartItems().subscribe(items => {
this.quantity=items.filter((acartitems:any)=>acartitems.productId==this.product.id)[0].quantity;
price=items.filter((acartitems:any)=>acartitems.productId==this.product.id)[0].price;
selectedUnit=items.filter((acartitems:any)=>acartitems.productId==this.product.id)[0].selectedUnit;
CPorCQ=items.filter((acartitems:any)=>acartitems.productId==this.product.id)[0].CPorCQ;

console.log('found selectedUnit:'+selectedUnit)
console.log('found CPorCQ:'+CPorCQ)
if(selectedUnit==1){
  if(CPorCQ=='Nos'){this.quantity_InNosInRupeesInGms="InNos";this.product.price=price}
  if(CPorCQ=='customQuantity'){this.quantity_InNosInRupeesInGms="InGms";this.product.customQuantity=this.quantity;}
}else if(selectedUnit==2 || selectedUnit==3){
  this.product.customPrice=price;this.product.customQuantity=this.quantity;
    if(CPorCQ=='customPrice'){this.quantity_InNosInRupeesInGms="InRupees";}
    if(CPorCQ=='customQuantity'){this.quantity_InNosInRupeesInGms="InGms";}
}
  })
}


  open(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  closeModal() {
    this.modalRef?.close();
  }
  roundToNearestMultipleOf5(value: number,multiOf:number): number {
    return Math.ceil(value / multiOf) * multiOf;
  }

  onCustomPriceChange(customPrice: number) {
      // Round the custom price to the closest greater value that is in multiples of Rs 5
      
      //No rounding here, taken direct customPrice
    //this.product.customPrice = this.roundToNearestMultipleOf5(customPrice,5);
    this.product.customPrice ==customPrice;

    // Calculate the custom quantity in grams from the rounded custom price
    const pricePerGram = this.product.price / 1000;
    this.product.customQuantity = (this.product.customPrice / pricePerGram);
    this.product.customQuantity=Math.ceil(this.product.customQuantity)
  }
  
  onCustomQuantityChange(customQuantity: number) {
    // Round the custom quantity to the nearest multiple of 5
    const roundedQuantity = this.roundToNearestMultipleOf5(customQuantity,10);

    // Calculate the price for the rounded custom quantity in grams
    this.product.customQuantity = roundedQuantity;
    this.product.customPrice = (roundedQuantity / 1000) * this.product.price;
    
    /* //again round price to nearest mul of 5
     const roundedPrice= this.roundToNearestMultipleOf5(this.product.customPrice);
      // Calculate the custom quantity in grams from the rounded custom price
    const pricePerGram = this.product.price / 1000;
    this.product.customQuantity = (roundedPrice / pricePerGram); */
  }
 /*  onAddToCart(quantity: number) {
    // Emit the addToCart event with the selected product and quantity

    
    this.notify.showInfo('Product added to cart','Cart')
    console.log('emitting addToCart from onAddToCart..')
    this.addToCart.emit({ product: this.product, quantity });
    this.closeModal();
   
  } */
  // Method to handle unit changes
  onUnitChange(unit: string) {
    this.productForm.patchValue({ selectedUnit: unit });
  }

  onAddToCart(quantity: number) {
var price:number=this.product.price;
var selectedUnit:number=1;
var CPorCQ='Nos';
if(this.product.unit_id==1){//Nos Basic Unit
  selectedUnit=1;
}else   if(this.product.unit_id==2){//KG BASIC UNIT
      if(this.quantity_InNosInRupeesInGms=='InRupees' || this.quantity_InNosInRupeesInGms=='InGms'){
        this.productForm.patchValue({ selectedUnit: 3 });
            quantity=this.product.customQuantity;
            price=this.product.customPrice;
            selectedUnit=this.productForm.get('selectedUnit')?.value;
      }
      //for CPorCQ
      if(this.quantity_InNosInRupeesInGms=='InRupees'){CPorCQ='customPrice';}else  if(this.quantity_InNosInRupeesInGms=='InGms'){CPorCQ='customQuantity'}

    }
   
    console.log('my obj to save with price, quantity and selectedUnit CPorCQ is:'+price, quantity, this.productForm.get('selectedUnit')?.value, CPorCQ);

    if (this.productForm.valid){
    
    // Emit the addToCart event with the selected product, quantity, and unit
    this.notify.showInfo('Product added to cart', 'Cart');
    var conv_factor:number=0;
if(selectedUnit==1){conv_factor=1;}else if(selectedUnit==2){conv_factor=1;}else if(selectedUnit==3){conv_factor=0.001}else if(selectedUnit==4){conv_factor=0.01}
    var pmultq=this.product.price*quantity*conv_factor;
    this.addToCart.emit({ product: this.product,price:this.product.price, quantity,pmultq:pmultq, selectedUnit ,CPorCQ});
    this.closeModal();
    }
  }
  
  increaseQuantity(){  this.quantity+=1;}
  decreaseQuantity(){ if(this.quantity<=1){return;} this.quantity-=1;}


}
