import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-promotions',
  templateUrl: './manage-promotions.component.html',
  styleUrls: ['./manage-promotions.component.scss']
})
export class ManagePromotionsComponent {
  selectedOption: string = 'Product-Promotions';

  selectOption(option: string) {
    this.selectedOption = option;
    // Perform any other actions based on the selected option
  }

}
