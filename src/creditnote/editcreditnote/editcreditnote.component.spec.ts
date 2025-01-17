import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcreditnoteComponent } from './editcreditnote.component';

describe('EditcreditnoteComponent', () => {
  let component: EditcreditnoteComponent;
  let fixture: ComponentFixture<EditcreditnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcreditnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcreditnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
