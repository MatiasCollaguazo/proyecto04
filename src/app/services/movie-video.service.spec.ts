import { TestBed } from '@angular/core/testing';

import { MovieVideoService } from './movie-video.service';

describe('MovieVideoService', () => {
  let service: MovieVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
