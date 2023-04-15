import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllModulesComponent } from './all-modules.component';

describe('AllModulesComponent', () => {
  let component: AllModulesComponent;
  let fixture: ComponentFixture<AllModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllModulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
