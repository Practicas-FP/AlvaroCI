import { TestBed } from '@angular/core/testing';

import { PhotoFireService } from './photo-fire.service';

describe('PhotoFireService', () => {
  let service: PhotoFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
