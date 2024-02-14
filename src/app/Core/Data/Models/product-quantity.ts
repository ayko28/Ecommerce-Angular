import { Deserializable } from "./deserializable";

export class ProductQuantity  implements Deserializable{
   id?:number;
   productId?:number;
   Quantity_Option?:string;
   Quantity_Option_Value?:number;
   Quantity_Option_Unit?:number;   
   conversion_factor?:number;
   createdon?:Date
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}
