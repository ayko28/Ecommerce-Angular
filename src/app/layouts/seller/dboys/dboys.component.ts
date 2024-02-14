import { Component,HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { UserService } from 'src/app/shared/Services/user.service';


@Component({
  selector: 'app-dboys',
  templateUrl: './dboys.component.html',
  styleUrls: ['./dboys.component.scss']
})
export class DboysComponent {



  currUser:any;

  eventsSubject: Subject<void> = new Subject<void>();

  sellers:any[]=[];
  

  constructor(public authServ:AuthenticationService,private servUser:UserService){

    if(this.authServ.currentUserValue){
      this.currUser=this.authServ.currentUserValue;
    }
    if(this.authServ.currentUserValue!.userrole=='Admin')
    { this.currUser={};this.get_Users_seller_Only();}
  }
  
  //for admin behalf
  
 get_Users_seller_Only(){
  this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{
 this.sellers=res;
    //console.log('sellers for Admin:'+JSON.stringify(this.sellers))
 });
 }
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



