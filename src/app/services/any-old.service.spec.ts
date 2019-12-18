import { TestBed } from '@angular/core/testing';

import { AnyOldService } from './any-old.service';

describe('AnyOldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyOldService = TestBed.get(AnyOldService);
    expect(service).toBeTruthy();
  });
});
