import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidnoteComponent } from './prepaidnote.component';

describe('PrepaidnoteComponent', () => {
  let component: PrepaidnoteComponent;
  let fixture: ComponentFixture<PrepaidnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
