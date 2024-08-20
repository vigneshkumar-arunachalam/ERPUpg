import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CstreportComponent } from './cstreport.component';

describe('CstreportComponent', () => {
  let component: CstreportComponent;
  let fixture: ComponentFixture<CstreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CstreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CstreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
