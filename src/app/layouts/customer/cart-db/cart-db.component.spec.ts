import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDbComponent } from './cart-db.component';

describe('CartDbComponent', () => {
  let component: CartDbComponent;
  let fixture: ComponentFixture<CartDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
