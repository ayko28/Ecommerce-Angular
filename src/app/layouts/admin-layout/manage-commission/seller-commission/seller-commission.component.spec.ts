import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCommissionComponent } from './seller-commission.component';

describe('SellerCommissionComponent', () => {
  let component: SellerCommissionComponent;
  let fixture: ComponentFixture<SellerCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerCommissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
