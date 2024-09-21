import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPlayingComponent } from './competition-playing.component';

describe('CompetitionPlayingComponent', () => {
  let component: CompetitionPlayingComponent;
  let fixture: ComponentFixture<CompetitionPlayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionPlayingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
