import { Component,ChangeDetectionStrategy } from '@angular/core';
import { CartItem } from 'src/app/Core/Data/Models/cart-item.model';

import { CartDBService } from 'src/app/shared/Services/cart-db.service';
import { Router ,NavigationExtras } from '@angular/router';
import { OrderService } from 'src/app/shared/Services/order.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import{FilterBySellerPipe} from 'src/app/shared/Pipe/filter-by-seller.pipe';
import { PromotionService } from 'src/app/shared/Services/promotion.service';

import {ResolvePromisePipe} from 'src/app/shared/Pipe/resolve-promise.pipe'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { ProductService } from 'src/app/shared/Services/product.service';
@Component({
  selector: 'app-cart-db',
  templateUrl: './cart-db.component.html',
  styleUrls: ['./cart-db.component.scss']
})
export class CartDbComponent {

//rAZORPAY PART
RPOrderid!:any;RPamount!:any;RPcurrency!:any;RPnotes!:any;RPreceipt!:any;
OrderAmount_to_pay!:any;

private apiUrl=environment.apiUrl;
currSeller!:any;
//END rAZORPAY PART

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
   itemsBySupplier: { [key: string]: CartItem[] } = {};
   currentUser:any;
   subtotal:any=0;cartTotal_Asupplier:any=0;
   sellers: any[] = [];

   public myPromiseResult!: any[];

   totalAmounts:any[]=[];
   totalDiscounts: any;
   unit_master!:any[]
  // PromotionFromProduct!:any[];
  products!:any;

  constructor(private http:HttpClient,private cartService: CartDBService,private servOrder:OrderService, private router: Router
    ,private servAuth:AuthenticationService
    ,private servPromoton:PromotionService
    ,private servUnitmgt:UnitmgtService
    ,public servCommon:CommonService,private servProduct:ProductService
    ) {
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);

    console.log('call getCartItems......')
    this.getCartItems();  
 //   const itemsBySupplier: { [key: string]: CartItem[] } = {};

 this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
    
/* 


    const supplierOrders = this.cartItems.reduce<{ [key: string]: CartItem[] }>((acc, item) => {
      if (!acc[item.seller_id]) {
        acc[item.seller_id] = { supplier: item.seller_id, items: [] };
      }
      acc[item.seller_id].items.push({ product: item.productId, quantity: item.quantity });
      return acc;
    }, {}); */

    /* const itemsBySupplier = this.cartItems.reduce((acc, item) => {
      if (!acc[item.seller_id]) {
        acc[item.seller_id] =[];
      }
      acc[item.seller_id].items.push(item);
      return acc;
    }, {}); */


    

   }

   ngAfterViewInit(): void {
     this.getCartItems();   

  }

ngOnInit(){
//  this.getCartItems();
 // this.getCartItems();


}


  PlaceOrder(supplier:any,idx:any,seller_id:any){ //totalAmounts[idx] //totalDiscounts.get(seller_id)
  console.log('placing order of seller:'+supplier);
  const selectedCartItems = this.cartItems.filter(item => item.seller_name === supplier).filter((item:any) => item.selected);
  console.log('aaaaaaaaaaaaaaa:'+this.totalAmounts)
const totalAmount=this.totalAmounts;
const discount=this.totalDiscounts.get(seller_id);
   // const selectedCartItems = supplier.value.filter((item:any) => item.selected);
console.log('selectedCartItems:'+JSON.stringify(selectedCartItems.length));
console.log('trying to store selectedCartItems[0] to localstoarge:'+JSON.stringify(selectedCartItems))
localStorage.setItem('cartitemsToPlaceOrder',JSON.stringify(selectedCartItems))
    if (selectedCartItems.length > 0) {   console.log('navigating to checkout...') 
  /*   const navigationExtras: NavigationExtras = {
      state: {
        cartitemsToPlaceOrder: selectedCartItems
      }
    };
*/
   // const queryParams = { cartitemsToPlaceOrder: JSON.stringify(selectedCartItems) };
   const queryParams = { key: selectedCartItems,key1:totalAmount, key2:discount };
   const navigationExtras: NavigationExtras = {
      queryParams: queryParams
   }; 
   console.log('sendingJSON.stringify(selectedCartItems):'+JSON.stringify(selectedCartItems))
   console.log('sending selectedCartItems:'+selectedCartItems)
   console.log('navigationExtras:'+JSON.stringify(navigationExtras))
      this.router.navigate(['checkout'], { queryParams: { cartitemsToPlaceOrder: JSON.stringify(selectedCartItems),totalAmount:totalAmount,discount:discount } });
   // this.router.navigate(['checkout'], { queryParams: { cartitemsToPlaceOrder: selectedCartItems } });
    }

  }

 /*  createOrder_Preserved(){

   var idx=-1;
    for (const supplier of Object.values(this.itemsBySupplier)) {
      idx++;
      const selectedCartItems = supplier.filter(item => item.selected);

      if (selectedCartItems.length > 0) {
        var userId=this.currentUser.id;
        this.servOrder.PlaceOrder(userId,selectedCartItems,);
        this.router.navigateByUrl('order')
      }
  }

} */
 async getCartItems() {
  await  this.cartService.getCartItems().subscribe(items => {
     
      this.cartItems = items; 
    //this.sellers = this.getSellers(this.cartItems);
     this.withpromise_getSellers(items).then(ret_sellers=>{
      
      this.sellers=ret_sellers;
    
      //call here

//--

this.getTotalAmounts(items,ret_sellers);
  

// Call the calculateTotalDiscounts function

  this.calculateTotalDiscounts(items, ret_sellers)
.then((totalDiscounts) => {

this.totalDiscounts=totalDiscounts;
})
.catch((error) => {
console.error(error);
});

//--
    //----------------------------

     });//both cartitems and sellers are available here
     //this.cartTotal = this.cartItems.reduce((total, item) => total + (item.quantity?item.quantity:0), 0);
     

this.subtotal=0;this.cartTotal_Asupplier=0;
    this.cartItems.forEach(item => {
    
      const supplier = item.seller_id;
      if (!this.itemsBySupplier[supplier?supplier:0]) {
        this.itemsBySupplier[supplier?supplier:0] = [];
      }
      item.total=(item.price==undefined?0:item.price)*(item.quantity==undefined?0:item.quantity);
      this.cartTotal_Asupplier=this.cartTotal_Asupplier!+item.total;
      this.subtotal=this.subtotal+(item.price==undefined?0:item.price)*(item.quantity==undefined?0:item.quantity);
     this.itemsBySupplier[supplier?supplier:0].push(item);

     //start
   //  this.itemsBySupplier.reduce((count, aitm) => count + 1, 0);
     //end

    });
 
//for added specially to get productsIds concatenated
    
const productIds = this.cartItems.map((aitem:any) => aitem.productId).join(',');
//alert('cartItems:'+this.cartItems)
this.servProduct.getProductByIds(productIds).subscribe((res:any)=>{
  this.products=res; console.log('products by ids:'+(productIds))
}); 
//end for added sp
  
    
    });


    

  }
 
   removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item).subscribe((res:any) => {
      
      this.getCartItems();
    });
  } 
  /* removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
    this.cartItems = this.cartItems.filter(item => item !== cartItem);
   // this.saveCart();

    return this.getCartItems();
  } */
 /* removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem).subscribe(items => this.cartItems = items);
  }*/
  checkout(): void {
    this.router.navigate(['/checkout']);
  }

 /*  getSellers(cartItems: any[]): string[] {
    const sellers: string[] = [];
    cartItems.forEach((item) => {
      if (!sellers.includes(item.seller_name)) {
        sellers.push(item.seller_name);
      }
    });
    return sellers;
  }*/  
 getSellers_preserved(cartItems: any[]): any[] {
    const sellers: any[] = [];
    cartItems.forEach((item) => {
     //     if (!sellers.includes(item.seller_name)) {
        if (!sellers.some(aseller=>aseller.seller_name === item.seller_name)) {
        sellers.push({seller_id:item.seller_id,seller_name:item.seller_name});
      }
    });
    
    return sellers;
  }
  getSellers(cartItems: any[]): any[] {
    const sellers: any[] = [];
    cartItems.forEach((item) => {
      if (!sellers.some((seller) => seller.seller_name === item.seller_name)) {
        sellers.push({ seller_id: item.seller_id, seller_name: item.seller_name });
      }
    });
    
    return sellers;
  }
 async withpromise_getSellers(cartItems: any[]): Promise<any[]> {

    return new Promise((resolve, reject) => {
    const sellers: any[] = [];
    cartItems.forEach((item) => {
      if (!sellers.some((seller) => seller.seller_name === item.seller_name)) {
        sellers.push({ seller_id: item.seller_id, seller_name: item.seller_name });
      }
    });
    
    resolve(sellers);
  });
  }
  getTotalAmount(cartItems: any[], sellerObj:any,idx:number): number {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      if (item.seller_name === sellerObj.seller_name) {
        totalAmount += item.price * item.quantity *  this.servCommon.GetDisplayNameByKey(this.unit_master,'id',item.selectedUnit,'conversion_factor');
     //   totalAmount=Math.ceil(totalAmount)
      }
    });

   // this.withpromise_getTotalDiscount(cartItems,sellerObj).then(result=>{console.log('result:'+result+'idx:'+idx);this.myPromiseResult[idx]=result});
    
    return totalAmount;
  }
  getTotalAmounts(cartItems: any[], sellers: any[]): void {
    
    const filterBySellerPipe = new FilterBySellerPipe(); //used this below in sellers.map    //const filteredItems = filterBySellerPipe.transform(cartItems, sellerName);

    this.totalAmounts = sellers.map((seller) =>  this.getTotalAmount(filterBySellerPipe.transform(cartItems, seller.seller_name), seller,0));
    
    //withpromise_getTotalDiscount
    //this.totalAmounts = sellers.map((seller) =>  this.getTotalDiscount( filterBySellerPipe.transform(cartItems, seller.seller_name), seller));


    //console.log('totalAmounts:'+this.totalAmounts);

  



  }
  calculateSelectedTotal(sellerName: string): number {
    let total = 0;
    const selectedCartItems = this.cartItems
      .filter((item:any) => item.seller_name === sellerName && item.selected);
  
    selectedCartItems.forEach((item:any) => {
      total += item.price * item.quantity*this.servCommon.GetDisplayNameByKey(this.unit_master,'id',item.selectedUnit,'conversion_factor')
    });
  
    return total;
  }
  
  withpromise_getTotalAmount(cartItems: any[], sellerObj:any,idx:number): Promise<number> {

    return new Promise((resolve, reject) => {
      // Calculate the total amount logic here
      // ...
      
    let totalAmount = 0;
    cartItems.forEach((item) => {
      if (item.seller_name === sellerObj.seller_name) {
        totalAmount += item.price * item.quantity;
      }
    });
  
    // this.withpromise_getTotalDiscount(cartItems,sellerObj).then(result=>{console.log('result:'+result+'idx:'+idx);this.myPromiseResult[idx]=result});

      // Resolve the promise with the total amount
      resolve(totalAmount);
    });

    

   // this.withpromise_getTotalDiscount(cartItems,sellerObj).then(result=>{console.log('result:'+result+'idx:'+idx);this.myPromiseResult[idx]=result});

   // return totalAmount;
  }
/*   getTotalDiscount(items: any[], sellerObj: any): number{//
   // return 10;
   console.log('items:'+JSON.stringify(items))
    this.servPromoton.get_Promotion_Product_Seller(sellerObj.seller_id)
.subscribe((res:any[])=>{
      console.log('promos:'+JSON.stringify(res))
      for (const promotion of res) {
        //BuyXGetY

        if (promotion.promotionType === 'BuyXGetY') { console.log('found BuyXGetY promo')
          const buyX = promotion.buyX;
          const getY = promotion.getY;
          const eligibleItems = items.filter((item) => item.productId === promotion.productId);
          console.log('eligibleItems.length:'+eligibleItems.length)
         console.log('aaa:'+JSON.stringify(items.filter((item) => item.productId === promotion.productId)))
         if (eligibleItems.length >= buyX) {
          const sortedItems = eligibleItems.sort((a, b) => b.price - a.price);
          const groups = [];
          let index = 0;
          while (index < sortedItems.length) {
            groups.push(sortedItems.slice(index, index + buyX));
            index += buyX;
          }
          for (const group of groups) {
            if (group.length === buyX) {
              const discount = group[0].price * getY;
              console.log('discount:'+discount)
              return discount;
            }
          }
        }

         }//eligible items

        
      } return 0;
    })
    
    return 0;
  } */

  getTotalDiscount(items: any[], sellerObj: any):Promise<number> {  

    return new Promise((resolve,reject)=>{
      var totalDiscount=0;
        this.servPromoton.get_Promotion_Product_Seller(sellerObj.seller_id)
    .subscribe((res:any[])=>{
          
         // var totalDiscount=0;
         const currentDate = new Date(); // Current date
         
//const startDate = new Date(promotion.startDate);
//const endDate = new Date(promotion.endDate);

         console.log('currentDate:'+currentDate)

          for (const promotion of res) {
            //BuyXGetY
    
            if (promotion.promotionType === 'BuyXGetY') { 
              const buyX = promotion.buyX;
              const getY = promotion.getY;
              const eligibleItems = items.filter((item) => item.productId === promotion.productId);
             
             if (eligibleItems.length >= buyX) {
              const sortedItems = eligibleItems.sort((a, b) => b.price - a.price);
              const groups = [];
              let index = 0;
              while (index < sortedItems.length) {
                groups.push(sortedItems.slice(index, index + buyX));
                index += buyX;
              }
              for (const group of groups) {
                if (group.length === buyX) {
                  const discount = group[0].price * getY;
                  
                  totalDiscount+=discount
                }
              }
            }
    
             }//eligible items for ByeXGetY
             else if(promotion.promotionType==='Discount On Product'){
              // Handle DiscountOnProduct promotion type
              const productId = promotion.productId;
            //  const product = items.find((item) => item.productId === productId);
              const product = items.find((item) => { return (
              item.productId === productId 
              && currentDate >= new Date(promotion.startDate) 
              && currentDate <= new Date(promotion.endDate)
            );}); 
              if (product) {
                // Apply the discount based on the promotion's discountPercentage or discountAmount
                const discountPercentage = promotion.discountPercentage;
                const discountAmount = promotion.discountAmount;
                console.log('discountPercentage:'+discountPercentage)
                if (discountPercentage) { console.log('discountPercentage part')
                  const discount = product.price * product.quantity * (discountPercentage / 100);
                  totalDiscount += discount;
                } else if (discountAmount) {
                  totalDiscount += discountAmount;
                }
              }
            }
          
             
    
            
          }//end for loop
          console.log('totalDiscount:'+totalDiscount)
           resolve(Math.ceil(totalDiscount));
        })
        

        this.servPromoton.get_Promotion_Order_Seller(sellerObj.seller_id)
    .subscribe((res:any[])=>{
      var orderAmount = 0;
        for (const item of items) {
          orderAmount += item.price * item.quantity;
        }
      for (const promotion of res) {
        if (promotion.promotionType ==='OrderAmountDiscount'){
          console.log('OrderAmountDiscount found promotion')
          console.log('promotion.minOrderAmount:'+promotion.minOrderAmount)
          console.log('orderAmount:'+orderAmount)
            // Handle DiscountOnOrderAmount promotion type
            const orderAmountThreshold = promotion.minOrderAmount;
            const discountPercentage = promotion.discountPercentage;
            if (orderAmount >= orderAmountThreshold) {
              const discount = orderAmount * (discountPercentage / 100);
              totalDiscount += discount;
            }
          }
      }
    })
    
    
      });
    }//preserved----------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------
    
// Define the getTotalDiscount function as an async function
async  getTotalDiscount0(items: any[], seller: any): Promise<number> {
  
  // Call the filterBySellerPipe.transform method
  const filterBySellerPipe = new FilterBySellerPipe(); 
  const filteredItems = filterBySellerPipe.transform(items, seller.seller_name);

  // Perform the async logic to calculate the total discount
  // ...

  // Simulate an async operation with setTimeout
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return the total discount
  return 10; // Replace with your actual calculation logic
}
async  getTotalDiscount_dummy(cartItems: any[], seller: any): Promise<number> {
  
  // Perform the necessary logic to calculate the total discount
  // ...
  // Simulate an async operation with setTimeout
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const totalDiscount = 10; // Replace with your actual calculation

  return totalDiscount;
}

// Calculate the total discounts using async/await and Promise.all
async   calculateTotalDiscounts_preserved(cartItems: any[], sellers: any[]): Promise<number[]> {
  
  const totalDiscounts: number[] = [];
  const filterBySellerPipe = new FilterBySellerPipe(); 
  // Use Promise.all to await all the getTotalDiscount promises
  await Promise.all(
    sellers.map(async (seller) => {
      //const totalDiscount = await 
     
      this.getTotalDiscount(filterBySellerPipe.transform(cartItems, seller.seller_name), seller)
      .then(totalDiscount=>{
      console.log('pushing totalDiscount:'+totalDiscount+' for seller:'+seller.seller_name+' seller index:'+seller.seller_id)
      totalDiscounts.push(totalDiscount);});
    })
  );

  
  return totalDiscounts;
}

async calculateTotalDiscounts(cartItems: any[], sellers: any[]): Promise<Map<number, number>> {
  const totalDiscounts = new Map<number, number>();
  const filterBySellerPipe = new FilterBySellerPipe();

  await Promise.all(
    sellers.map(async (seller) => {
      const filteredCartItems = filterBySellerPipe.transform(cartItems, seller.seller_name);
      const totalDiscount = await this.getTotalDiscount(filteredCartItems, seller);
      totalDiscounts.set(seller.seller_id, totalDiscount);
    })
  );

  return totalDiscounts;
}



    //-------------------------------------------------------------------
 
withpromise_getTotalDiscount(items: any[], sellerObj: any):Promise<any> {  

return new Promise((resolve,reject)=>{
   
    this.servPromoton.get_Promotion_Product_Seller(sellerObj.seller_id)
.subscribe((res:any[])=>{
      console.log('promos:'+JSON.stringify(res))
      var totalDiscount=0;
      for (const promotion of res) {
        //BuyXGetY

        if (promotion.promotionType === 'BuyXGetY') { console.log('found BuyXGetY promo')
          const buyX = promotion.buyX;
          const getY = promotion.getY;
          const eligibleItems = items.filter((item) => item.productId === promotion.productId);
          console.log('eligibleItems.length:'+eligibleItems.length)
         console.log('aaa:'+JSON.stringify(items.filter((item) => item.productId === promotion.productId)))
         if (eligibleItems.length >= buyX) {
          const sortedItems = eligibleItems.sort((a, b) => b.price - a.price);
          const groups = [];
          let index = 0;
          while (index < sortedItems.length) {
            groups.push(sortedItems.slice(index, index + buyX));
            index += buyX;
          }
          for (const group of groups) {
            if (group.length === buyX) {
              const discount = group[0].price * getY;
              console.log('discount:'+discount)
              totalDiscount+=discount
            }
          }
        }

         }//eligible items

        
      }//end for loop
      console.log('totalDiscount:'+totalDiscount)
       resolve(totalDiscount);
    })
    


  });
}

getProduct_Unit( productId: number): string {

  
  // Retrieve the product name based on the product ID from the products array
  const product =this.products.find((p:any) => p.id === productId);
  return product?.unit_id || '';
} 

}
