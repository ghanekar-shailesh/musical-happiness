import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TxnDashboardService } from './txn-dashboard.service';

@Component({
  selector: 'app-txn-dashboard',
  templateUrl: './txn-dashboard.component.html',
  styleUrls: ['./txn-dashboard.component.css']
})
export class TxnDashboardComponent implements OnInit {

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
    this.requests = await this.txnService.fetchPendingPaymentRequests();
  }

  async approveRequest(index: number) {
    const res = await this.txnService.approvePaymentRequest(index);
    alert(`Your approval is recorded. Amount will be transferred soon. Transaction hash: ${res.transactionHash}`);
  }

  async denyRequest(index: any) {
    console.log(index);
  }

}
