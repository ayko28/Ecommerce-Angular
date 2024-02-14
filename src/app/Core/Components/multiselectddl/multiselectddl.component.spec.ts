import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectddlComponent } from './multiselectddl.component';

describe('MultiselectddlComponent', () => {
  let component: MultiselectddlComponent;
  let fixture: ComponentFixture<MultiselectddlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectddlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectddlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
