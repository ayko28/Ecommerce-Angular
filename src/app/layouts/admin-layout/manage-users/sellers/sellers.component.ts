import { Component,HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent {



  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  curr_Seller_id_for_Addedit:any;curr_Prod_id_for_detail:any;
  seller_Select_Changed_for_Addedit(edata:number){
    this.curr_Seller_id_for_Addedit=edata;
  }
  seller_Select_Changed_for_Detail(edata:any){
    this.curr_Prod_id_for_detail=edata;
  }
  sellerformSave_Detected(e:any){
    
    this.curr_Seller_id_for_Addedit=null;
    this.emitEventToChild();
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {console.log('scrolling...')}
}


