import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersGenericComponent } from './orders-generic.component';

describe('OrdersGenericComponent', () => {
  let component: OrdersGenericComponent;
  let fixture: ComponentFixture<OrdersGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersGenericComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
