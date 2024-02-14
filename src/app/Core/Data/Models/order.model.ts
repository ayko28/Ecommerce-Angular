import { OrderItem } from './order-item.model';

export class Order {
   id?: number;  orderdate?:Date;
   userId?: number;
   seller_id?:number;
   order_status?:string;
   orderItems?: OrderItem[];
   items?:any[];
   Total?:any;
}
