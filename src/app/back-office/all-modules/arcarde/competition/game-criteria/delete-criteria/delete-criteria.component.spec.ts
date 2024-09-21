import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCriteriaComponent } from './delete-criteria.component';

describe('DeleteCriteriaComponent', () => {
  let component: DeleteCriteriaComponent;
  let fixture: ComponentFixture<DeleteCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
