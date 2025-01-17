import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddebitnoteComponent } from './adddebitnote.component';

describe('AdddebitnoteComponent', () => {
  let component: AdddebitnoteComponent;
  let fixture: ComponentFixture<AdddebitnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddebitnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddebitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
