import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarplainComponent } from './navbarplain/navbarplain.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    NavbarplainComponent
  ],
  imports: [
    CommonModule
    ,RouterModule
    , FormsModule,ReactiveFormsModule
    ,NgSelectModule
    ,NgbModule
  ]
  ,  providers:[NgSelectConfig]
  ,exports:[NavbarplainComponent]
  , schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarPlainModule { }
