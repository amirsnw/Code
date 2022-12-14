import { TestBed, async, inject } from '@angular/core/testing';

import { LogResolver } from './log.resolver';

describe('LogGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogResolver]
    });
  });

  it('should ...', inject([LogResolver], (guard: LogResolver) => {
    expect(guard).toBeTruthy();
  }));
});
