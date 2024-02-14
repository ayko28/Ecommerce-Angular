import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastController: ToastrService) { }

  GetGridClassNameOnTheme():string{
 var usertheme=localStorage.getItem('usertheme'); 

          if(usertheme=='Simple'){    return 'GridSimple';  }
          else if(usertheme=='Reddish'){    return 'GridReddish';  }
          else if(usertheme=='Dark'){     return 'GridDark';  }
          else return '';          //


  }// end of GetGridClassNAme

  GetGridRowClassNameOnTheme(aRec:any,page_selectedObj:any):string{
    
 var usertheme=localStorage.getItem('usertheme'); 
    if(aRec.ID==page_selectedObj.ID && usertheme=='Simple'){return 'GridRowSimple'}
    else if(aRec.ID==page_selectedObj.ID && usertheme=='Reddish'){return 'GridRowReddish'}
    else if(aRec.ID==page_selectedObj.ID && usertheme=='Dark'){return 'GridRowDark'}
    else return '';
    
  }

  
  async presentToast(position: 'top' | 'middle' | 'bottom',message:string) {
   /*  const toast = await this.toastController.create({
     // message: 'Hello World!',
     message: message,
      duration: 5500,
      position: position
    }); */

   // await toast.present();
  }

  changeStyle_CommonService(FocusOrBlur:any,event:any){
   
    const aElem=event.srcElement;
   if(aElem && FocusOrBlur=='focus'){
    aElem.setAttribute("style", "color:green;font-size:18px;height:35px;")
   } else if(aElem && FocusOrBlur=='blur'){
    aElem.setAttribute("style", "color:red;font-size:14px;")
   }
  }

  getUniquePropertyValues(_array:any,_property:any)
        { // Set will store only distinct values
         return [...new Set(_array.map((element:any) => element[_property]))]; 
        }
 GetDisplayNameByKey(coll:any,key:any,keyvalue:any,displayField:any)
 {
  if(coll.find((e:any)=>e[key]==keyvalue)!=undefined){
   return coll.find((e:any)=>e[key]==keyvalue)[displayField];
  }
  else return ''
 }

 compressImage(src:any, newX:any, newY:any) {
  return new Promise((res, rej) => {
    const img = new Image();
   // img.src = src;
   img.src = src;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d');
      ctx!.drawImage(img, 0, 0, newX, newY);
      const data = ctx!.canvas.toDataURL();
      res(data);//console.log('img.src:'+img.src);console.log('dataA:'+data)
    }
    img.onerror = error => rej(error);
  })
}
}
