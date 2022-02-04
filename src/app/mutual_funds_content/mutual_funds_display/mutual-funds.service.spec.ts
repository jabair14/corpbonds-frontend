import { TestBed } from '@angular/core/testing';

import { MutualFundsService } from './mutual-funds.service';

describe('MutualFundsService', () => {
  let service: MutualFundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualFundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
