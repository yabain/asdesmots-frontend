import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcardeComponent } from './arcarde.component';

describe('ArcardeComponent', () => {
  let component: ArcardeComponent;
  let fixture: ComponentFixture<ArcardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcardeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
