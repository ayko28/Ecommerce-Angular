import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DboysComponent } from './dboys.component';

describe('DboysComponent', () => {
  let component: DboysComponent;
  let fixture: ComponentFixture<DboysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DboysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DboysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
