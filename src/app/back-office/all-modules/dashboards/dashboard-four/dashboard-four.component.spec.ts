import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFourComponent } from './dashboard-four.component';

describe('DashboardFourComponent', () => {
  let component: DashboardFourComponent;
  let fixture: ComponentFixture<DashboardFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
