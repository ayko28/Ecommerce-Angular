import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycommissionComponent } from './paycommission.component';

describe('PaycommissionComponent', () => {
  let component: PaycommissionComponent;
  let fixture: ComponentFixture<PaycommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaycommissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaycommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
