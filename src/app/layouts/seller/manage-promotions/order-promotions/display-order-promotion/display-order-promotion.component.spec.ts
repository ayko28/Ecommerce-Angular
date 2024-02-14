import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrderPromotionComponent } from './display-order-promotion.component';

describe('DisplayOrderPromotionComponent', () => {
  let component: DisplayOrderPromotionComponent;
  let fixture: ComponentFixture<DisplayOrderPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOrderPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOrderPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
