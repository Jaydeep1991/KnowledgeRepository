import { TestBed } from '@angular/core/testing';

import { signUpService } from './sign-up.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: signUpService = TestBed.get(signUpService);
    expect(service).toBeTruthy();
  });
});
