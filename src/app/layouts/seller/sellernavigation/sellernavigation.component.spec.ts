import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellernavigationComponent } from './sellernavigation.component';

describe('SellernavigationComponent', () => {
  let component: SellernavigationComponent;
  let fixture: ComponentFixture<SellernavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellernavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellernavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
