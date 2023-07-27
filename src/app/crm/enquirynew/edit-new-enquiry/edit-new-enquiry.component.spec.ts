import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewEnquiryComponent } from './edit-new-enquiry.component';

describe('EditNewEnquiryComponent', () => {
  let component: EditNewEnquiryComponent;
  let fixture: ComponentFixture<EditNewEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
