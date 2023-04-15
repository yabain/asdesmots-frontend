import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesreportComponent } from './expensesreport.component';

describe('ExpensesreportComponent', () => {
  let component: ExpensesreportComponent;
  let fixture: ComponentFixture<ExpensesreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
