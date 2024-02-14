import { TestBed } from '@angular/core/testing';

import { UnitmgtService } from './unitmgt.service';

describe('UnitmgtService', () => {
  let service: UnitmgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitmgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
