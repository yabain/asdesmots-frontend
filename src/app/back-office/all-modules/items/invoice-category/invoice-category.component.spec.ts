import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCategoryComponent } from './invoice-category.component';

describe('InvoiceCategoryComponent', () => {
  let component: InvoiceCategoryComponent;
  let fixture: ComponentFixture<InvoiceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
