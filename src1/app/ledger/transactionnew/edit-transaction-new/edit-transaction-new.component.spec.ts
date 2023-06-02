import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionNewComponent } from './edit-transaction-new.component';

describe('EditTransactionNewComponent', () => {
  let component: EditTransactionNewComponent;
  let fixture: ComponentFixture<EditTransactionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransactionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
