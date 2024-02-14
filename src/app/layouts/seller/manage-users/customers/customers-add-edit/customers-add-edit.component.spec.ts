import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAddEditComponent } from './customers-add-edit.component';

describe('CustomersAddEditComponent', () => {
  let component: CustomersAddEditComponent;
  let fixture: ComponentFixture<CustomersAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
