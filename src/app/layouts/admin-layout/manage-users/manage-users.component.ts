import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  selectedOption: string = 'Sellers';

  selectOption(option: string) {
    this.selectedOption = option;
    // Perform any other actions based on the selected option
  }
}
