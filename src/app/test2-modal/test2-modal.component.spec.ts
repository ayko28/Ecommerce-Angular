import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2ModalComponent } from './test2-modal.component';

describe('Test2ModalComponent', () => {
  let component: Test2ModalComponent;
  let fixture: ComponentFixture<Test2ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test2ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Test2ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
