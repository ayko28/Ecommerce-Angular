import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisionPercentsAddEditComponent } from './commision-percents-add-edit.component';

describe('CommisionPercentsAddEditComponent', () => {
  let component: CommisionPercentsAddEditComponent;
  let fixture: ComponentFixture<CommisionPercentsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommisionPercentsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommisionPercentsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
