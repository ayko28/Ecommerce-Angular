import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Test2ModalComponent } from '../test2-modal/test2-modal.component';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component {
  selectedProduct: any;

  @ViewChild('productModal') productModal: NgbModalRef | undefined;
  constructor(private modalService: NgbModal){}

  openProductModal() {
    // Declare an instance of NgbModalOptions
const modalOptions: NgbModalOptions = {
//backdrop: 'static', // Specify whether clicking outside the modal should close it
//keyboard: false, // Specify whether pressing the Esc key should close the modal
centered: true, // Specify whether the modal should be vertically centered
// Add more options as needed
};

  //  this.selectedProduct = product;
    //const modalRef = this.modalService.open(this.productModal, modalOptions);}
    const modalRef = this.modalService.open(Test2ModalComponent, modalOptions);
  
  }



}
