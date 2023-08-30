import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinvoiceDIDComponent } from './editinvoice-did.component';

describe('EditinvoiceDIDComponent', () => {
  let component: EditinvoiceDIDComponent;
  let fixture: ComponentFixture<EditinvoiceDIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditinvoiceDIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinvoiceDIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
