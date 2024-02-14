import { Component,HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-promotions',
  templateUrl: './product-promotions.component.html',
  styleUrls: ['./product-promotions.component.scss']
})
export class ProductPromotionsComponent {


  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  curr_PromoProd_id_for_Addedit:any;curr_Prod_id_for_detail:any;
  promoProd_Select_Changed_for_Addedit(edata:number){
    this.curr_PromoProd_id_for_Addedit=edata;
  }
  Prod_Select_Changed_for_Detail(edata:any){
    this.curr_Prod_id_for_detail=edata;
  }
  productformSave_Detected(e:any){
    
    this.curr_PromoProd_id_for_Addedit=null;
    this.emitEventToChild();
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {console.log('scrolling...')}
}

