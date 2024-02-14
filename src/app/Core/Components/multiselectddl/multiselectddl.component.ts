import {Component,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-multiselectddl',
  templateUrl: './multiselectddl.component.html',
  styleUrls: ['./multiselectddl.component.scss']
})
export class MultiselectddlComponent {






  @Input() list!:any[]; 
    
    @Output() shareCheckedList = new EventEmitter();
    @Output() shareIndividualCheckedList = new EventEmitter();
    
    
    checkedList : any[];
    currentSelected! : {};
    showDropDown:boolean=false;
    //
    maxChecked = 3;
checkedCount = 0;
//
  constructor() {
    this.checkedList = [];
   }

       getSelectedValue(status:Boolean,id:number,value:String){
        //
        if (status) {
          if (this.checkedCount >= 3) {
            // Maximum number of items reached, uncheck the current item
            this.list.find((a) => a.id === id).checked = false;
            return;
          }
          this.checkedCount++;
        } else {
          this.checkedCount--;
        }
        //
        if(status){
        //  this.checkedList.push(value);  
        this.checkedList.push({id:id,name:value});  
        }else{
            var index = this.checkedList.indexOf(value);
            this.checkedList.splice(index,1);
        }
        
        this.currentSelected = {checked : status,id:id,name:value};

        //share checked list
        this.shareCheckedlist();
        
        //share individual selected item
        this.shareIndividualStatus();
    }
    shareCheckedlist(){
         this.shareCheckedList.emit(this.checkedList);
    }
    shareIndividualStatus(){
        this.shareIndividualCheckedList.emit(this.currentSelected);
    }
//
getCheckedListNames(): string {
  return this.checkedList.map(item => item.name).join(', ');
}

//


}


