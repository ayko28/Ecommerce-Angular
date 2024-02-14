import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private selectedSellersSource = new BehaviorSubject<any>(null);
  selectedSellers$ = this.selectedSellersSource.asObservable();

  //
  private selectedCategoriesSource = new BehaviorSubject<any>(null);
  selectedCategories$ = this.selectedCategoriesSource.asObservable();

  //
  private Master_ProductsSource=new BehaviorSubject<any>(null);
  Master_Products$=this.Master_ProductsSource.asObservable();

  constructor(private servProduct:ProductService) {
      this.servProduct.getProducts_All().subscribe(ps=>{this.setMaster_Products(ps);})
   }

  setSelectedSellers(selectedSellers: any) {
    this.selectedSellersSource.next(selectedSellers);
  }
//

setselectedCategories(selectedCategories: any) {
  this.selectedCategoriesSource.next(selectedCategories);
}
//
  setMaster_Products(param_list:any){
    this.Master_ProductsSource.next(param_list);
  }

}
