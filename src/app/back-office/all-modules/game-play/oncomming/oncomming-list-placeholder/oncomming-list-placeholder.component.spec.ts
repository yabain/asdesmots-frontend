import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OncommingListPlaceholderComponent } from './oncomming-list-placeholder.component';

describe('OncommingListPlaceholderComponent', () => {
  let component: OncommingListPlaceholderComponent;
  let fixture: ComponentFixture<OncommingListPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OncommingListPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OncommingListPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
