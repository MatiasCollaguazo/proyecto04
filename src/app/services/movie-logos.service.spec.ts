import { TestBed } from '@angular/core/testing';

import { MovieLogosService } from './movie-logos.service';

describe('MovieLogosService', () => {
  let service: MovieLogosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieLogosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
