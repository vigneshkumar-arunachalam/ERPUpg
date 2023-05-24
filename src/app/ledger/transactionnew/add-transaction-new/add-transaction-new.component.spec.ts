import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionNewComponent } from './add-transaction-new.component';

describe('AddTransactionNewComponent', () => {
  let component: AddTransactionNewComponent;
  let fixture: ComponentFixture<AddTransactionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
