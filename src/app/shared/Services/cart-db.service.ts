import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from 'src/app/Core/Data/Models/cart-item.model';
import { Cart } from 'src/app/Core/Data/Models/cart.model';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { Product } from 'src/app/Core/Data/Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartDBService {
  currentUser:any;
  /*  */apiUrl=environment.apiUrl+'cart';
 // private cartItems: CartItem[] = [];
 private cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

 // private cartUrl = 'api/cart'; // Backend API URL
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient,private servAuth:AuthenticationService) {
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);
    if(this.servAuth.isUserLoggedIn()){    this.loadCart(); }
  }

 /*  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  } */
  getCartItems(): Observable<CartItem[]> {
    this.loadCart().then((res:any)=>{  return this.cartSubject.asObservable();})
       return this.cartSubject.asObservable();
  }
 /*  addToCart(product: any, quantity: number): void {
   // const cartItem: CartItem = new CartItem(item.id, item.name, item.price, quantity);
   const cartItem: CartItem = new CartItem(product, quantity);

    this.http.post(this.cartUrl, cartItem).subscribe(() => {
      const items = this.cartSubject.value;
      items.push(cartItem);
      this.cartSubject.next(items);
    });
  } */
  /* addToCart(item: any, quantity: number): Observable<CartItem[]> {
    const cartItem = new CartItem(item, quantity);
    this.cartItems.push(cartItem);
    this.saveCart();

    return this.getCartItems();
  } */
  public addToCart(userId:any,prod: any,param_price:number, param_quantity: number,param_pmultq:any, selectedUnit:any, CPorCQ:string,CREATEDBY_username:string) {
    console.log('min cartservice for addtocart');console.log('with price:'+param_price)
    let cartItem: CartItem = new CartItem();
    cartItem.productId=prod.id;cartItem.product_name=prod.product_name;
    cartItem.quantity=param_quantity;cartItem.price=param_price;
    cartItem.pmultq=param_pmultq;
    cartItem.selectedUnit=selectedUnit;
    cartItem.CPorCQ=CPorCQ;
    cartItem.seller_id=prod.seller_id;cartItem.seller_name=prod.seller_name;
    cartItem.seller_name=prod.firm_name;
    cartItem.CREATEDBY_username=CREATEDBY_username
    console.log('posting cartitem:');console.log(cartItem);
    
    this.http.post(this.apiUrl,{userId:userId, item:cartItem}).subscribe(() => {
      let items = this.cartItems.getValue();
      if (!this.isItemInCart(items, prod.id)) {
        items.push(cartItem);
        this.cartItems.next(items);
        //added on 22June
        this.loadCart().then((res:any)=>this.getCartItems());//.then((res:any)=>this.getCartItems();)
      }
    });
  }
   removeFromCart(cartItem: CartItem): Observable<CartItem[]> { console.log('cartItem.id:'+JSON.stringify(cartItem))
    const items = this.cartSubject.value;
    const index = items.findIndex(item => item.id === cartItem.id );
    if (index > -1) {
      this.http.delete(`${this.apiUrl}/${cartItem.id}`).subscribe((res:any) => {
        items.splice(index, 1); console.log('res imp:'+res)
        this.cartSubject.next(res);this.loadCart();this.getCartItems();
      });
    }

    return this.getCartItems();
  } 
 /* removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
     this.cartItems = this.cartItems.filter((item:any) => item !== cartItem);
    this.saveCart();

    return this.getCartItems();
  }*/
  private saveCart(): void {
    // save cart items to database
    this.http.post('/api/cart', this.cartItems).subscribe();
  }/* 
  private loadCart(): void {
    this.http.get<CartItem[]>(this.cartUrl).subscribe(items => {
      this.cartSubject.next(items);
    });
  } */
  
   public getCartItemCount() {
   /* */ let items = this.cartItems.getValue(); console.log('items in getCartItemCount:'+items)
    return items.reduce((count, item) => count + 1, 0);//item.quantity 
  
  }
  /* getCartItemCount(): Observable<number> {
    return this.cartItems.pipe(
      map((cart: Cart) => {
        const items = cart?.items;
        if (items) {
          return items.reduce((count, item) => count + item.quantity, 0);
        } else {
          return 0;
        }
      })
    );
  } */
  /* getCartItemCount(): any {
    return this.getCartItemCount();
  } */
  // define a function to map the response to your Cart model object
 mapCartResponseToModel=(response: any[]): Cart =>{
   console.log('response[0].cartId:'+response[0].cartId+' ,response[0].userId:'+response[0].userId)
  const cart = new Cart();
  cart.id = response[0].cartId;
  cart.userId = response[0].userId;
  /**/ cart.cartItems = 
  response.map(item => { console.log('aitem.quantity:'+item.quantity)
  var aprod=new Product();
  aprod.id=item.id
  aprod.product_name=item.product_name
  aprod.price=item.price
    const cartItem = new CartItem();
    cartItem.id = item.cartItemId;
   cartItem.productId = item.productId;
   cartItem.product_name = item.product_name;
    cartItem.quantity = item.quantity;
    cartItem.pmultq = item.pmultq;
   console.log('returning cartItem by mapping:'+JSON.stringify(cartItem))
    return cartItem;  /**/
  }); 
 console.log('full cart:'+JSON.stringify(cart));
  return cart; 
}

ngOnInit(){
  this.getCartItems();
}
  /* private loadCart() { console.log('loadingcart now......................')
    var url=this.apiUrl+'/'+this.currentUser.id;console.log('url in loadcart is :'+url)
   
    this.http.get<any[]>(url).pipe(
     
      map(response => { console.log('response[0].cartId:'+JSON.stringify(response))
        const cart = new Cart();
        cart.id = response[0].cartId;
        cart.userId = response[0].userId;
        cart.cartItems = response.map(item => {
          const cartItem = new CartItem();
          cartItem.id = item.cartItemId;
          cartItem.cartItemId = item.cartItemId;
          cartItem.productId = item.productId;
          cartItem.product_name = item.product_name;
          cartItem.seller_id = item.seller_id;          cartItem.seller_name = item.seller_name;
          cartItem.price = item.price;
          cartItem.quantity = item.quantity;
          return cartItem;
        });
       
        return cart;
      })
    )
    .subscribe(cart => {
      this.cartSubject.next(cart.cartItems);
      console.log('Cart:', cart);
    });
    }
 */

    private loadCart() {/*  */ 
    return new Promise((resolve, reject) => {
    console.log('loadingcart now......................')
    var url=this.apiUrl+'/'+this.currentUser.id;console.log('url in loadcart is :'+url)
   
    this.http.get<any[]>(url).pipe(
     
      map(response => { console.log('response[0].cartId:'+JSON.stringify(response))
        const cart = new Cart();
        cart.id = response[0].cartId;
        cart.userId = response[0].userId;
        cart.cartItems = response.map(item => {
          const cartItem = new CartItem();
          cartItem.id = item.cartItemId;
          cartItem.cartItemId = item.cartItemId;
          cartItem.productId = item.productId;
          cartItem.product_name = item.product_name;
          cartItem.seller_id = item.seller_id;          cartItem.seller_name = item.seller_name;
          cartItem.price = item.price;
          cartItem.quantity = item.quantity;
          cartItem.pmultq = item.pmultq;
          cartItem.CPorCQ = item.CPorCQ;
          cartItem.selectedUnit = item.selectedUnit;
          return cartItem;
        });
       
        return cart;
      })
    )
    .subscribe(cart => {
      this.cartSubject.next(cart.cartItems);
      
    });

    });//end if returning promise
    }


  private isItemInCart(items: CartItem[], id: number) {
    return items.findIndex(item => item.id === id) !== -1;
  }
}