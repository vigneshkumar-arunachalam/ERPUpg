import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquotaionnewsdnComponent } from './addquotaionnewsdn.component';

describe('AddquotaionnewsdnComponent', () => {
  let component: AddquotaionnewsdnComponent;
  let fixture: ComponentFixture<AddquotaionnewsdnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddquotaionnewsdnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquotaionnewsdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
