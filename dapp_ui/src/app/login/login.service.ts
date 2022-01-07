import { Injectable } from '@angular/core';
import { Wallet } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async importWallet(pvtKey: string) {
    sessionStorage.setItem('pvtKey', pvtKey);
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    sessionStorage.removeItem('pvtKey');
    sessionStorage.removeItem('isLoggedIn');
  }
}
