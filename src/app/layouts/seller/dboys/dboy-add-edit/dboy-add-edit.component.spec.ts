import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DboyAddEditComponent } from './dboy-add-edit.component';

describe('DboyAddEditComponent', () => {
  let component: DboyAddEditComponent;
  let fixture: ComponentFixture<DboyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DboyAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DboyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
