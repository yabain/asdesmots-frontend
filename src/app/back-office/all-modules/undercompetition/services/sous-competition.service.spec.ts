import { TestBed } from '@angular/core/testing';

import { SousCompetitionService } from './sous-competition.service';

describe('SousCompetitionService', () => {
  let service: SousCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SousCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
