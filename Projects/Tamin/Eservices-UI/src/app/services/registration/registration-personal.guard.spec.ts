import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrationPersonalGuard } from './registration-personal.guard';

describe('RegistrationPersonalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationPersonalGuard]
    });
  });

  it('should ...', inject([RegistrationPersonalGuard], (guard: RegistrationPersonalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
