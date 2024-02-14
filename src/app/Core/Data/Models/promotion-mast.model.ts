import { Deserializable } from './deserializable';

export class PromotionMast implements Deserializable{
   id?:number;
   promotionType?:string;
   
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}
