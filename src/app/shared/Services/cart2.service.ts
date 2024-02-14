import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/Core/Data/Models/cart-item.model';


@Injectable({
  providedIn: 'root'
})
export class Cart2Service {
  private cartKey = 'guest_cart';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];
   // const cartItems = JSON.parse(localStorage.getItem(this.cartKey)) || [];
    this.cartItemsSubject.next(cartItems);
  }
  getCartItems(): CartItem[] {
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];
    return cartItems;
    //    return JSON.parse(localStorage.getItem(this.cartKey)) || []; // get cart items or return empty array
  }
  addToCart(item: any) {
    const cartItems = this.cartItemsSubject.getValue();//ci.product.id
    const existingCartItem = cartItems.find(ci => ci.id === item.id);

    if (existingCartItem && existingCartItem.quantity) {
        existingCartItem.quantity++;
    } else {
      const newCartItem = new CartItem();
      newCartItem.productId=item.id;newCartItem.product_name=item.product_name;
      newCartItem.quantity=1;newCartItem.price=item.price;
      cartItems.push(newCartItem);
    }

    this.cartItemsSubject.next(cartItems);
    this.saveCart(cartItems);
  }

  removeFromCart(cartItem: CartItem) {
    const cartItems = this.cartItemsSubject.getValue();
    const itemIndex = cartItems.findIndex(ci => ci.id === cartItem.id);

   

    if (itemIndex > -1) {
      cartItems.splice(itemIndex, 1);
      this.cartItemsSubject.next(cartItems);
      this.saveCart(cartItems);
    }
  }
  getCartItemCount(){
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];
    return cartItems.length;
  }
  clearCart() {
    const cartItems :any= [];
    this.cartItemsSubject.next(cartItems);
    this.saveCart(cartItems);
  }

  private saveCart(cartItems: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
}
