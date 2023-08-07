import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompetitionComponent } from './create-competition.component';

describe('CreateCompetitionComponent', () => {
  let component: CreateCompetitionComponent;
  let fixture: ComponentFixture<CreateCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
