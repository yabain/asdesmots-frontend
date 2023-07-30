import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserArcardeComponent } from './list-user-arcarde.component';

describe('ListUserArcardeComponent', () => {
  let component: ListUserArcardeComponent;
  let fixture: ComponentFixture<ListUserArcardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserArcardeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserArcardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
