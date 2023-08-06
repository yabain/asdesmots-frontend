import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadesuscriptionComponent } from './arcadesuscription.component';

describe('ArcadesuscriptionComponent', () => {
  let component: ArcadesuscriptionComponent;
  let fixture: ComponentFixture<ArcadesuscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcadesuscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadesuscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
