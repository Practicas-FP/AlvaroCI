import { TestBed } from '@angular/core/testing';

import { DetallesApiService } from './detalles-api.service';

describe('DetallesApiService', () => {
  let service: DetallesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
