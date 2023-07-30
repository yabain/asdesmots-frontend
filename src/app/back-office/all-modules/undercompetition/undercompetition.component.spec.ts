import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndercompetitionComponent } from './undercompetition.component';

describe('UndercompetitionComponent', () => {
  let component: UndercompetitionComponent;
  let fixture: ComponentFixture<UndercompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndercompetitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndercompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
