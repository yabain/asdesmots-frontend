import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCompetitionsComponent } from './sub-competitions.component';

describe('SubCompetitionsComponent', () => {
  let component: SubCompetitionsComponent;
  let fixture: ComponentFixture<SubCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCompetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
