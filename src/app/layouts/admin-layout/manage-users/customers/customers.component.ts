import { Component,HostListener } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {



  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  curr_Customer_id_for_Addedit:any;curr_Prod_id_for_detail:any;
  Customer_Select_Changed_for_Addedit(edata:number){
    this.curr_Customer_id_for_Addedit=edata;
  }
  Customer_Select_Changed_for_Detail(edata:any){
    this.curr_Prod_id_for_detail=edata;
  }
  customerformSave_Detected(e:any){
    
    this.curr_Customer_id_for_Addedit=null;
    this.emitEventToChild();
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {console.log('scrolling...')}
}



