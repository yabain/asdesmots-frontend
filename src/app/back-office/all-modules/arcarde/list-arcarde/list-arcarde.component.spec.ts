import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArcardeComponent } from './list-arcarde.component';

describe('ListArcardeComponent', () => {
  let component: ListArcardeComponent;
  let fixture: ComponentFixture<ListArcardeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArcardeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArcardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
