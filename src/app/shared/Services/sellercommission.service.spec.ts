import { TestBed } from '@angular/core/testing';

import { SellercommissionService } from './sellercommission.service';

describe('SellercommissionService', () => {
  let service: SellercommissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellercommissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
