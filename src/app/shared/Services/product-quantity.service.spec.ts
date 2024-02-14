import { TestBed } from '@angular/core/testing';

import { ProductQuantityService } from './product-quantity.service';

describe('ProductQuantityService', () => {
  let service: ProductQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
