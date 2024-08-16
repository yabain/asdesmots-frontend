import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionItemComponent } from './competition-item.component';

describe('CompetitionItemComponent', () => {
  let component: CompetitionItemComponent;
  let fixture: ComponentFixture<CompetitionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
