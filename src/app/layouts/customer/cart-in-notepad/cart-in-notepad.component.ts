import { Location } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { unitOfTime } from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError ,map } from 'rxjs/operators';
import { CartItem } from 'src/app/Core/Data/Models/cart-item.model';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CartDBService } from 'src/app/shared/Services/cart-db.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { ProductQuantityService } from 'src/app/shared/Services/product-quantity.service';
//import { debounceTime, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/Services/product.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-cart-in-notepad',
  templateUrl: './cart-in-notepad.component.html',
  styleUrls: ['./cart-in-notepad.component.scss']
})
export class CartInNotepadComponent {
  
  
  rows: any[] = [];
  showEditable: boolean = false;
  editRowId: any;

  unit_master:any[]=[];
  ListOfQuantityForThisProduct:any[]=[];
  currentUser:any;sellers:any[]=[];
  cartItems: CartItem[] = [];
  Editing:boolean=false;
  editingRow: any = null;
  loading: boolean = true;
  passed_sellerid:number=-1;passed_sellerIds:string='';
  flagLoadedCartItemsInRows:boolean=false;
  constructor(private servProduct:ProductService,private servProd_Quantity:ProductQuantityService
    ,private servUnitmgt:UnitmgtService,public servCommon:CommonService
    ,private cartService: CartDBService,private servAuth:AuthenticationService
    ,private servUser:UserService,private router:Router,private location:Location
    ,private route:ActivatedRoute) {

      this.route.params.subscribe((params: any) => this.passed_sellerid = params['passed_sellerid']);
      this.route.params.subscribe((params: any) => this.passed_sellerIds = params['passed_sellerIds']);
      if(this.passed_sellerIds.toString().length>1){this.passed_sellerid=0;}

    this.rows = [];

    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);

    this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{  this.sellers=res;  console.log('sellers are:'+JSON.stringify(this.sellers))})

  }

  async getCartItems() {
     
    return new Promise((resolve, reject) => {
      this.cartService.getCartItems().subscribe(items => {
        
        this.cartItems = items; 
     //  alert('inside:'+this.cartItems.length)
       
        resolve(true);//alert('resolving with:'+this.cartItems.length )
        
      //   alert('m getCartItems n items count:'+this.cartItems.length)
      //aaaaaaaaaaaaaa
    //  alert(this.cartItems.length)
    if(this.cartItems.length==0){this.loading=false;}
    else  if(this.cartItems.length>0){
          if(this.flagLoadedCartItemsInRows==false){
        this.LoadCartItemsInRows();this.flagLoadedCartItemsInRows=true;
          }
     //   alert('m resolving n cartitems:'+this.cartItems.length)
     console.log('cartItems loaded here....aaaaaaaaaaaaaaaaaaaaaa......:'+JSON.stringify(this.cartItems))
       // resolve(this.cartItems)
        }else{
          reject(true);//alert('rejecting prom')
      }
    });
   
  });
  alert('end of getcartitems exec')
  }
  
  //
  async ngOnInit() {
       
  //  if (this.cartItems.length === 0) {
      await this.getCartItems();
    //  alert('after wait..with items count:'+this.cartItems.length);
    //  this.LoadCartItemsInRows();
   // } else {
   //   this.LoadCartItemsInRows();
   // }
  }
  
fetchProductOfid(id:any){
  return new Promise((resolve, reject) => {
    var fetchedProd:any;
     this.servProduct.getProduct(id).subscribe((resProd:any)=>{fetchedProd=resProd; 
      console.log("fetchedProd:"+JSON.stringify(fetchedProd));
    resolve(fetchedProd)
    })
  })
}
 async LoadCartItemsInRows(){
   
   //alert(this.cartItems.length)
    //alert(this.cartItems.length)
    //alert('in lcitems cartitems.length:'+this.cartItems.length)
    if (this.cartItems.length == 0) {this.loading=false;} else if (this.cartItems.length > 0) {

    
    for (const cartItem of this.cartItems) {
    var fetchedProd:any;
  fetchedProd= await  this.fetchProductOfid(cartItem.productId)
  const selectedOption =await  this.getSelectedOption(fetchedProd[0].id,cartItem.CPorCQ,cartItem.selectedUnit,cartItem.quantity)   
  const row = {

        
        "id": this.rows.length + 1,
        "aproduct": fetchedProd[0],
        "price":cartItem.pmultq,
         "quantity":cartItem.quantity,
        "quantity_InNosInRupeesInGms":cartItem.CPorCQ,
         "selectedUnit":cartItem.selectedUnit,
         "selectedOption":selectedOption
        
          // ... other properties
        ,  showImageRow: false
                
      }
      this.rows.push(row);
    }
    
  }
  this.loading=false;
  }
  async getSelectedOption(param_prodid: any, param_CPorCQ: any, param_selectedUnit: any, param_quantity: any) {
    await this.Load(param_prodid);
    
    if (param_CPorCQ !== 'Nos') {
      const selectedOption = this.ListOfQuantityForThisProduct.find(
        (option) => option.Quantity_Option_Value ===  param_quantity &&  option.Quantity_Option_Unit ===  param_selectedUnit
      );
    
      if (selectedOption) {
        return selectedOption;
      }
    }
    
    return null; // Return null if no selected option is found
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    /*  map(term => term === '' ? []
      : productsWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))  */
      //this.passed_sellerid
     switchMap((searchText)=>this.abcd(searchText))
  )

  
  formatter = (x: {product_name: string,flag:string}) => x.product_name; 
// formatter = (x: { product_name: string, price: number }) => `${x.product_name}-${x.price}`;
//formatter = (x: { product_name: string, price: number, unit_id: number }) => {  const unitInfo = x.unit_id === 2 ? 'per Kg' : x.unit_id === 1 ? 'per No' : '';  return `${x.product_name}-${x.price} ${unitInfo}`;};

abcd(searchText: any) {
  if(searchText.toString().length<2){return [];}
  if (this.editingRow === null) {
    // Filter out products with IDs that are in the 'rows' array
    const filteredProducts = this.servProduct.getProductByPartialName(0, searchText, !this.Editing, this.passed_sellerIds)
      .pipe(
        map(products => products.filter(product => !this.rows.some(row => row.aproduct?.id === product.id)))
      );
    return filteredProducts;
  } else {
  //  return this.servProduct.getProductByPartialName(0, searchText, !this.Editing, this.passed_sellerIds);
  // Filter out products with IDs that are in the 'rows' array 
  //and current editing rows product
  const filteredProducts = this.servProduct.getProductByPartialName(0, searchText, !this.Editing, this.passed_sellerIds)
  .pipe(
    map(products => products.filter(product => !this.rows.some(row => row.aproduct?.id === product.id && row.aproduct?.id==this.editingRow.id) ))
  );
return filteredProducts;
  }
}


addRow() {
  this.Editing = false;
  this.editRowId = this.rows.length + 1;

  if (this.editingRow) {
   
      // Copy the editing row data to the new row
      const newRow = { ...this.editingRow };
      
const rowIndex=this.rows.findIndex(row=>row.id==this.editingRow.id)
if(rowIndex!=-1){this.rows[rowIndex]=this.editingRow;}

      this.editingRow = null; // Clear the editingRow after using it

  }//if editingRow then just assign it to accidental changed row


  
  this.rows.push({
    id: this.editRowId,
    aproduct: '',
    quantity: '',
    price: '',
    quantity_InNosInRupeesInGms: 'Nos',
    selectedUnit: ''
});
this.xyz(null);


}


  remove_rowfromRowsWith_aProductidisNull(){ //alert('m remove_rowfromRowsWith_aProductidisNull')
      for(var aRow of this.rows){
        if(aRow.aproduct.id==null || aRow.quantity==0){
          console.log('A row with id:'+aRow.id+' is having improper product');
          this.rows=  this.rows.filter(e=>e.id!=aRow.id)}
      }
  }
  isEditingRecordInvalid(aRow:any):boolean{
    const rr=this.rows.findIndex(e=>e.id==aRow.id)
    if(this.rows[rr].aproduct==null){
          return true;//invalid
    }
    return false;
  }
  deleteRow_from_rows(row:any){

      var YN=confirm("Are You Sure To This CartItem?")
      if(YN){    this.rows=  this.rows.filter(e=>e.id!=row.id) }
  }
  async toggle(row: any) {
    this.Editing = true;
   
if(this.editingRow==null){
   this.remove_rowfromRowsWith_aProductidisNull();
}
    this.editRowId = row.id;
    
    await this.Load(row.aproduct.id);

    if (row.selectedUnit !== 'Nos') {
        const selectedOption = this.ListOfQuantityForThisProduct.find(
            (option) => option.ID === row.selectedOption?.ID
        );

        if (selectedOption) {
            row.selectedOption = selectedOption;
        }
    }

    
  if (this.editingRow && this.isEditingRecordInvalid(this.editingRow)) {
   
    // Copy the editing row data to the new row
    //const newRow = { ...this.editingRow };
    
const rowIndex=this.rows.findIndex(row=>row.id==this.editingRow.id)
if(rowIndex!=-1){this.rows[rowIndex]=this.editingRow;}

    this.editingRow = null; // Clear the editingRow after using it

}//if editingRow then just assign it to accidental changed row

    this.editingRow = { ...row }; // Store the edited row data
   
    console.log('preserved editingrow:'+JSON.stringify(this.editingRow))
    //row.showImageRow = !row.showImageRow;
    this.xyz(row);
}

  
xyz(row:any){
  
 // Toggle the showImageRow property for the clicked row
 //first set showImageRow of all rows false
 for(var arow of this.rows){arow.showImageRow=false;}
 //and set current showImageRow=true
 row.showImageRow = !row.showImageRow;
}
  onQuantityChange(row:any){
    //default if quantity changes then price changes
    row.price = row.quantity * row.aproduct.price;
    row.price=this.roundToNearestMultipleOf(row.price,1)
    if (row.aproduct.unit_id === 1){
      console.log('onquantchg')
      row.price = row.quantity * row.aproduct.price;
      row.price=this.roundToNearestMultipleOf(row.price,1)
      row.selectedUnit=1;
    } 
    if (row.aproduct.unit_id === 2 && row.quantity_InNosInRupeesInGms=='customQuantity'){
      row.price = (row.quantity / 1000) * row.aproduct.price;  
      row.price=this.roundToNearestMultipleOf(row.price,1)
      row.selectedUnit=3;

    }
  }
  onPriceChange(row:any){
    
    if (row.aproduct.unit_id === 2 && row.quantity_InNosInRupeesInGms=='Nos'){row.selectedUnit=1;}
    else if (row.aproduct.unit_id === 2 && row.quantity_InNosInRupeesInGms!='Nos'){
      row.quantity = (row.price / row.aproduct.price) * 1000;
      row.quantity=this.roundToNearestMultipleOf(row.quantity,1)
      row.selectedUnit=3;
    }
  }
  
  onUnitChange(row: any) {
    console.log('onUnitChange is running')
    if (row.quantity_InNosInRupeesInGms === 'Nos') 
    {
      // Handle 'Nos' option logic here
      console.log('Selected option: Nos');
      // Calculate the price based on quantity and std price
    //  if (row.aproduct.unit_id === 2) {
        row.price = row.quantity * row.aproduct.price;
        row.price=this.roundToNearestMultipleOf(row.price,1)
        row.selectedUnit=1;
     // }
    }
    else if (row.quantity_InNosInRupeesInGms === 'customPrice') {
      // Handle customPrice logic here
      console.log('Selected option: customPrice');
      // Calculate the quantity based on customPrice and std price
      if (row.aproduct.unit_id === 2) {
        row.quantity = (row.price / row.aproduct.price) * 1000;
        row.quantity=this.roundToNearestMultipleOf(row.quantity,1)
row.selectedUnit=3;
      }
    } else if (row.quantity_InNosInRupeesInGms === 'customQuantity') {
      // Handle customQuantity logic here
      console.log('Selected option: customQuantity');
      // Calculate the price based on customQuantity and std price
      if (row.aproduct.unit_id === 2 || row.aproduct.unit_id === 4) {
        row.price = (row.quantity / 1000) * row.aproduct.price;
        row.price=this.roundToNearestMultipleOf(row.price,1)
        row.selectedUnit=3;

        //LoadQuantityOptions of this product
        console.log('LoadQuantityOptions of this product:');console.log('row.aproduct.id:'+row.aproduct.id)
      //  this.ListOfQuantityForThisProduct=[{id:1,QuantityOption:'50gms'},{id:2,QuantityOption:'100gms'},{id:3,QuantityOption:'200gms'}]

      this.Load(row.aproduct.id);
      }
    
    }
  }
  
    roundToNearestMultipleOf(value: number,multiOf:number): number {
    return Math.ceil(value / multiOf) * multiOf;
  }
  Load(prodid:any){
    return new Promise((resolve, reject) => {
    this.servProd_Quantity.get_prod_quality_OfProductId(prodid).subscribe((res:any)=>{
      this.ListOfQuantityForThisProduct=res;
      console.log('ListOfQuantityForThisProduct:'+ JSON.stringify(this.ListOfQuantityForThisProduct))
      resolve(true)
    })

  })
  }
  onTypeaheadChanging(row:any){
    row.aproduct=null;
    row.quantity_InNosInRupeesInGms='Nos';row.quantity=0;row.price=0;row.selectedUnit=1;row.selectedOption=null;

     row.showImageRow=true;// setTimeout(() => {      if(row.aproduct==null){ row.showImageRow=false;  }     }, 200);
  
  }
  onblur(row:any){
    if(row.aproduct.id==null && this.Editing){
      }
  }
  onProductQuantityOptionChange(row: any) {
    if (row.selectedOption) {
      row.quantity = row.selectedOption.Quantity_Option_Value;
      row.price = row.selectedOption.Quantity_Option_Value * row.selectedOption.conversion_factor * row.aproduct.price;
      row.selectedUnit = row.selectedOption.Quantity_Option_Unit                          
    } else {
      row.quantity = '';
    //  row.price = '';
    }
  }
  
  AddToCart()
  {
  this.remove_rowfromRowsWith_aProductidisNull()
    for(var acartitem of this.rows){
      var aseller:any=this.sellers.filter(aseller=>aseller.id===acartitem.aproduct.seller_id);
      console.log('aseller firmname:'+JSON.stringify(aseller[0].firm_name))
      acartitem.aproduct.seller_name=aseller[0].firm_name;
      acartitem.aproduct.firm_name=aseller[0].firm_name;
      this.cartService.addToCart(this.currentUser.id,acartitem.aproduct,acartitem.aproduct.price,acartitem.quantity,acartitem.price,acartitem.selectedUnit,acartitem.quantity_InNosInRupeesInGms,this.currentUser!.display_name);
      //alert('added to cart with quantity:'+acartitem.quantity)
    }
    this.rows.length=0;
    this.router.navigate(['/cartDB']);
   }

   goBack(){
    this.location.back()
   }
}
