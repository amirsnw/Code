import { TestBed, inject } from '@angular/core/testing';

import { TaminStaticDataService } from './tamin-static-data.service';

describe('TaminStaticDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaminStaticDataService]
    });
  });

  it('should be created', inject([TaminStaticDataService], (service: TaminStaticDataService) => {
    expect(service).toBeTruthy();
  }));
});
