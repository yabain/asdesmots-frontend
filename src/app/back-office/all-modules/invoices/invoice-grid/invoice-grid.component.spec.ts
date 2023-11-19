import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGridComponent } from './invoice-grid.component';

describe('InvoiceGridComponent', () => {
  let component: InvoiceGridComponent;
  let fixture: ComponentFixture<InvoiceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
