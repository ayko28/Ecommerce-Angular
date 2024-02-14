import { Deserializable } from "./deserializable";

export class ParameterSetting  implements Deserializable{
   id?:number;
   seller_warning_frequency_in_days?:number;
   RP_key?:string;
   createdon?:Date
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}

