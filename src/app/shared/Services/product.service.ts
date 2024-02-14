import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Core/Data/Models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private apiUrl = 'https://your-api-url.com/Products'; // Replace with your API URL
  apiUrl=environment.apiUrl+'product/';
  constructor(private http: HttpClient) { }

  getProducts(param_sellerId:number=0): Observable<Product[]> {
    var url=this.apiUrl;
    if(param_sellerId){
    //  url=url+"?seller_id="+param_sellerId
    url=url+"/0/"+param_sellerId+"/0/0/0/0/noproductid/0"
    }
    return this.http.get<Product[]>(url); console.log('url:'+url)
  }
  getProducts_All(): Observable<Product[]> {
    var url=this.apiUrl+"/0/0/0/0/0/0/noproductIds/0"
    
    return this.http.get<Product[]>(url); console.log('url:'+url)
  }
  getProducts_Ofseller(param_sellerId:any): Observable<Product[]> {
    var url=this.apiUrl+"0/"+param_sellerId+"/0/0/0/0/noproductIds/0";
    console.log('Hurl:'+url)
    return this.http.get<Product[]>(url); 
  }
  getProducts_chunk(PageNumber:number=0,PageSize:number=0,param_sellerdIDs:string='',param_categoryIDs:string='',param_productIds:string,param_partialNM:string='0'): Observable<Product[]> {
    //var url=this.apiUrl+"?PageNumber="+PageNumber+"&PageSize="+PageSize;
    //var url=this.apiUrl+"0/0/"+PageNumber+"/"+PageSize+"/"+param_sellerdIDs+"/"+param_categoryIDs+"/"+param_productIds+"/0"; console.log('url chunk:'+url)
    //replaced above by below statement on 28Aug23
    var url=this.apiUrl+"0/0/"+PageNumber+"/"+PageSize+"/"+param_sellerdIDs+"/"+param_categoryIDs+"/"+param_productIds+"/"+param_partialNM; console.log('url chunk:'+url)
    //?PageNumber="+PageNumber+"&PageSize="+PageSize;
  //alert('url product is:'+url)
    return this.http.get<Product[]>(url); 
  }
  
  getProductByIds(ids: string|undefined): Observable<Product> {

    const url = `${this.apiUrl}-1/0/0/0/0/0/${ids}/0`;
     
     return this.http.get<Product>(url);
   }
  getProduct(id: number|undefined): Observable<Product> {
   // const url = `${this.apiUrl}/${id}`;
   const url = `${this.apiUrl}/${id}/0/0/0/0/0/noproductIds/0`;
    
    return this.http.get<Product>(url);
  }
getProductByPartialName(param_sellerid:any,param_partialname: string|undefined,skipIdsFromCartItems :boolean=false,param_sellerIds=''): Observable<Product[]> {
  var url=this.apiUrl+"0/"+param_sellerid+"/0/0/0/0/noproductIds/"+param_partialname+'/'+skipIdsFromCartItems;
  if(param_sellerIds!=''){url=this.apiUrl+"0/"+param_sellerid+"/0/0/"+param_sellerIds+"/0/noproductIds/"+param_partialname+'/'+skipIdsFromCartItems;}
  console.log( 'Hurl:'+url)
  return this.http.get<Product[]>(url); 
  console.log('aaaaaaaaaaaaaaa')
  //const url = `${this.apiUrl}-1/0/0/0/0/0/${ids}`;
   
  // return this.http.get<Product>(url);
  var myProducts:any[]= [
    {'id':21,'name': 'Alabama', 'price':11,'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},
   
    {'id':22,'name': 'Connecticut', 'price':12,'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},
    {'id':23,'name': 'Delaware', 'price':13,'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},
    {'id':24,'name': 'Florida', 'price':14,'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},
  
    {'id':25,'name': 'Kansas', 'price':15,'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},
  
  ];

console.log(this.filterByValue(myProducts,param_partialname))
 return this.filterByValue(myProducts,param_partialname)
 //return myProducts;
 }
 filterByValue(array:any, value:any) {
  return array.filter((data:any) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
}
  filterByValueaaa(array:any, string:string|undefined) {
  return array.filter((o:any) =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(string!.toLowerCase())));
}
  addProduct(Product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, Product);
  }

  updateProduct(Product: any): Observable<Product> {
    console.log('m in updateProduct method of product service...')
    const url = `${this.apiUrl}/${Product.id}`;
    return this.http.put<Product>(url, Product);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }



}
