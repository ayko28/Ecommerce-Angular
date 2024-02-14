import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazorpayComponent } from '../Core/Components/razorpay/razorpay.component';
import { GroupByPipe } from '../shared/Pipe/group-by.pipe';


@NgModule({
  declarations: [
    RazorpayComponent,GroupByPipe
    // Other shared components, directives, and pipes
  ],
  imports: [
    CommonModule
    // Other shared modules
  ],
  exports: [
    RazorpayComponent,GroupByPipe
    // Other shared components, directives, and pipes
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class SharedModule {}
