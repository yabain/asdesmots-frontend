import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemsComponent } from './invoice-items.component';

describe('InvoiceItemsComponent', () => {
  let component: InvoiceItemsComponent;
  let fixture: ComponentFixture<InvoiceItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
