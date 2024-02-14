import { Deserializable } from "./deserializable";

export class SellerCommissionSetting  implements Deserializable{
   id?:number;
   seller_id?:number;
   commission_percent?:number;
   credit_limit?:number;
   consumed_credit?:number;
   RP_key?:string;
   createdon?:Date
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}
