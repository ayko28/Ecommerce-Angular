import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustomersPagingComponent } from './display-customers-paging.component';

describe('DisplayCustomersPagingComponent', () => {
  let component: DisplayCustomersPagingComponent;
  let fixture: ComponentFixture<DisplayCustomersPagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCustomersPagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCustomersPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
