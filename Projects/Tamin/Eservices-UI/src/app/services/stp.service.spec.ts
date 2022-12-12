import { TestBed, inject } from '@angular/core/testing';

import { StpService } from './stp.service';

describe('StpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StpService]
    });
  });

  it('should be created', inject([StpService], (service: StpService) => {
    expect(service).toBeTruthy();
  }));
});
