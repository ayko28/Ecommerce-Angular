import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPromotionsComponent } from './order-promotions.component';

describe('OrderPromotionsComponent', () => {
  let component: OrderPromotionsComponent;
  let fixture: ComponentFixture<OrderPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
