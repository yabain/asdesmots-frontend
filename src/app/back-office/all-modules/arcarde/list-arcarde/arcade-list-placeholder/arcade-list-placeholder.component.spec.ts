import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeListPlaceholderComponent } from './arcade-list-placeholder.component';

describe('ArcadeListPlaceholderComponent', () => {
  let component: ArcadeListPlaceholderComponent;
  let fixture: ComponentFixture<ArcadeListPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcadeListPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
