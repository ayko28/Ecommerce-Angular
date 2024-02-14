import { Component,HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-commission-setting',
  templateUrl: './commission-setting.component.html',
  styleUrls: ['./commission-setting.component.scss']
})
export class CommissionSettingComponent {


  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  curr_Prod_id_for_Addedit:any;curr_Prod_id_for_detail:any;
  Prod_Select_Changed_for_Addedit(edata:number){
    this.curr_Prod_id_for_Addedit=edata;
  }
  Prod_Select_Changed_for_Detail(edata:any){
    this.curr_Prod_id_for_detail=edata;
  }
  productformSave_Detected(e:any){
    
    this.curr_Prod_id_for_Addedit=null;
    this.emitEventToChild();
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {}
}


