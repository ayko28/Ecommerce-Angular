import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPromotionsComponent } from './quantity-promotions.component';

describe('QuantityPromotionsComponent', () => {
  let component: QuantityPromotionsComponent;
  let fixture: ComponentFixture<QuantityPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
