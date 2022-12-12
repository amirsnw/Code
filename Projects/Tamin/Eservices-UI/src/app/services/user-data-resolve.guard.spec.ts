import { TestBed, async, inject } from '@angular/core/testing';

import { UserDataResolveGuard } from './user-data-resolve.guard';

describe('UserDataResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataResolveGuard]
    });
  });

  it('should ...', inject([UserDataResolveGuard], (guard: UserDataResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
