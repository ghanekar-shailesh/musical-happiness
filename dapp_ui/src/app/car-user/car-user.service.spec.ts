import { TestBed } from '@angular/core/testing';

import { CarUserService } from './car-user.service';

describe('CarUserService', () => {
  let service: CarUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
