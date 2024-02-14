import { Component,HostListener } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quantity-promotions',
  templateUrl: './quantity-promotions.component.html',
  styleUrls: ['./quantity-promotions.component.scss']
})
export class QuantityPromotionsComponent {


  eventsSubject: Subject<void> = new Subject<void>();
  quantityStagesFormArray!: FormArray;

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
  
  
  onQuantityStagesFormArrayChange(formArray: FormArray): void {
    this.quantityStagesFormArray = formArray;
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {console.log('scrolling...')}
}
