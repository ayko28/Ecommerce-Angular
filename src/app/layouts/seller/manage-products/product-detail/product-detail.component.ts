import { Component, Input , OnChanges, SimpleChanges} from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  @Input() param_Product_id!:number;
  product_Selected:any;
  imagepath:any;
  constructor(private servProduct:ProductService,private authServ:AuthenticationService){
  
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['param_Product_id']) {
         // Call your method here
      
         if (this.param_Product_id==0){     /*initialise here if product is zero */ }
       
    //patchvalues
    if (this.param_Product_id) {
  
      this.get_Product();
    }
    }
  }
  get_Product(){
    this.servProduct.getProduct(this.param_Product_id).subscribe((res:any)=>{
      this.product_Selected=res[0];
      this.imagepath='E:/myApt/nodeMyShop/images/apple.jpg';
  });
  }
  
}
