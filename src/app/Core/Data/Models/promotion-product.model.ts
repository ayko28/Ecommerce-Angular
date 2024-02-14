import { Deserializable } from './deserializable';

export class PromotionProduct implements Deserializable{
   id?:number;
   seller_id?:number;
   productId?:number;
   promotionId?:number;
   promotionName?:string;
   promotionType?:string;
   buyX?:number;
   getY?:number;
   discountAmount?:number
   discountPercentage?:number;
   startDate?:Date;
   endDate?:Date;
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}
