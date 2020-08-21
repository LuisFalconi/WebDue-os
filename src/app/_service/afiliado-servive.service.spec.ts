import { TestBed } from '@angular/core/testing';

import { AfiliadoServiveService } from './afiliado-servive.service';

describe('AfiliadoServiveService', () => {
  let service: AfiliadoServiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfiliadoServiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
