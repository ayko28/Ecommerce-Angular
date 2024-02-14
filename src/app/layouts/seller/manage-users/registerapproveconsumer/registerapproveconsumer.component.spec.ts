import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterapproveconsumerComponent } from './registerapproveconsumer.component';

describe('RegisterapproveconsumerComponent', () => {
  let component: RegisterapproveconsumerComponent;
  let fixture: ComponentFixture<RegisterapproveconsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterapproveconsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterapproveconsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
