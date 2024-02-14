import { Component,HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

 export  function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    timeFormat: 'hh:mm A',
    showMeridian: true,
    containerClass: 'theme-default',
    hourStep: 1,
    minuteStep: 15,
    readonlyInput: false,
    mousewheel: true,
    arrowkeys: true
  });
}
@Component({
  selector: 'app-order-promotions',
  templateUrl: './order-promotions.component.html',
  styleUrls: ['./order-promotions.component.scss']
})
export class OrderPromotionsComponent {


 // timepickerConfig: TimepickerConfig =getTimepickerConfig();
 

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


