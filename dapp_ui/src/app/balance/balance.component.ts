import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceService } from './balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  carBalance: number;
  subBalance: number;

  constructor(private balanceService: BalanceService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      alert(`Please log in first.`);
      this.router.navigate(['login']);
    }
    this.fetchBalances();
  }

  async fetchBalances() {
    let { carBal, subBal } = await this.balanceService.fetchBalances();
    this.carBalance = carBal;
    this.subBalance = subBal;
  }
}
