import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitonTreeComponent } from './competiton-tree.component';

describe('CompetitonTreeComponent', () => {
  let component: CompetitonTreeComponent;
  let fixture: ComponentFixture<CompetitonTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitonTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitonTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
