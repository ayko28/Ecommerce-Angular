import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/Core/Data/Models/order.model';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { OrderService } from 'src/app/shared/Services/order.service';
import { ProductService } from 'src/app/shared/Services/product.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { UserService } from 'src/app/shared/Services/user.service';
import { OrderDetailsModalComponent } from '../order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-orders-generic',
  templateUrl: './orders-generic.component.html',
  styleUrls: ['./orders-generic.component.scss']
})
export class OrdersGenericComponent {
  products:any[]=[];customers:any[]=[];
  
  @Input() selectedOrderStatus!: string ;
  aOrder!:any;
  orders: any[] = [];
 page:number=1;
 loading = false;
 currentUser!:any;
 unit_master!:any;
  constructor(private datePipe: DatePipe,private route: ActivatedRoute,private servOrder:OrderService
   , private servProduct:ProductService,private servAuth:AuthenticationService,private servUser:UserService
   ,private servUnitmgt:UnitmgtService,public servCommon:CommonService
   ,private notify:NotificationService,private modalService:NgbModal
   //,
   ){
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);
    this.selectedOrderStatus = this.route.snapshot.data['selectedOrderStatus'];  
    
    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
  }


  async ngOnInit() {
   await  this.loadOrdersByStatus();
   //this.ExtractProductIdsCustomerIdsForProductCustomerList();
//   this.loadPage(this.page); // Load initial page
  this.addScrollListener(); // Set up scroll event listener
}

addScrollListener() {
  window.addEventListener('scroll', this.handleScroll.bind(this));
}

handleScroll() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.offsetHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (scrollTop + windowHeight >= documentHeight ) { //&& !this.loading
    this.page++;
    this.loadPage(this.page);
  }
 else if(scrollTop===0 && this.page>1)
 {
  this.page--;  this.loadPage(this.page);this.loading=true;
 }
}

async loadPage(page: number) {
  this.loading = true;
  var newOrders:any = await this.loadOrdersByStatus_Pagewise(page);
  this.orders = [...this.orders, ...newOrders];
//this.orders = newOrders;
  /* .subscribe(
    (response) => {
      this.data = response.orders;
      this.loading = false;
    },
    (error) => {
      console.error(error);
      this.loading = false;
    }
  ); */
}

  getCustomerName(orderId: number): string {
    // Retrieve the customer name based on the order ID from the customers array
    const order =this.orders.find(o => o.orderId === orderId);
    const userId = order?.userId;
    const customer =this.customers.find(c => c.id === userId);
    return customer?.display_name || '';
  }
  
  getOrderDate(orderId: number): string {
    // Retrieve the order date based on the order ID from the orders array
    const order =this.orders.find(o => o.orderId === orderId);
    var dateFormatted=this.datePipe.transform( new Date(order?.orderdate), 'dd-MMM-yyyy');
    return dateFormatted || '';
  }
  
 getOrderStatus(orderId: number): string {
  // Retrieve the order date based on the order ID from the orders array
  const order =this.orders.find(o => o.orderId === orderId);
  return order?.order_status || '';
}

async changeOrderStatus(param_orderId:number,toStatus:string){
  this.servOrder.serOrderStatus(param_orderId,toStatus);
  this.notify.showInfo('Order status changed to '+toStatus,"Order Status");
  
   
  
}
  getProductName( productId: number): string {
   // Retrieve the product name based on the product ID from the products array
   const product =this.products.find(p => p.id === productId);
   return product?.product_name || '';
 } 


 getProduct_Unit( productId: number): string {
  // Retrieve the product name based on the product ID from the products array
  
  const product =this.products.find(p => p.id === productId);
  return product?.unit_id || '';
} 



 loadOrdersByStatus(){
  return new Promise((resolve, reject) => {
   
    this.servOrder.getOrdersByStatus(this.currentUser.id,this.selectedOrderStatus)
    
    .subscribe(  (orders:any) => { 
      console.log(' orders:'+JSON.stringify(orders))
        this.orders = orders;
        this.ExtractProductIdsCustomerIdsForProductCustomerList();
        resolve(true);
       
  });
});

 } 

 loadOrdersByStatus_Pagewise(page:number){
  return new Promise((resolve, reject) => {
    
    this.servOrder.getOrdersByStatus_Pagewise(2,this.selectedOrderStatus,page,2)
    .subscribe(  (orders:any) => { 
      console.log(' orders:'+JSON.stringify(orders))
       // this.orders = orders;

        this.loading=false;
        this.ExtractProductIdsCustomerIdsForProductCustomerList();
        resolve(orders);
       
  });
});

 }
 ExtractProductIdsCustomerIdsForProductCustomerList(){
      var productIdList_CommaDelimited:string='';
      var customerIdList_CommaDelimited:string='';
    this.orders.forEach((aOrderItem) => {
      productIdList_CommaDelimited+=aOrderItem.productId+",";
      customerIdList_CommaDelimited+=aOrderItem.userId+",";
    })
    console.log('productIdList_CommaDelimited:'+productIdList_CommaDelimited)


    localStorage.setItem('productIdList_CommaDelimited',productIdList_CommaDelimited);
    localStorage.setItem('customerIdList_CommaDelimited',customerIdList_CommaDelimited);
    //end

    ////getproductList from commaseperated stored in localStorage
    const productIds=localStorage.getItem("productIdList_CommaDelimited")?.toString();
    if(productIds?.length){
    this.servProduct.getProductByIds(productIds).subscribe((res:any)=>{
      this.products=res; console.log('products by ids:'+(productIds))
    });     }


    ////getCustomerList from commaseperated stored in localStorage
    const userIds=localStorage.getItem("customerIdList_CommaDelimited")?.toString();
    console.log('userIds:'+userIds)
    this.servUser.getUsers(userIds).subscribe((res:any)=>{
      this.customers=res; console.log('Customers by ids:'+JSON.stringify(userIds))
    });


 }

 
openOrderDetailsModal(order: any) {
  const modalRef = this.modalService.open('myorderDetailsModal', { size: 'lg' }); // 'orderDetailsModal' should match your modal's HTML ID
  modalRef.componentInstance.myorder = order; // Pass the selected order to the modal
}


open(content:any,order: any) {
  const modalRef =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  //.result.then((result) => {
    //  this.closeResult = `Closed with: ${result}`;
  //}, (reason) => {
   // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //});
  modalRef.componentInstance.aOrder = order; 
  alert(order.key)
}
/* 
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
} */

  }
