import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectddlParametricComponent } from './multiselectddl-parametric.component';

describe('MultiselectddlParametricComponent', () => {
  let component: MultiselectddlParametricComponent;
  let fixture: ComponentFixture<MultiselectddlParametricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectddlParametricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectddlParametricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
