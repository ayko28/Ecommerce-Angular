import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { IError } from 'src/app/Core/Data/Models/ierror';
import { Error } from 'src/app/Core/Data/Models/error.model';
import { IError } from 'src/app/Core/Data/Models/ierror';

//import { Error } from 'src/app/core/data/models/error';
//import { IError } from 'src/app/core/data/models/ierror';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  apiUrl=environment.apiUrl; 

  IsSystemUnderMaintenance:boolean=false;
  constructor(private http:HttpClient) { }

 public gerErrorLog():any{
    var url=this.apiUrl+'ErrorLog';
   return this.http.get<IError>(url) //,{observe:'response'}

   .pipe(map(
    (response: any) =>  new Error().deserialize(response))//.body
    );
  }

  public TruncateErorLogs(){
    var url=this.apiUrl+'ErrorLog';
    return this.http.delete<IError>(url) //,{observe:'response'}
 
    .pipe(map(
     (response: any) =>  new Error().deserialize(response))//.body
     );
  }


  //change
  /* 
 public changeSystem_SettingsNotInUse(param_SystemSetting:any):any{
  var url=this.apiUrl+'System_Setting';
 return this.http.put<ISystemSettings>(url,param_SystemSetting) //,{observe:'response'}

 .pipe(map(
  (response: any) =>  new SystemSettings().deserialize(response))//.body
  );
} */


}
