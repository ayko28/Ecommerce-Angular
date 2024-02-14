import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersAddEditComponent } from './sellers-add-edit.component';

describe('SellersAddEditComponent', () => {
  let component: SellersAddEditComponent;
  let fixture: ComponentFixture<SellersAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellersAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
