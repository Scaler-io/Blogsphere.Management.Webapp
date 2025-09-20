import { TestBed } from '@angular/core/testing';

import { ApiClusterService } from './api-cluster.service';

describe('ApiClusterService', () => {
  let service: ApiClusterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiClusterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
