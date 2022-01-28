import { TestBed } from '@angular/core/testing';

import { SocialmediaService } from './socialmedia.service';

describe('SocialmediaService', () => {
  let service: SocialmediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialmediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
