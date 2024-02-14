import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPromotionAddEditComponent } from './product-promotion-add-edit.component';

describe('ProductPromotionAddEditComponent', () => {
  let component: ProductPromotionAddEditComponent;
  let fixture: ComponentFixture<ProductPromotionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPromotionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPromotionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
