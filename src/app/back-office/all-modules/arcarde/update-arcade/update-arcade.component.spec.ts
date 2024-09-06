import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArcadeComponent } from './update-arcade.component';

describe('UpdateArcadeComponent', () => {
  let component: UpdateArcadeComponent;
  let fixture: ComponentFixture<UpdateArcadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateArcadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateArcadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
