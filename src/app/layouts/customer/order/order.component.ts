import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { OrderService } from 'src/app/shared/Services/order.service';
import { ProductService } from 'src/app/shared/Services/product.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  selectedOption: string = 'Paid-Orders';

  Paid_Orders_Of_Sellers!:any[]; 
  sellers: any[] = [];productsByIds:any[]=[];
  users!:any[];
 currentUser:any;
 
 constructor(private servOrder:OrderService,private servProduct:ProductService,private servAuth:AuthenticationService,private servUser:UserService,public servCommon:CommonService){
  this.servAuth.currentUser.subscribe(x => this.currentUser = x);

  console.log('Load orders');
  //this.get_Paid_Orders_Of_Customer();
  this.getOrderItems()
 }
 
 ngAfterViewInit(): void {
    this.get_Users();
}

selectOption(option: string) {
  this.selectedOption = option;
  // Perform any other actions based on the selected option
}
async  getOrderItems(){ 
  await  this.servOrder.getOrderItems().subscribe((orderitems:any)=>{
    this.Paid_Orders_Of_Sellers=orderitems;
   console.log('Paid_Orders_Of_customers:'+JSON.stringify(orderitems));
   this.withpromise_getSellers(orderitems).then(ret_sellers=>{
      
    this.sellers=ret_sellers;

    //getproductList from commaseperated stored in localStorage
    const productIds=localStorage.getItem("productIdList_CommaDelimited")?.toString();
    if(productIds?.length){
    this.servProduct.getProductByIds(productIds).subscribe((res:any)=>{
        this.productsByIds=res;
    });                   }

        
  });


  
  this.sub1().then((res:any)=>{
   // console.log('sub1 executed.....')
   // console.log(res);
    this.Paid_Orders_Of_Sellers=res;
  })

  })

  //setTimeout(() => {
    
   //aaaaaaaaaaaaaaaaaaaaaaaa

  //}, 3000);


 }

 
//const updatedOrders =
 sub1(){

  return new Promise((resolve, reject) => {
    const xyz = this.Paid_Orders_Of_Sellers.map(order => {
  // const product = products.find(p => p.productId === order.productId);
   const seller =this.sellers.find(s => s.seller_id === order.seller_id);
 
   return ( {
     ...order,
   //  product_name: product ? product.product_name : '',
     seller_name: seller ? seller.seller_name : ''
   });
 });//

 resolve(xyz)

});

}

 async withpromise_getSellers(orders: any[]): Promise<any[]> {

  return new Promise((resolve, reject) => {
  const sellers: any[] = [];
  var productIdList_CommaDelimited:string='';
  orders.forEach((aOrder) => {  
    
    //Detect each productId from orderitems and save in comma seperated
    //console.log('abc aOrder');console.log(aOrder.productId);
    productIdList_CommaDelimited+=aOrder.productId+","
    if (!sellers.some((seller) => seller.seller_id === aOrder.seller_id)) {
  
    const sellerName=this.users.find((aUser:any)=>aUser.id==aOrder.seller_id).firm_name;
      sellers.push({ seller_id: aOrder.seller_id , seller_name: sellerName });
    }
  });
  localStorage.setItem('productIdList_CommaDelimited',productIdList_CommaDelimited);
  
  resolve(sellers);
});
}

//usermaster

get_Users(){
  this.servUser.getUsers('').subscribe((res:any)=>{
    //this.user_Sellers=res.filter((obj:any)=>obj.userrole=="Seller");
    this.users=res;
    this.getOrderItems();
  });
  }
  

}
