import { Deserializable } from './deserializable';

export class Category implements Deserializable {  
   id?:number;
   Category?:string;
   createdon?:Date;
 
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}