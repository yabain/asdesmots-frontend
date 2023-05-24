import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressIndeterminateComponent } from './progress-indeterminate.component';

describe('ProgressIndeterminateComponent', () => {
  let component: ProgressIndeterminateComponent;
  let fixture: ComponentFixture<ProgressIndeterminateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressIndeterminateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndeterminateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
