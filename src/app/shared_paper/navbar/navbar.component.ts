import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { UserService } from 'src/app/shared/Services/user.service';

import { User } from 'src/app/Core/Data/Models/user.model';
import { SharedDataService } from 'src/app/shared/Services/shared-data.service';
import { AuthenticationService } from 'src/app/Core/Services/authentication.service';
import { ProductService } from 'src/app/shared/Services/product.service';
import { CategoryService } from 'src/app/shared/Services/category.service';
//import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  //  moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
   styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  currentUser:any;
    private listTitles!: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton:any;
    private sidebarVisible: boolean;

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button:any;

   
    user_Sellers :User[]=[];user_Sellers_Of_this_Areacode:User[]=[];
  selectedSellers:any[] = [];selectedCategories:any[]=[];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'sellername',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
 public list_Remove:any[];
 Categories!:any[];
    constructor(location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router
     // ,public ngSelectConfig: NgSelectConfig
     ,private servCategory:CategoryService
     ,private servUser:UserService
     ,private sharedDataService: SharedDataService
     ,private authServ:AuthenticationService
      ) {

        
    
    if(this.authServ.currentUserValue){
     this.currentUser = this.authServ.currentUserValue;
     }

        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;


        //for ng-select
        /* this.ngSelectConfig.notFoundText = 'Custom not found text';
        this.ngSelectConfig.placeholder = 'Custom placeholder';
        this.ngSelectConfig.typeToSearchText = 'Custom type to search text';
        this.ngSelectConfig.clearAllText = 'Custom clear all text';
      // this.ngSelectConfig.dropdownPosition = 'bottom';
      //  this.ngSelectConfig.appendTo = '#myDiv';
        this.ngSelectConfig.bindValue = 'value'; */
        
        /* this.ngSelectConfig.searchFn = (term: string, item: any) => {
          return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        }; */

    //for multiselect ddl
    this.list_Remove = 
    [
      {name :'India',checked : false},
      {name :'US',checked : false},
      {name :'China',checked : false},
      {name :'France',checked : false},

      {name :'Urugway',checked : false},
      {name :'Iran',checked : false},
      {name :'Aus',checked : false},
      {name :'UK',checked : false}


    ]
}

isSelected(seller: User) {
  return this.selectedCategories.findIndex((s) => s.id === seller.id) > -1;
}
/**//**/ shareCheckedList(sellers:User[]){
  console.log('shareCheckedList:'+JSON.stringify(sellers));


 // this.selectedSellers.push(aseller.id)
} 
 shareIndividualCheckedList(aobj:any){ // console.log('aobj:'+JSON.stringify(aobj));
  if (this.isSelected(aobj)) {
    console.log('found selected:');console.log(aobj.id)
     this.selectedCategories = this.selectedCategories.filter((s) => s.id !== aobj.id); 
     //console.log('wiped out id:'+aobj.id); 
   // console.log('sellers acc:'+this.selectedCategories)
  } else {

    //restrict max 3 sellers
  //  if(this.selectedCategories.length<3)
    // {
      if(aobj.checked){     this.selectedCategories.push(aobj);   } else {console.log('not pushing:');console.log(aobj.id);this.selectedCategories.push(null)}
       console.log('pushed id:'+aobj.id +' but ischecked:'+aobj.checked);
      // console.log('sellers acc:'+this.selectedCategories)
    //}
   

  }
console.log('m in navbar setting selectedCategories:'+JSON.stringify(this.selectedCategories))
  this.sharedDataService.setselectedCategories(this.selectedCategories);

} /* 
Running_Seller_Selected(aseller:any){
  console.log('m Running_Seller_Selected....');console.log(aseller)
  this.selectedSellers=[];
  this.selectedSellers.push(aseller);//this.selectedSellers.filter((s) => s.id !== aseller.id); 
  this.sharedDataService.setSelectedSellers(this.selectedSellers);
} */
isSelectedSeller(seller: any): boolean {
 
   return this.selectedSellers.some(selected => selected.id === seller.id);
}
Running_Category_Selected(acategory: any) {
//
console.log('m running category selected')
console.log('curr category is:'+JSON.stringify(acategory))
const index = this.selectedCategories.findIndex(cat => cat.id === acategory.id);

  if (index !== -1) {
    // If the seller is already selected, remove it from the array
    this.selectedCategories.splice(index, 1);
  } else {
    // If the seller is not selected, add it to the array
    this.selectedCategories.push(acategory);
  }

this.sharedDataService.setselectedCategories(this.selectedCategories);
//
}
Running_Seller_Selected(aseller: any) {

  // Check if the seller already exists in selectedSellers array
 // alert('m running selleer selected, finding sellerid in selectedsellers:'+aseller.id)
  const index = this.selectedSellers.findIndex(seller => seller.id === aseller.id);
//alert('found index:'+index)
  if (index !== -1) {
    // If the seller is already selected, remove it from the array
    this.selectedSellers.splice(index, 1);//alert('removeing alexists')
  } else {
    // If the seller is not selected, add it to the array
   // alert('temp alert aseller.id:'+aseller.id)
    this.selectedSellers.push({id:aseller.id});
  }
//alert('running seller selected notifying selectedsellers:'+JSON.stringify(this.selectedSellers))
  this.sharedDataService.setSelectedSellers(this.selectedSellers);
//clear selected categories
this.sharedDataService.setselectedCategories(null);//this.Categories.length=0;
this.selectedCategories=[];

  const concatenatedIds = this.selectedSellers.map((aseller:any) => aseller.id).join(',');
  //console.log('concatenatedsellersIds:'+concatenatedIds)
    this.servCategory.getCategorysBySellerIds(concatenatedIds).subscribe((res:any)=>{
          this.Categories=res;
        //  console.log('All categories:'+JSON.stringify(this.Categories))
    }) 
  
}

getCurrentUrl(): string {
  return this.router.url;
}
  async  ngOnInit(){ 
   
      this.sharedDataService.setSelectedSellers(this.selectedSellers)
      await  this.get_Users_Sellers();
      
          this.selectedSellers.push({id:this.user_Sellers_Of_this_Areacode[0].id});
        //  alert('navbar ngoninit- push id in selectedsellers:'+this.user_Sellers_Of_this_Areacode[0].id+' so it is now:'+JSON.stringify(this.selectedSellers))
        // this.Running_Seller_Selected(this.user_Sellers_Of_this_Areacode[0])
         // alert(' and notifying selectedsellers:'+JSON.stringify(this.selectedSellers))
          this.sharedDataService.setSelectedSellers(this.selectedSellers);

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();

       

       });
    }
    //
    /*  getSellers(){
        this.user_Sellers=[{id:1,sellername:'first'},{id:2,sellername:'second'},{id:3,sellername:'third'}]
    } */
    get_Users_Sellers(){
      return new Promise((resolve, reject) => {
      this.servUser.getUsers_Of_role('Seller').subscribe((res:any)=>{
        this.user_Sellers=res;//.filter((obj:any)=>obj.userrole=="Seller");
        
        this.user_Sellers_Of_this_Areacode=this.user_Sellers.filter((obj:any)=>obj.area_code==this.currentUser.area_code);
        resolve(true)
     });
    });
     }
    //selectedSellers: any[] = [];
 /* 
isSelected(id: number): boolean {
  return this.selectedSellers.indexOf(id) > -1;
}

toggleSelection(id: number): void { 
  if (this.isSelected(id)) {
    this.selectedSellers = this.selectedSellers.filter(x => x !== id); console.log('skiping id:'+id)
  } else {
    this.selectedSellers.push(id);console.log('adding id:'+id);console.log('this.selectedSellers.length:'+this.selectedSellers.length)
  }
}*/
/* onSellerSelect(seller: any) {
  if (this.isSelected(seller)) {
    this.selectedSellers = this.selectedSellers.filter((s) => s.id !== seller.id);
  } else {
    this.selectedSellers.push(seller);console.log('adding id:'+seller.id);console.log('this.selectedSellers.length:'+this.selectedSellers.length)
  }

} */
/* onSellerSelect(seller: any) {
  if (!this.selectedSellers.some((item) => item.id === seller.id)) {
    this.selectedSellers.push(seller);console.log('adding id:'+seller.id);console.log('this.selectedSellers.length:'+this.selectedSellers.length)
  }
}
isSelected(seller: any) {
  return this.selectedSellers.findIndex((s) => s.id === seller.id) > -1;
}
onSellerSelectionChange(event: any, seller: any) {
  if (event.target.checked) {
    this.selectedSellers.push(seller);
  } else {
    const index = this.selectedSellers.findIndex(selectedSeller => selectedSeller.id === seller.id);
    if (index !== -1) {
      this.selectedSellers.splice(index, 1);
    }
  }
} */

    //

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
        //console.log('this.listTitles[item].path , titlee:'+this.listTitles[item].path +','+ titlee)
       // console.log('---->'+titlee.split('/').slice(0, 3).join('/'))
          if(this.listTitles[item].path === titlee.split('/').slice(0, 3).join('/')){
        //  if(this.listTitles[item].path.contains(titlee)){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }
      viewCart() {
        this.router.navigateByUrl('/cartDB')
      }
      Logout()
      {
        
        this.authServ.logout();
        this.router.navigate(['home']);
      }
}
