import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytestComponent } from './mytest.component';

describe('MytestComponent', () => {
  let component: MytestComponent;
  let fixture: ComponentFixture<MytestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
