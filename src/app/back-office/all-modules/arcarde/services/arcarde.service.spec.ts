import { TestBed } from '@angular/core/testing';

import { ArcardeService } from './arcarde.service';

describe('ArcardeService', () => {
  let service: ArcardeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArcardeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
