import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesListComponent } from './estimates-list.component';

describe('EstimatesListComponent', () => {
  let component: EstimatesListComponent;
  let fixture: ComponentFixture<EstimatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
