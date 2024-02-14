import { Injectable, EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParameterSetting } from 'src/app/Core/Data/Models/parameter-setting';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  apiUrl=environment.apiUrl+'parameter';
  constructor(private http: HttpClient) { }

  get_Parameter_Setting(): Observable<ParameterSetting[]> {
    var url=this.apiUrl;
   
    console.log('url:'+url)
    return this.http.get<ParameterSetting[]>(url); 
  }
}
