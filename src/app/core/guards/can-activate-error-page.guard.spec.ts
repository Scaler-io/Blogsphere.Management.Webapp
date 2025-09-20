import { TestBed } from '@angular/core/testing';

import { CanActivateErrorPageGuard } from './can-activate-error-page.guard';

describe('CanActivateErrorPageGuard', () => {
  let guard: CanActivateErrorPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateErrorPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
