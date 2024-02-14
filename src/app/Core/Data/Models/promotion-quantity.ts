import { Deserializable } from "./deserializable";
import { QuantityPromotionsStages } from "./quantity-promotions-stages";

export class PromotionQuantity implements Deserializable{
   id?:number;
   seller_id?:number;
   productId?:number;
   promotionName?:string;
   promotionType?:string;
   startDate?:Date;
   endDate?:Date;
   QuantityPromotionsStages?: QuantityPromotionsStages[];
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}