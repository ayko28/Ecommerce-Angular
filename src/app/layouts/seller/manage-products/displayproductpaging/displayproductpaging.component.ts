import { Component, EventEmitter, Output, Input, SimpleChanges, HostListener } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

import { Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/Services/common.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';

@Component({
  selector: 'app-displayproductpaging',
  templateUrl: './displayproductpaging.component.html',
  styleUrls: ['./displayproductpaging.component.scss']
})
export class DisplayproductpagingComponent {
  page: number = 1;
  limit: number = 10;
  loading: boolean = false;
  endOfResults: boolean = false;
  
  @Input() param_currUserId:any=0;
  @Output() product_id_for_Addedit=new EventEmitter<number>();
  @Output() product_id_for_Detail=new EventEmitter();
  @Output() product_id_Selected=new EventEmitter<number>();
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<void>;
  products:any[]=[];
  product_Selected:any;
  categoryList:any[]=[];
  //search
  searchNM:string='';
  unit_master!:any;
 constructor(private servUnitmgt:UnitmgtService,public servCommon:CommonService,private servCategory:CategoryService,private servProduct:ProductService,private authServ:AuthenticationService){
  this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
 }
 @HostListener('window:scroll', ['$event'])
onScroll(event: any) {
    const currentScrollPosition = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    
    if (currentScrollPosition >= document.documentElement.scrollHeight - 100 && !this.loading && !this.endOfResults) {
        this.loadProducts();
    }
}


loadProducts() {
  this.loading = true;

  // Call your service method to get more products
  this.servProduct.getProducts_chunk(this.page, this.limit, this.param_currUserId.id,"0",'noproductIds').subscribe((data: any) => {
    console.log('data pulled paging:'+data); 
      if (data.length === 0) {
          this.endOfResults = true;
      } else {
          this.products.push(...data);
          this.page++;
      }
      this.loading = false;
  });
}

 ngOnChanges(changes: SimpleChanges) {
  if (changes['param_currUserId']) {
    // Handle the changes to the currentUser input property
    
  // this.get_products()
  }
}
ngViewInit(){this.loadProducts();}
 ngOnInit(){
 
 // this.get_products();   

  this.getCategories();
  
  this.eventsSubscription = this.events.subscribe(() => this.get_products());
  // Load initial set of products
  this.loadProducts();
}

getCategories(){
  this.servCategory.getCategorys().subscribe((res:any)=>{this.categoryList=res});
  }
ngOnDestroy() {
  this.eventsSubscription.unsubscribe();
}
 //logic tip: To hide product-add-edit component, pass undefined for product id
 // asbelow
 //  this.product_id_for_Addedit.emit(undefined)

 addProduct(){
  this.product_id_for_Addedit.emit(0);
 }
 editProduct(param_Product:any){ 
  this.product_id_for_Detail.emit(undefined);
   this.product_id_for_Addedit.emit(param_Product.id);
 }
 selectProduct(param_Product:any){
  this.product_id_for_Addedit.emit(undefined);
   this.product_id_for_Detail.emit(param_Product.id);
 }
get_products(){
  if(this.param_currUserId.id==undefined){return;}
  
 //this.servProduct.getProducts(this.authServ.currentUserValue!.id).subscribe((res:any)=>{
  var xyz:number=this.param_currUserId.id;
  this.servProduct.getProducts(xyz).subscribe((res:any)=>{
this.products=res;
   
});
}



searchByName(){
   
  if(this.searchNM.toString().length==0){ this.page=1;this.limit=5;this.loading=false;this.endOfResults=false;this.products.length=0; this.loadProducts()}
  else if(this.searchNM.toString().length>=3){
  /*  
    var selectedSellerIds='';var first_Sellerid=this.selectedSellers[0].id;
    if(this.selectedSellers.length>=2){ first_Sellerid=0;    selectedSellerIds = this.selectedSellers.map((seller:any) => seller.id).join(',');  }
*/
    this.servProduct.getProductByPartialName(0,this.searchNM,false,this.param_currUserId.id).subscribe((resSearchByName:any)=>
    {
        //console.log('ps ny nm:'+JSON.stringify(resSearchByName));
        this.products=resSearchByName;
    })
  } 
}



}

