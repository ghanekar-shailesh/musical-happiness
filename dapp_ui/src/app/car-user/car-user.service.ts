import { Injectable } from '@angular/core';
import { Contract, providers, Wallet } from 'ethers';
import carWalletAbi from 'src/assets/abi/CarWallet.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarUserService {

  constructor() { }

  async setCarUser() {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const wallet = new Wallet(sessionStorage.getItem('pvtKey') as string, provider);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, wallet);
      let res = await carContract.setCurrentCarUser(environment.overrides);
      res = await res.wait();
      return res;
    } catch (error) {
      alert(error);
    }
  }

  async resetCarUser() {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const wallet = new Wallet(sessionStorage.getItem('pvtKey') as string, provider);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, wallet);
      let res = await carContract.resetCurrentCarUser(environment.overrides);
      res = await res.wait();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
