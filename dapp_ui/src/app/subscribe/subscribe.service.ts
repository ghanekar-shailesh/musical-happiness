import { Injectable } from '@angular/core';
import { Wallet, Contract, providers } from 'ethers';
import carWalletAbi from 'src/assets/abi/CarWallet.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor() { }

  async subscribeToService(address: string, amount: number) {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const wallet = new Wallet(sessionStorage.getItem('pvtKey') as string, provider);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, wallet);
      let res = await carContract.subscribe(address, amount, environment.overrides);
      res = await res.wait();
      return res;
    } catch (error) {
      alert(error);
    }
  }

}
