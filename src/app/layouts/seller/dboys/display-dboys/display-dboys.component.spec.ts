import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDboysComponent } from './display-dboys.component';

describe('DisplayDboysComponent', () => {
  let component: DisplayDboysComponent;
  let fixture: ComponentFixture<DisplayDboysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDboysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDboysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
