import { TestBed } from '@angular/core/testing';

import { LeidosApiService } from './leidos-api.service';

describe('LeidosApiService', () => {
  let service: LeidosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeidosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
