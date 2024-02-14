import { TestBed } from '@angular/core/testing';

import { SellerareaService } from './sellerarea.service';

describe('SellerareaService', () => {
  let service: SellerareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
