import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlaceHolderComponent } from './game-place-holder.component';

describe('GamePlaceHolderComponent', () => {
  let component: GamePlaceHolderComponent;
  let fixture: ComponentFixture<GamePlaceHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePlaceHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePlaceHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
