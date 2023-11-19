import { TestBed } from '@angular/core/testing';

import { GamePartsService } from './game-parts.service';

describe('GamePartsService', () => {
  let service: GamePartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
