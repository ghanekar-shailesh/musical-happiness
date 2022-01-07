import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribeService } from './subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private router: Router, private subscribeService: SubscribeService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      alert('Please log in first.');
      this.router.navigate(['login']);
    }
  }

  async subscribe(serviceAddress: string, maxAmount: string) {
    const res = await this.subscribeService.subscribeToService(serviceAddress, parseInt(maxAmount));
    alert(`Transaction hash: ${res.transactionHash}`);
  }

}
