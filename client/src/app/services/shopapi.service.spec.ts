import { TestBed } from '@angular/core/testing';

import { ShopapiService } from './shopapi.service';

describe('ShopapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopapiService = TestBed.get(ShopapiService);
    expect(service).toBeTruthy();
  });
});
