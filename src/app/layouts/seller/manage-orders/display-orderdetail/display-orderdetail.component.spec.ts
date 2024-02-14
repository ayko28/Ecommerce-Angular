import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrderdetailComponent } from './display-orderdetail.component';

describe('DisplayOrderdetailComponent', () => {
  let component: DisplayOrderdetailComponent;
  let fixture: ComponentFixture<DisplayOrderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOrderdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
