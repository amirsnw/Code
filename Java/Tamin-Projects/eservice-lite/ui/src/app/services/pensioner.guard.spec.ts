import { TestBed, async, inject } from '@angular/core/testing';

import { PensionerGuard } from './pensioner.guard';

describe('PensionerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PensionerGuard]
    });
  });

  it('should ...', inject([PensionerGuard], (guard: PensionerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
