import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* import { MultiselectddlComponent } from 'src/app/Core/Components/multiselectddl/multiselectddl.component';
import { MytestComponent } from 'src/app/Core/Components/mytest/mytest.component'; */
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { MultiselectddlComponent } from 'src/app/Core/Components/multiselectddl/multiselectddl.component';
import { MultiselectddlParametricComponent } from 'src/app/Core/Components/multiselectddl-parametric/multiselectddl-parametric.component';
import { TypeaheadTemplateComponent } from '../../typeahead-template/typeahead-template.component';

@NgModule({
    imports: [ RouterModule, CommonModule, FormsModule,ReactiveFormsModule,
    NgSelectModule
   ,NgbModule,
   
    ],
    providers:[NgSelectConfig],//
    declarations: [ NavbarComponent,MultiselectddlComponent,MultiselectddlParametricComponent,TypeaheadTemplateComponent ],
    exports: [NavbarComponent,MultiselectddlComponent,MultiselectddlParametricComponent,TypeaheadTemplateComponent],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})

export class NavbarModule {}
