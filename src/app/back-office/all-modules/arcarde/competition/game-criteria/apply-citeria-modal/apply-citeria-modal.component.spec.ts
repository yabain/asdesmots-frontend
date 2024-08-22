import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCiteriaModalComponent } from './apply-citeria-modal.component';

describe('ApplyCiteriaModalComponent', () => {
  let component: ApplyCiteriaModalComponent;
  let fixture: ComponentFixture<ApplyCiteriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyCiteriaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyCiteriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
