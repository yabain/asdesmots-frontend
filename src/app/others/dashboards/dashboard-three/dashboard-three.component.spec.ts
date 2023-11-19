import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardThreeComponent } from './dashboard-three.component';

describe('DashboardThreeComponent', () => {
  let component: DashboardThreeComponent;
  let fixture: ComponentFixture<DashboardThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
