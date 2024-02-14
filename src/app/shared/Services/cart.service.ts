import { Injectable } from '@angular/core';
import { Product } from 'src/app/Core/Data/Models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'guest_cart'; // unique key for guest cart in local storage

  constructor() {
  
   }

  // Add item to cart
  /**/ addToCart(item: Product): void {
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];
    cartItems.push(item); // add new item to cart
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems)); // store updated cart in local storage
  } 
 
  // Get cart items
  getCartItems(): Product[] {
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];
    return cartItems;
    //    return JSON.parse(localStorage.getItem(this.cartKey)) || []; // get cart items or return empty array
  }

  getCartItemCount(){
    const cartData = localStorage.getItem(this.cartKey);
    const cartItems = cartData ? JSON.parse(cartData) : [];
    return cartItems.length;
  }
}
