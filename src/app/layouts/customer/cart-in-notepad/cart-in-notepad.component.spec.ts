import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInNotepadComponent } from './cart-in-notepad.component';

describe('CartInNotepadComponent', () => {
  let component: CartInNotepadComponent;
  let fixture: ComponentFixture<CartInNotepadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartInNotepadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartInNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
