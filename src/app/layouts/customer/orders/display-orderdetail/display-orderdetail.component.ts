import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/shared/Services/common.service';
import { OrderItemService } from 'src/app/shared/Services/order-item.service';
import { OrderService } from 'src/app/shared/Services/order.service';
import { SharedDataService } from 'src/app/shared/Services/shared-data.service';

@Component({
  selector: 'app-display-orderdetail',
  templateUrl: './display-orderdetail.component.html',
  styleUrls: ['./display-orderdetail.component.scss']
})
export class DisplayOrderdetailComponent {

  @Input() Selected_Order_id_for_detail!:any;
  orderdetail:any[]=[];
  product_list:any[]=[];
  constructor(private servOrderitem:OrderItemService,private servShared:SharedDataService,public servCommon:CommonService){}
  ngOnInit(){
    this.servShared.Master_Products$.subscribe(ps=>{this.product_list=ps;})
  }
  
  async ngOnChanges(changes: SimpleChanges) {
    if (changes['Selected_Order_id_for_detail']) {
      if(this.Selected_Order_id_for_detail){
        await this.get_OrderItemsOfOrder();
      }
    }}
  
    get_OrderItemsOfOrder(){
      return new Promise((resolve, reject) => {
      this.servOrderitem.Get_Orderdetails(this.Selected_Order_id_for_detail).subscribe((res:any)=>{
       this.orderdetail=res;console.log('res:'+JSON.stringify(this.orderdetail))
  
        resolve(true);
      });
    });
    }
  }
  