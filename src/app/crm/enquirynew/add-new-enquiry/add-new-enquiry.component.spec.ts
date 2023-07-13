import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEnquiryComponent } from './add-new-enquiry.component';

describe('AddNewEnquiryComponent', () => {
  let component: AddNewEnquiryComponent;
  let fixture: ComponentFixture<AddNewEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
