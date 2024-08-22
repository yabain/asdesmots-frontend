import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePartModalComponent } from './delete-part-modal.component';

describe('DeletePartModalComponent', () => {
  let component: DeletePartModalComponent;
  let fixture: ComponentFixture<DeletePartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
