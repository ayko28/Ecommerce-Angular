import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { ErrorLogService } from 'src/app/shared/Services/error-log.service';
@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.scss']
})
export class ErrorLogComponent {

  page_ErrorLog!:any;
  page_SystemSetting!:any;

  apiUrl=environment.apiUrl;
  page_selectedFlatowner:any;
  AddEditOpMode:any='';
  constructor(private http:HttpClient,private router:Router
    ,private servErrorlog:ErrorLogService
    ) { }

  ngOnInit() {
        
          this.GetErrorLog(); 
      }

  
  selectUser(param_selecteduser:any){
    this.page_selectedFlatowner=param_selecteduser;
    this.AddEditOpMode='Edit';
}

AddEditFlatowner(id:any){console.log('addedit...')
  var url='';
if(id!=0){ url=this.apiUrl+'Flatowner'+'/'+id; }
else{url=this.apiUrl+'Flatowner';console.log('no id i.e. adding flatowner')}
console.log('here is url:'+url)
  this.http.put(url,this.page_selectedFlatowner).subscribe((res)=>{ console.log('done with AddEditFlatowner')
    this.page_selectedFlatowner=null;this.GetErrorLog();
  })
  this.AddEditOpMode='';
}
DeleteFlatowner(){
  var url=this.apiUrl+'Flatowner'+"/"+this.page_selectedFlatowner.ID;
  this.http.delete(url).subscribe((res)=>{
    this.page_selectedFlatowner=null;this.GetErrorLog();
  })
  this.AddEditOpMode='';
}
CancelAddEdit()
{this.AddEditOpMode='';this.page_selectedFlatowner=null;this.GetErrorLog();}

DeleteTop10Errors(){
  this.servErrorlog.TruncateErorLogs().subscribe((res:any)=>{

    this.page_ErrorLog=res.sp_data.recordsets[0];
    console.log('res.body.sp_data'+JSON.stringify(res.sp_data.recordsets[0]))
}) 
}
  GetErrorLog(){
    
    this.servErrorlog.gerErrorLog().subscribe((res:any)=>{

      this.page_ErrorLog=res.sp_data.recordsets[0];
      console.log('res.body.sp_data'+JSON.stringify(res.sp_data.recordsets[0]))
 })  
  }//end of GetFlatowners




}

