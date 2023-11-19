import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitlossreportComponent } from './profitlossreport.component';

describe('ProfitlossreportComponent', () => {
  let component: ProfitlossreportComponent;
  let fixture: ComponentFixture<ProfitlossreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitlossreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitlossreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
