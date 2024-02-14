import { Deserializable } from "./deserializable";

export class Error implements Deserializable {
   Error_Type?:string;
   Error_Object?:string;
   Error_Description?:string;
   createdon?:Date;

  
 deserialize(input:any)
 {
     Object.assign(this,input);
     return this;
 }
}
