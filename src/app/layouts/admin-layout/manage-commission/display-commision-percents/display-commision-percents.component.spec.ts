import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCommisionPercentsComponent } from './display-commision-percents.component';

describe('DisplayCommisionPercentsComponent', () => {
  let component: DisplayCommisionPercentsComponent;
  let fixture: ComponentFixture<DisplayCommisionPercentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCommisionPercentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCommisionPercentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
