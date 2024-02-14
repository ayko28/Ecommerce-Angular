import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionSettingComponent } from './commission-setting.component';

describe('CommissionSettingComponent', () => {
  let component: CommissionSettingComponent;
  let fixture: ComponentFixture<CommissionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
