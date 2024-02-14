import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {
  selectedOption: string = 'Paid-Orders';

  selectOption(option: string) {
    this.selectedOption = option;
    // Perform any other actions based on the selected option
  }
}
