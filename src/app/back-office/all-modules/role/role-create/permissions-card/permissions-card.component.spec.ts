import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsCardComponent } from './permissions-card.component';

describe('PermissionsCardComponent', () => {
  let component: PermissionsCardComponent;
  let fixture: ComponentFixture<PermissionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
