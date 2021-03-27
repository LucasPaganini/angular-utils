import { TestBed } from '@angular/core/testing';

import { AngularUtilsService } from './angular-utils.service';

describe('AngularUtilsService', () => {
  let service: AngularUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
