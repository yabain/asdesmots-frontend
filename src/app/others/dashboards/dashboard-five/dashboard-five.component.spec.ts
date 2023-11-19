import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFiveComponent } from './dashboard-five.component';

describe('DashboardFiveComponent', () => {
  let component: DashboardFiveComponent;
  let fixture: ComponentFixture<DashboardFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
