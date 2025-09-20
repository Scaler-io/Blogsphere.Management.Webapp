import { TestBed } from '@angular/core/testing';

import { ApiSubscriptionService } from './api-subscription.service';

describe('ApiSubscriptionService', () => {
  let service: ApiSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
