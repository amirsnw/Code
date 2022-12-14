import { TestBed, inject } from '@angular/core/testing';

import { BookletService } from './booklet.service';

describe('BookletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookletService]
    });
  });

  it('should be created', inject([BookletService], (service: BookletService) => {
    expect(service).toBeTruthy();
  }));
});
