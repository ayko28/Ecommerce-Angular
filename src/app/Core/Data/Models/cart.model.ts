import { CartItem } from './cart-item.model';
import { Deserializable } from './deserializable';

export class Cart {//implements Deserializable {} 
   id!: number;
   userId!: number;
   cartItems!: CartItem[];
 
  /* constructor(id: number, userId: number//, items: CartItem[]
    ) {
     this.id = id;
     this.userId = userId;
     /* var me=this;
      items.forEach(function(value,key){
      console.log(`Map key is:${key} and value is:${JSON.stringify(value)}`);
      me.cartItems.push(new CartItem());
  });; 
   }
   */
 /* deserialize(input:any)
  {
       Object.assign(this,input);
      this.items = input.items.map((cartitem:any) => new CartItem(input,cartitem.quantity).deserialize(cartitem));
      
    console.log('deserilizing')
    this.id = input.cartId;
    this.userId = input.userId;
    this.cartItems = input.map((item: any) => new CartItem(input,item.quantity).deserialize(item));
 return this;
  }*/
 }
 