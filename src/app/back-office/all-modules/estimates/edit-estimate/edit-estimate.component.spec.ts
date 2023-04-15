import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstimateComponent } from './edit-estimate.component';

describe('EditEstimateComponent', () => {
  let component: EditEstimateComponent;
  let fixture: ComponentFixture<EditEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
