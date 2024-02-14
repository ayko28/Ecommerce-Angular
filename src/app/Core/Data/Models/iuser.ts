import { Role } from "./role";

export interface IUser {
   id?:number;
   userid?:string;
   display_name?:string;
   password?:string;
  //role?:Role;
  userrole?:Role;
  access_saturated?:string;
  usertheme?:string; 
  IsActive?:boolean;
  FCMtoken?:string;
  CREATEDBY_username?:string;
  firm_name?:string;
  firm_addr?:string;
  supplier_id?:number;
  createdon?:Date;
}
