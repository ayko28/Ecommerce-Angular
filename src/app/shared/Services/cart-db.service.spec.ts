import { TestBed } from '@angular/core/testing';

import { CartDBService } from './cart-db.service';

describe('CartDBService', () => {
  let service: CartDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
