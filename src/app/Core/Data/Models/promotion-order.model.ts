import { Deserializable } from './deserializable';

export class PromotionOrder implements Deserializable{
   id?:number;
   seller_id?:number;
   promotionId?:number;
   promotionName?:string;
   promotionType?:string;
   discountAmount?:number;
   discountPercentage?:number;
   minOrderAmount?:number;
   startDate?:Date|string;
   endDate?:Date|string;
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}