import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeSubscribeFormComponent } from './arcade-subscribe-form.component';

describe('ArcadeSubscribeFormComponent', () => {
  let component: ArcadeSubscribeFormComponent;
  let fixture: ComponentFixture<ArcadeSubscribeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcadeSubscribeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeSubscribeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
