import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadOrderComponent } from './notepad-order.component';

describe('NotepadOrderComponent', () => {
  let component: NotepadOrderComponent;
  let fixture: ComponentFixture<NotepadOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotepadOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotepadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
