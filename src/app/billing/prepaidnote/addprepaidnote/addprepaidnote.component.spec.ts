import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprepaidnoteComponent } from './addprepaidnote.component';

describe('AddprepaidnoteComponent', () => {
  let component: AddprepaidnoteComponent;
  let fixture: ComponentFixture<AddprepaidnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprepaidnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprepaidnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
