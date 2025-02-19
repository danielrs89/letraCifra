import { TestBed } from '@angular/core/testing';

import { LongestWordService } from './longest-word.service';

describe('LongestWordService', () => {
  let service: LongestWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongestWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
