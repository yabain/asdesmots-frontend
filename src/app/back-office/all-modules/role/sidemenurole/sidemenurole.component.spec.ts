import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuroleComponent } from './sidemenurole.component';

describe('SidemenuroleComponent', () => {
  let component: SidemenuroleComponent;
  let fixture: ComponentFixture<SidemenuroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuroleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidemenuroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
