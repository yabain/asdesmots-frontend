import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArcardeComponent } from './create-arcarde.component';

describe('CreateArcardeComponent', () => {
  let component: CreateArcardeComponent;
  let fixture: ComponentFixture<CreateArcardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArcardeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateArcardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
