import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterrequestconsumerComponent } from './registerrequestconsumer.component';

describe('RegisterrequestconsumerComponent', () => {
  let component: RegisterrequestconsumerComponent;
  let fixture: ComponentFixture<RegisterrequestconsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterrequestconsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterrequestconsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
