import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiRouteService } from './api-route.service';

describe('ApiRouteService', () => {
  let service: ApiRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
