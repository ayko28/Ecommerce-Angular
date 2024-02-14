import { TestBed } from '@angular/core/testing';

import { UserExtraService } from './user-extra.service';

describe('UserExtraService', () => {
  let service: UserExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
