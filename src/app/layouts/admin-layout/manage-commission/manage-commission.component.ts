import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-commission',
  templateUrl: './manage-commission.component.html',
  styleUrls: ['./manage-commission.component.scss']
})
export class ManageCommissionComponent {
  selectedOption: string = 'commission_setting';

  selectOption(option: string) {
    this.selectedOption = option;
    // Perform any other actions based on the selected option
  }
}
