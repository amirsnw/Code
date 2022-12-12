import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrationRelationGuard } from './registration-relation.guard';

describe('RegistrationRelationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationRelationGuard]
    });
  });

  it('should ...', inject([RegistrationRelationGuard], (guard: RegistrationRelationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
