import { TestBed, async, inject } from '@angular/core/testing';

import { InsuredGuard } from './insured.guard';

describe('InsuredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuredGuard]
    });
  });

  it('should ...', inject([InsuredGuard], (guard: InsuredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
