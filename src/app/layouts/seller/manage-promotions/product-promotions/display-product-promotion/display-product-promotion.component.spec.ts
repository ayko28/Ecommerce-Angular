import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductPromotionComponent } from './display-product-promotion.component';

describe('DisplayProductPromotionComponent', () => {
  let component: DisplayProductPromotionComponent;
  let fixture: ComponentFixture<DisplayProductPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProductPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
