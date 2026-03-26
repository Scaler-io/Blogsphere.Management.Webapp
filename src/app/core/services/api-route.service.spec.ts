import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ApiRouteService } from './api-route.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ApiRouteService', () => {
  let service: ApiRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ApiRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
