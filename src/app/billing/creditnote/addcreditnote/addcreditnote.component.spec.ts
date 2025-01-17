import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcreditnoteComponent } from './addcreditnote.component';

describe('AddcreditnoteComponent', () => {
  let component: AddcreditnoteComponent;
  let fixture: ComponentFixture<AddcreditnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcreditnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcreditnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
