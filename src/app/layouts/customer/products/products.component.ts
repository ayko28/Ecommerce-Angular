import { Component ,HostListener, ViewChild} from '@angular/core';
import { Product } from 'src/app/Core/Data/Models/product.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CartDBService } from 'src/app/shared/Services/cart-db.service';
import { ProductService } from 'src/app/shared/Services/product.service';
import { SharedDataService } from 'src/app/shared/Services/shared-data.service';
import { NgbModal, NgbModalRef, NgbModalOptions, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { ProductdetailComponent } from '../productdetail/productdetail.component';
import { TestModalComponent } from '../test-modal/test-modal.component';
import { Test2ModalComponent } from 'src/app/test2-modal/test2-modal.component';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  currentUser:any;scrollPos:any;
  selectedProduct: any;
  unit_master:any[]=[];
  Categories:any=[];
  @ViewChild('productModal') productModal: NgbModalRef | undefined;

  constructor(private modalService: NgbModal, private servAuth:AuthenticationService,private router:Router,private servProduct:ProductService
    ,private cartService: CartDBService
    ,private sharedDataService: SharedDataService
    ,private servUnitmgt:UnitmgtService,public servCommon:CommonService
    ,private servCategory:CategoryService
   ){
    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
    }
  products: any[] = [];selectedSellers: any[]=[];selectedCatogories:any[]=[];
  page: number = 1;
  limit: number =5;
  loading: boolean = false;
  endOfResults: boolean = false;

  cartItemCount = 0;cartItems!:any[];

  //search
  searchNM:string='';
  passing_sellerIds:string='';
  ngViewInit(){this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; this.loadProducts();}
  ngOnInit(){console.log(' m here ...')
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);
    this.cartItemCount = this.cartService.getCartItemCount();
    //this.loadProducts();

   //
      //
this.sharedDataService.selectedCategories$.subscribe(selectedCategories => {
  this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; 
  if(selectedCategories.length==0){this.selectedCatogories=[]}else{this.selectedCatogories = selectedCategories;}
 
  if(selectedCategories && selectedCategories.length!==0){// this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; 
    this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; 
     this.loadProducts()}
});
//
   //
    //start
    /* */this.sharedDataService.selectedSellers$.subscribe(selectedSellers => {
this.selectedCatogories=[];
   this.selectedSellers=selectedSellers;
   //alert('m products subscribing selectedsellers:'+JSON.stringify(this.selectedSellers))
      //--added on 19Aug23 for ddl of filter need to take in products itself
      this.Categories=[];
      const concatenatedIds = this.selectedSellers.map((aseller:any) => aseller.id).join(',');
//preserve sellerds 
this.passing_sellerIds=concatenatedIds;

     this.servCategory.getCategorysBySellerIds(concatenatedIds).subscribe((res:any)=>{
      this.Categories=res;//this.selectedCatogories=res;
      //alert('filled for sellers count'+this.selectedSellers.length+' and sellerids are'+concatenatedIds+' now category count:'+this.Categories.length)
    //  console.log('All categories:'+JSON.stringify(this.Categories))
}) 
     //--end of added on 19Aug23

      this.selectedSellers = selectedSellers;

      if(this.selectedSellers!=undefined && this.selectedSellers.length>0 )
      {
        this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; console.log('make pageno zero limit zero') 
      this.loadProducts();
      }

//else{this.page=1;this.limit=5;}
console.log('while subscribe this.selectedSellers:'+(this.selectedSellers && this.selectedSellers.length==0))
if(this.selectedSellers && this.selectedSellers.length==0){
  console.log('found no sellers s omake page 1 and limit 5');
  this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0;
}
this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; 
//alert('can i loadproducts here? with selectedsellers :'+JSON.stringify(this.selectedSellers))
     //this.loadProducts();
    }); 
    //end

      }
//Added 19Aug23 for filter ddl moved from navbar to this products page
shareIndividualCheckedList(aobj:any){ // console.log('aobj:'+JSON.stringify(aobj));
 
if (aobj.checked && this.isSelected(aobj)==false) 
{ this.selectedCatogories.push(aobj); }

else if (aobj.checked && this.isSelected(aobj)) {
   // console.log('found selected:');console.log(aobj.id)
   //  this.selectedCatogories = this.selectedCatogories.filter((s:any) => s.id !== aobj.id); 
     //console.log('wiped out id:'+aobj.id); 
   // console.log('sellers acc:'+this.selectedCategories)
  //} else {

    
    /*   if(aobj.checked){  alert('pushing');   this.selectedCatogories.push(aobj);   } else 
      {console.log('not pushing:');console.log(aobj.id);this.selectedCatogories.push(null)}
       console.log('pushed id:'+aobj.id +' but ischecked:'+aobj.checked); */
      
   

  }
  else if (!aobj.checked && this.isSelected(aobj)) {
//alert('not checked');alert('lenght before:'+this.selectedCatogories.length)
  this.selectedCatogories = this.selectedCatogories.filter((s:any) => s.id !== aobj.id);
  //alert('lenght after:'+this.selectedCatogories.length)
  }
//console.log('m in navbar setting selectedCategories:'+JSON.stringify(this.selectedCatogories))

  this.sharedDataService.setselectedCategories(this.selectedCatogories);

  this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; this.loadProducts();
}
shareCheckedList(sellers:any[]){
  
//this.selectedCatogories=sellers;this.sharedDataService.setselectedCategories(this.selectedCatogories)
 // this.selectedSellers.push(aseller.id)
} 
isSelected(seller: any):boolean {
  //alert('aaa:'+this.selectedCatogories)
  if(this.selectedCatogories==null ){return false;}
  else{
  return this.selectedCatogories.findIndex((s:any) => s.id === seller.id) > -1;
  }
}
searchByName(){
  
  if(this.searchNM.toString().length==0){ this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; this.loadProducts()}
  else if(this.searchNM.toString().length>=3){
    
    var selectedSellerIds='';var first_Sellerid=this.selectedSellers[0].id;
    if(this.selectedSellers.length>=2){ first_Sellerid=0;    selectedSellerIds = this.selectedSellers.map((seller:any) => seller.id).join(',');  }

    this.servProduct.getProductByPartialName(first_Sellerid,this.searchNM,false,selectedSellerIds).subscribe((resSearchByName:any)=>{
        //console.log('ps ny nm:'+JSON.stringify(resSearchByName));
        this.products=resSearchByName;
    })
  }
}
//end of
     /*  addToCart(product: Product) {
        this.cartService.addToCart(product);
        this.cartItemCount = this.cartService.getCartItemCount();
      } */
     /* addToCart(item: Product, quantity: number): void {
        let cartItem: CartItem = new CartItem(item, quantity);
        let existingItemIndex = this.cartItems.findIndex((i: CartItem) => i.id === item.id);
        if (existingItemIndex !== -1) {
          this.cartItems[existingItemIndex].quantity += quantity;
        } else {
          this.cartItems.push(cartItem);console.log('pushing item in cartItems')
        }
        //this.saveCart();
        
      } */ 
     /*  addToCart(product: Product) {
        let cartItem: CartItem = new CartItem(product, 1);
        this.cartService.addToCart(cartItem);
        this.cartItemCount = this.cartService.getCartItemCount();
      }  */
       /* addToCart(product: Product): void {
        this.cartService.addToCart(this.currentUser.id,product, 1);
      } */
     
    /*   addToCart(event: any) {
        // Add to cart logic
        console.log('Add to cart:', event.product, 'Quantity:', event.quantity);
      } */
      addToCart(objProductQuantity:any): void {
        this.cartService.addToCart(this.currentUser.id,objProductQuantity.product, objProductQuantity.price, objProductQuantity.quantity,objProductQuantity.pmultq, objProductQuantity.selectedUnit, objProductQuantity.CPorCQ,"samplename");
      } 
      openProductModal(product: any) {
        // Declare an instance of NgbModalOptions
const modalOptions: NgbModalOptions = {
  backdrop: 'static', // Specify whether clicking outside the modal should close it
  keyboard: false, // Specify whether pressing the Esc key should close the modal
  centered: true, // Specify whether the modal should be vertically centered
  // Add more options as needed
};

        this.selectedProduct = product;
        //const modalRef = this.modalService.open(TestModalComponent, modalOptions);
        this.productModal = this.modalService.open(ProductdetailComponent, { ariaLabelledBy: 'modal-basic-title' });

        this.productModal.componentInstance.product = product;
       /**/  this.productModal.componentInstance.addToCart.subscribe((event: any) => {
        console.log('rreceived emitted something from modal:'+JSON.stringify(event.product))
          this.addToCart(event);  
        }); 
      }
    
      
      viewCart() {
        this.router.navigateByUrl('/cartDB')
      }
    /*   @HostListener('window:scroll', ['$event'])
      onScroll(event:any) {
        console.log('scrolling...')
        const pos = (document.documentElement!.scrollTop || document.body.scrollTop) + document.documentElement!.offsetHeight;
        const max = document.documentElement!.scrollHeight;

        // check whether all products have been loaded
  if (this.endOfResults) {
    return;
  }
        console.log('pos:'+pos)
        if (pos >= max - 100 && !this.loading && !this.endOfResults ) {
          //added
          if (window.pageYOffset === 0) { // add this condition
            return;
        }
          //end added
          this.loadProducts();
        }
      }*/
   

  //New
  /* // add a variable to keep track of scroll direction
  scrollDirection: 'down' | 'up' = 'down';
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    const pos = (document.documentElement!.scrollTop || document.body.scrollTop) + document.documentElement!.offsetHeight;
    const max = document.documentElement!.scrollHeight;

    // determine scroll direction based on current position vs previous position
    const prevPos = this.scrollPos || 0;
    this.scrollPos = pos;
    if (pos > prevPos) {
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }

    // call loadProducts() only when scrolling downwards
    if (this.scrollDirection === 'down' && pos >= max - 100 && !this.loading && !this.endOfResults ) {
      this.loadProducts();
    }
  } */


 /*  //New 2
  private previousScrollPosition = 0;

@HostListener('window:scroll', ['$event'])
onScroll(event: any) {
  const currentScrollPosition =
    (document.documentElement!.scrollTop || document.body.scrollTop) +
    document.documentElement!.offsetHeight;

  if (
    currentScrollPosition > this.previousScrollPosition &&
    currentScrollPosition >=
      document.documentElement!.scrollHeight - 100 &&
    !this.loading &&
    !this.endOfResults
  ) {
    this.loadProducts();
  }

  this.previousScrollPosition = currentScrollPosition;
} */

/* //New 3
private previousScrollPosition = 0;

@HostListener('window:scroll', ['$event'])
onScroll(event: any) {
  
  const currentScrollPosition = (document.documentElement!.scrollTop || document.body.scrollTop) + document.documentElement!.offsetHeight;
console.log('onScroll with currentScrollPosition:'+currentScrollPosition);
  console.log('currentScrollPosition > this.previousScrollPosition:'+(currentScrollPosition > this.previousScrollPosition+100))
  if (currentScrollPosition > this.previousScrollPosition+360) {
    const max = document.documentElement!.scrollHeight;

    if (currentScrollPosition >= max - 100 && !this.loading && !this.endOfResults) {
      this.loadProducts();
    }
  }

  this.previousScrollPosition = currentScrollPosition;
}
 */

/* //New 4
previousScrollPosition: number = 0;

@HostListener('window:scroll', ['$event'])
onScroll(event: any) {
  const screenWidth = window.innerWidth;
  console.log('screenWidth:'+screenWidth)
  let scrollOffset = 420; // default scroll offset 

  if (screenWidth <= 900) {
    scrollOffset = 590; // adjust scroll offset for smaller screens
  } else if (screenWidth <= 768) {
    scrollOffset = 700; // adjust scroll offset for smaller screens
  }
  const currentScrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight-scrollOffset;
  
  console.log('currentScrollPosition , this.previousScrollPosition:'+currentScrollPosition +','+ this.previousScrollPosition)

  if (currentScrollPosition > this.previousScrollPosition && 
      currentScrollPosition >= document.documentElement.scrollHeight - 100 && 
      !this.loading && !this.endOfResults) {
    this.loadProducts();
  }
  
  this.previousScrollPosition = currentScrollPosition;
} */

/**/ //New 5
@HostListener('window:wheel', ['$event'])
@HostListener('window:touchmove', ['$event'])
onScroll(event:any) {
    console.log('onScroll');
    console.log('document.documentElement!.offsetHeight:'+document.documentElement!.offsetHeight)
   // const pos = (document.documentElement!.scrollTop || document.body.scrollTop) + document.documentElement!.offsetHeight;
   const pos = (document.documentElement!.scrollTop || document.body.scrollTop) + document.documentElement!.offsetHeight;
    const max = document.documentElement!.scrollHeight;
console.log('pos:'+pos+' and max:'+max +' ,loading:'+this.loading+' ,'+', endOfResults:'+this.endOfResults)
//alert('m at scroll and cond is:'+(pos >= max - 100 && !this.loading && !this.endOfResults))
    if (pos >= max - 100 && !this.loading && !this.endOfResults ) {
    
      //alert('m at scrolllistner loading,endOfResults is:'+this.loading+','+this.endOfResults)
        this.loadProducts();
    }
} 

  loadProducts() {
    //alert('loadproducts are selectedSellers updated')
    console.log('loadProducts ');console.log('scats:'+this.selectedCatogories)
    this.loading = true;
    var selectedSellerIds: string = '0';var selectedCategoryIds: string = '0';
    //console.log('bfr this.selectedSellers!=undefined : '+this.selectedSellers!=undefined)
    if(this.selectedSellers!=undefined && this.selectedSellers){
    // selectedSellerIds =this.selectedSellers.map((seller:any) => seller.id) as string;
     selectedSellerIds = this.selectedSellers.map((seller:any) => seller.id).join(',');
     

     //
     if(this.selectedCatogories && this.selectedCatogories.length){
          selectedCategoryIds = this.selectedCatogories.map((cat:any) => cat.id).join(',');}
    
     //
//console.log('aa:'+selectedSellerIds); // Output: '2,3,4,5'

    }else{selectedSellerIds='0';}
/* if(this.selectedSellers!=undefined && this.selectedSellers.length>0 ){this.page=0;this.limit=0; this.products.length=0; console.log('make pageno zero limit zero') }
else if(selectedSellerIds==""){selectedSellerIds='0';this.page=1;this.limit=5;} */
//console.log('selectedSellerIds:'+selectedSellerIds); 
if(selectedSellerIds==''){selectedSellerIds='0'}
if(selectedCategoryIds==''){selectedCategoryIds='0'}
console.log('page limit selectedSellerIds and selectedCategoryIds:'+this.page+','+this.limit+','+selectedSellerIds+':'+selectedCategoryIds)
//alert('getting chunnk with sids:'+selectedSellerIds)
    //selectedSellerIds='9'
  //  alert('selectedSellerIds:'+selectedSellerIds)
this.servProduct.getProducts_chunk(this.page, this.limit,selectedSellerIds,selectedCategoryIds,'noproductIds')
      .subscribe(data => { 
     //   console.log('data:'+JSON.stringify(data))
        if (data.length === 0) {
          this.endOfResults = true;
        } else {
          this.products.push(...data);
          this.page++;
        }
        this.loading = false;
      });
  }


}
