import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarUserService } from './car-user.service';

@Component({
  selector: 'app-car-user',
  templateUrl: './car-user.component.html',
  styleUrls: ['./car-user.component.css']
})
export class CarUserComponent implements OnInit {

  constructor(private router: Router, private carUserService: CarUserService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      alert(`Please log in first.`);
      this.router.navigate(['login']);
    }
  }

  async resetCarUser() {
    const res = await this.carUserService.resetCarUser();
    alert(`Car user is reset. Transaction hash: ${res.transactionHash}`);
  }

  async setCarUser() {
    const res = await this.carUserService.setCarUser();
    alert(`Logged in user is currently using the car. Transaction hash: ${res.transactionHash}`);
  }
}
