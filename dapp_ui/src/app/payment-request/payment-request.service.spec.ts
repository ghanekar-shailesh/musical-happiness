import { TestBed } from '@angular/core/testing';

import { PaymentRequestService } from './payment-request.service';

describe('PaymentRequestService', () => {
  let service: PaymentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
