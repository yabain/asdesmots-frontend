import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapvectorComponent } from './mapvector.component';

describe('MapvectorComponent', () => {
  let component: MapvectorComponent;
  let fixture: ComponentFixture<MapvectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapvectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapvectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
