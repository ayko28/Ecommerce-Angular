import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent {
  @Input() order:any;

  constructor(public activeModal: NgbActiveModal){}

  
}
