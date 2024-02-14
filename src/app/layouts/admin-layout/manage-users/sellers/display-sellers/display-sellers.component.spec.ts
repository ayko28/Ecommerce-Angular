import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySellersComponent } from './display-sellers.component';

describe('DisplaySellersComponent', () => {
  let component: DisplaySellersComponent;
  let fixture: ComponentFixture<DisplaySellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySellersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
