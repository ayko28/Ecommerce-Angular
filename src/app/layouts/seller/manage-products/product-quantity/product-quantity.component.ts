import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/shared/Services/common.service';
import { ProductQuantityService } from 'src/app/shared/Services/product-quantity.service';
import { UnitmgtService } from 'src/app/shared/Services/unitmgt.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})


export class ProductQuantityComponent {
  @Input() ProductId!:any;
  unit_master:any[]=[];
  ListOfQuantityForThisProduct:any[]=[];
  loading:boolean=true;
  constructor(private servProdQuantity:ProductQuantityService,private servUnitmgt:UnitmgtService,public servCommon:CommonService){
    this.servUnitmgt.getUnitMaster().subscribe((res:any)=>{this.unit_master=res;})
  }
  ngOnInit(){
    
    this.servProdQuantity.get_prod_quality_OfProductId(this.ProductId).subscribe((res:any)=>{
      this.ListOfQuantityForThisProduct=res;console.log('ListOfQuantityForThisProduct:'+JSON.stringify(this.ListOfQuantityForThisProduct))
      this.loading=false;
    })
  }
}
