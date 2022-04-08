import { TestBed } from '@angular/core/testing';

import { FavoritosApiService } from './favoritos-api.service';

describe('FavoritosApiService', () => {
  let service: FavoritosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
