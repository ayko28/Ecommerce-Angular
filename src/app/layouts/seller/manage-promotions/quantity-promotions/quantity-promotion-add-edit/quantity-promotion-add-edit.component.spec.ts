import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPromotionAddEditComponent } from './quantity-promotion-add-edit.component';

describe('QuantityPromotionAddEditComponent', () => {
  let component: QuantityPromotionAddEditComponent;
  let fixture: ComponentFixture<QuantityPromotionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityPromotionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityPromotionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
