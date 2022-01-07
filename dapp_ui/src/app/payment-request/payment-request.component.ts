import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentRequestService } from './payment-request.service';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {

  constructor(private paymentRequestService: PaymentRequestService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      alert('Please log in first.');
      this.router.navigate(['login']);
    }
  }

  async requestPayment(amount: string, carAddress: string, tokenAddress: string) {
    const res = await this.paymentRequestService.requestPayment(parseInt(amount), carAddress, tokenAddress);
    alert(`Request for payment submitted successfully. transaction hash: ${res.transactionHash}`)
  }

}
