import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { unitOfTime } from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError ,map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { CartDBService } from 'src/app/shared/Services/cart-db.service';
import { CommonService } from 'src/app/shared/Services/common.service';
import { ProductQuantityService } from 'src/app/shared/Services/product-quantity.service';
//import { debounceTime, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/Services/product.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';
import { UserService } from 'src/app/shared/Services/user.service';


@Component({
  selector: 'app-notepad-order',
  templateUrl: './notepad-order.component.html',
  styleUrls: ['./notepad-order.component.scss']
})
export class NotepadOrderComponent {
  
  
  rows: any[] = [];
  showEditable: boolean = false;
  editRowId: any;

  unit_master:any[]=[];
  ListOfQuantityForThisProduct:any[]=[];
  currentUser:any;sellers:any[]=[];
  constructor(private servProduct:ProductService,private servProd_Quantity:ProductQuantityService
    ,private servUnitmgt:UnitmgtService,public servCommon:CommonService
    ,private cartService: CartDBService,private servAuth:AuthenticationService
    ,private servUser:UserService) {
    this.rows = [];

    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
    this.servAuth.currentUser.subscribe(x => this.currentUser = x);

    this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{  this.sellers=res;  console.log('sellers are:'+JSON.stringify(this.sellers))})

  }

  //
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    /*  map(term => term === '' ? []
      : productsWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))  */
     switchMap((searchText)=>this.servProduct.getProductByPartialName(0,searchText))
  )

   formatter = (x: {product_name: string,flag:string}) => x.product_name; 
// formatter = (x: { product_name: string, price: number }) => `${x.product_name}-${x.price}`;
//formatter = (x: { product_name: string, price: number, unit_id: number }) => {  const unitInfo = x.unit_id === 2 ? 'per Kg' : x.unit_id === 1 ? 'per No' : '';  return `${x.product_name}-${x.price} ${unitInfo}`;};

  addRow() { // this.servProduct.getProductByPartialName('a')
    let indexForId = this.rows.length + 1;   this.editRowId = indexForId;
    this.rows.push({
      id: indexForId,
      aproduct: '',
      quantity:'',
      price:'',
      quantity_InNosInRupeesInGms:'Nos',
      selectedUnit:''
    })
  }

  async toggle(row: any) {
    this.editRowId = row.id;
   await this.Load(row.aproduct.id);
  //setTimeout(() => {
    
  
    if (row.selectedUnit !== 'Nos') {
      // Find the selected option from ListOfQuantityForThisProduct
      const selectedOption = this.ListOfQuantityForThisProduct.find(
        (option) => option.ID ===  row.selectedOption?.ID
      );
  
      console.log('m trying to match option from object:'+JSON.stringify(this.ListOfQuantityForThisProduct)+' which is :'+ this.ListOfQuantityForThisProduct.find(
        (option) => option.ID ===  row.selectedOption?.ID
      ))
      if (selectedOption) {
        row.selectedOption = selectedOption;
      }
    }
  //}, 3000);


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
    row.quantity_InNosInRupeesInGms='Nos';row.quantity=0;row.price=0;row.selectedUnit=1;
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
  
    for(var acartitem of this.rows){
      var aseller:any=this.sellers.filter(aseller=>aseller.id===acartitem.aproduct.seller_id);
      console.log('aseller firmname:'+JSON.stringify(aseller[0].firm_name))
      acartitem.aproduct.seller_name=aseller[0].firm_name;
      acartitem.aproduct.firm_name=aseller[0].firm_name;
      this.cartService.addToCart(this.currentUser.id,acartitem.aproduct,acartitem.aproduct.price,acartitem.quantity,acartitem.price,acartitem.selectedUnit,acartitem.quantity_InNosInRupeesInGms,'abc');

      alert('added to cart with quantity:'+acartitem.quantity+' createdby:'+this.currentUser!.id)
    }
    this.rows.length=0;
  }
}