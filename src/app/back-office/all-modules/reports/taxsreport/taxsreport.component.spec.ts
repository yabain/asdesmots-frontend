import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsreportComponent } from './taxsreport.component';

describe('TaxsreportComponent', () => {
  let component: TaxsreportComponent;
  let fixture: ComponentFixture<TaxsreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxsreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
