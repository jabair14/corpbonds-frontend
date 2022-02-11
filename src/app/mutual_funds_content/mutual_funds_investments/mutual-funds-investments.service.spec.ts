import { TestBed } from '@angular/core/testing';

import { MutualFundsInvestmentsService } from './mutual-funds-investments.service';

describe('MutualFundsInvestmentsService', () => {
  let service: MutualFundsInvestmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualFundsInvestmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
