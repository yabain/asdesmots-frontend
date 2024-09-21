import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCretariasComponent } from './list-cretarias.component';

describe('ListCretariasComponent', () => {
  let component: ListCretariasComponent;
  let fixture: ComponentFixture<ListCretariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCretariasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCretariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
