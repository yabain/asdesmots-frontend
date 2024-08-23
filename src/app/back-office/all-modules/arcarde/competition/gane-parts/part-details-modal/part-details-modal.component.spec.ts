import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDetailsModalComponent } from './part-details-modal.component';

describe('PartDetailsModalComponent', () => {
  let component: PartDetailsModalComponent;
  let fixture: ComponentFixture<PartDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
