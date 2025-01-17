import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprepaidnoteComponent } from './editprepaidnote.component';

describe('EditprepaidnoteComponent', () => {
  let component: EditprepaidnoteComponent;
  let fixture: ComponentFixture<EditprepaidnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprepaidnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprepaidnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
