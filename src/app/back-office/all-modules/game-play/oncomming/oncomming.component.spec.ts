import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OncommingComponent } from './oncomming.component';

describe('OncommingComponent', () => {
  let component: OncommingComponent;
  let fixture: ComponentFixture<OncommingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OncommingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OncommingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
