import { Component,EventEmitter,HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { UserService } from 'src/app/shared/Services/user.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {

  @Output() currUserid=new EventEmitter<number>();
  currUser:any;
  eventsSubject: Subject<void> = new Subject<void>();

  sellers:any[]=[];
  

  constructor(public authServ:AuthenticationService,private servUser:UserService){

if(this.authServ.currentUserValue){
  this.currUser=this.authServ.currentUserValue;
  this.currUserid.emit(this.authServ.currentUserValue!.id);
  if(this.authServ.currentUserValue!.userrole=='Seller')
  {
    this.currUserid.emit(this.authServ.currentUserValue!.id);
//    this.currUserid=this.authServ.currentUserValue!.id
  }
  else if(this.authServ.currentUserValue!.userrole=='Admin')
  {this.currUserid.emit(0);this.get_Users_seller_Only();}
 }
  }
  //for admin behalf
  
 get_Users_seller_Only(){
  this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{
 this.sellers=res;
    //console.log('sellers for Admin:'+JSON.stringify(this.sellers))
 });
 }
 /* onUserChange(event:any){
 // this.currUserid=event.target['value']; console.log('changed emitted selectedUser.id:'+JSON.stringify(event.target['value']))
 console.log('mp '+this.currUser.id)
 // for test this.currUserid.emit(4)//=this.currUser.id;
 } */
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

