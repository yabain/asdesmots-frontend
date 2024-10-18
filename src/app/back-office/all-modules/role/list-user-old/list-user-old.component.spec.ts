import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserOldComponent } from './list-user-old.component';

describe('ListUserOldComponent', () => {
  let component: ListUserOldComponent;
  let fixture: ComponentFixture<ListUserOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
