import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontributionmasterComponent } from './editcontributionmaster.component';

describe('EditcontributionmasterComponent', () => {
  let component: EditcontributionmasterComponent;
  let fixture: ComponentFixture<EditcontributionmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcontributionmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontributionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
