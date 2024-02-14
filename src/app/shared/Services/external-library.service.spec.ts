import { TestBed } from '@angular/core/testing';

import { ExternalLibraryService } from './external-library.service';

describe('ExternalLibraryService', () => {
  let service: ExternalLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
