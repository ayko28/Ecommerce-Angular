import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Core/Data/Models/product.model';
import { Category } from 'src/app/Core/Data/Models/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private apiUrl = 'https://your-api-url.com/Products'; // Replace with your API URL
  apiUrl=environment.apiUrl+'category';
  constructor(private http: HttpClient) { }

  getCategorys(): Observable<Category[]> {
      
    return this.http.get<Category[]>(this.apiUrl);
  }
  getCategorysBySellerIds(sellerdids:any): Observable<Category[]> {
    const url = `${this.apiUrl}/-1/${sellerdids}`; 
    return this.http.get<Category[]>(url);
  }
  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`; console.log(url)
    return this.http.get<Product>(url);
  }

  addProduct(Product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, Product);
  }

  updateProduct(Product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${Product.id}`;
    return this.http.put<Product>(url, Product);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
