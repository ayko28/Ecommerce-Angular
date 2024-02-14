import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayproductpagingComponent } from './displayproductpaging.component';

describe('DisplayproductpagingComponent', () => {
  let component: DisplayproductpagingComponent;
  let fixture: ComponentFixture<DisplayproductpagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayproductpagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayproductpagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
