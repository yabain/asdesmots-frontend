import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPhotoComponent } from './avatar-photo.component';

describe('AvatarPhotoComponent', () => {
  let component: AvatarPhotoComponent;
  let fixture: ComponentFixture<AvatarPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
