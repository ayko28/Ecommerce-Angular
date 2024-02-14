import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/Core/Data/Models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitmgtService {

  apiUrl=environment.apiUrl+'unitmgt/';
  constructor(private http: HttpClient) { }

  getUnitMaster(): Observable<Unit[]>{
    return this.http.get<Unit[]>(this.apiUrl);
  }
  getUnitMasterwithpromise(){
    return new Promise((resolve, reject) => {
     this.http.get<Unit[]>(this.apiUrl).subscribe((res)=>{
      resolve(res);
     });
    });
  }
}
