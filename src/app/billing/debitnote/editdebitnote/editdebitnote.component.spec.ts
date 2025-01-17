import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdebitnoteComponent } from './editdebitnote.component';

describe('EditdebitnoteComponent', () => {
  let component: EditdebitnoteComponent;
  let fixture: ComponentFixture<EditdebitnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdebitnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdebitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
