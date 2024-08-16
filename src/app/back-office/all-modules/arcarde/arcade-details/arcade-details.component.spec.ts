import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeDetailsComponent } from './arcade-details.component';

describe('ArcadeDetailsComponent', () => {
  let component: ArcadeDetailsComponent;
  let fixture: ComponentFixture<ArcadeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcadeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
