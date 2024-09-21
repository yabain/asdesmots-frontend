import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartModalComponent } from './create-part-modal.component';

describe('CreatePartModalComponent', () => {
  let component: CreatePartModalComponent;
  let fixture: ComponentFixture<CreatePartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
