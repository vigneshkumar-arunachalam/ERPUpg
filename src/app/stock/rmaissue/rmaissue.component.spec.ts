import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMAIssueComponent } from './rmaissue.component';

describe('RMAIssueComponent', () => {
  let component: RMAIssueComponent;
  let fixture: ComponentFixture<RMAIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMAIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RMAIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
