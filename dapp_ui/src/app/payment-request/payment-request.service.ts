import { Injectable } from '@angular/core';
import { Wallet, Contract, providers } from 'ethers';
import subServiceAbi from 'src/assets/abi/Subscription.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestService {

  constructor() { }

  async requestPayment(amount: number, carAddress: string, tokenAddress: string) {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const wallet = new Wallet(sessionStorage.getItem('pvtKey') as string, provider);
      const serviceContract = new Contract(environment.contractAddress.subscriptionServive, subServiceAbi.abi, wallet);
      let res = await serviceContract.chargeAmount(amount, carAddress, tokenAddress, environment.overrides);
      res = await res.wait();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
