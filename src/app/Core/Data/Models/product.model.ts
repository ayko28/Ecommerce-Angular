import { Deserializable } from './deserializable';

export class Product implements Deserializable{
   id?:number;
   seller_id?:number;
   product_name?:string;
   category_id?:number;
   imageUrl?:string;
   code?:string;
   price?:number;
   discount_text?:string;
   description?:string;
   IsOnlyForAdvertise?:boolean;
   Allowed_customPrice?:boolean;
   Allowed_customQuantity?:boolean;
   createdon?:Date
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
  
}