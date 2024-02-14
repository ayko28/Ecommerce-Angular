import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuantityPromotionComponent } from './display-quantity-promotion.component';

describe('DisplayQuantityPromotionComponent', () => {
  let component: DisplayQuantityPromotionComponent;
  let fixture: ComponentFixture<DisplayQuantityPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayQuantityPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuantityPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
