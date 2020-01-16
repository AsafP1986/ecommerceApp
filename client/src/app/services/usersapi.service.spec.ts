import { TestBed } from '@angular/core/testing';

import { UsersapiService } from './usersapi.service';

describe('UsersapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersapiService = TestBed.get(UsersapiService);
    expect(service).toBeTruthy();
  });
});
