import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolepermissionlistComponent } from './rolepermissionlist.component';

describe('RolepermissionlistComponent', () => {
  let component: RolepermissionlistComponent;
  let fixture: ComponentFixture<RolepermissionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolepermissionlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolepermissionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
