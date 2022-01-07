import { TestBed } from '@angular/core/testing';

import { TxnDashboardService } from './txn-dashboard.service';

describe('TxnDashboardService', () => {
  let service: TxnDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TxnDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
