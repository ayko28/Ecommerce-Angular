import { Deserializable } from './deserializable';
import { Product } from './product.model';

export class CartItem implements Deserializable{
   id?:number;
   seller_id?:number;
   seller_name?:string;
   cartItemId?:number;
    product_name?:string;
    productId?:number;
  quantity?:number;
  price?:number;
  pmultq?:number;
  CPorCQ?:string;selectedUnit?:any;
  total?:number;
  cartTotal_Asupplier?:number
  subtotal?:number;
  selected?:any;
  CREATEDBY_username?:any
  
 /* constructor(public aprod?: any,  quantity?: number){
  if(aprod){
  this.productId=aprod!.id;
    this.product_name=aprod!.product_name;
    this.quantity=quantity;
    this.price=aprod!.price;
  }
  if(quantity){  this.quantity=quantity; }
    
 } */
  deserialize(input:any)
  {
    //  Object.assign(this,input);
    this.id=input.cartItemId;
    this.productId=input.productId;
    this.quantity=this.quantity;
      return this;
  }
}