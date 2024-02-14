import { Role } from './role';
import { Deserializable } from './deserializable';

export class User implements Deserializable {
   id?:number;
   userid?:string;
   display_name?:string;
   password?:string;
  //role?:Role;
  userrole?:Role;
  access_saturated?:string;
  usertheme?:string; 
  IsActive?:boolean;area_code?:string;
  FCMtoken?:string;
  CREATEDBY_username?:string;
  firm_name?:string;
  firm_addr?:string;shop_type?:string;
  supplier_id?:number;
  createdon?:Date;
  deserialize(input:any)
  {
      Object.assign(this,input);
      return this;
  }
}
