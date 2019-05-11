import { TestBed } from '@angular/core/testing';

import { LeaderboardFilterService } from './leaderboard-filter.service';

describe('LeaderboardFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderboardFilterService = TestBed.get(LeaderboardFilterService);
    expect(service).toBeTruthy();
  });
});
