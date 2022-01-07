import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TxnDashboardService } from '../txn-dashboard/txn-dashboard.service';

@Component({
  selector: 'app-txn-history',
  templateUrl: './txn-history.component.html',
  styleUrls: ['./txn-history.component.css']
})
export class TxnHistoryComponent implements OnInit {

  public requests: any;
  public headers = ['from', 'to', 'amount', 'executed'];

  constructor(private router: Router, private txnService: TxnDashboardService) { }

  async ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      alert(`Please log in with primary owner's account first.`);
      this.router.navigate(['login']);
    }
    await this.getPaymentRequests();
  }

  async getPaymentRequests() {
    this.requests = await this.txnService.fetchExecutedPaymentRequests();
  }

}
