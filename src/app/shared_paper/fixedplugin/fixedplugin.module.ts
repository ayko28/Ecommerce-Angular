import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FixedPluginComponent } from './fixedplugin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ FixedPluginComponent ],
    exports: [ FixedPluginComponent ]
    ,schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FixedPluginModule {}
