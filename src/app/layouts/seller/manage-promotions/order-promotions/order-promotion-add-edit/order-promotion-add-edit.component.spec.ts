import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPromotionAddEditComponent } from './order-promotion-add-edit.component';

describe('OrderPromotionAddEditComponent', () => {
  let component: OrderPromotionAddEditComponent;
  let fixture: ComponentFixture<OrderPromotionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPromotionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPromotionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
