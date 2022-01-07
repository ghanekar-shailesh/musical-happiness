import { Injectable } from '@angular/core';
import { BigNumber, constants, Contract, providers, Wallet } from 'ethers';
import carWalletAbi from 'src/assets/abi/CarWallet.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TxnDashboardService {

  constructor() { }

  formatResponse(resArray: any) {
    let objArray = [];
    for (let i = 0; i < resArray.length; i++) {
      const [carUser, from, amount, executed] = resArray[i];
      const obj = { carUser, from, amount, executed, index: i };
      obj.amount = BigNumber.from(obj.amount.hex).toNumber();
      objArray.push(obj)
    }
    return objArray;
  }

  async fetchPendingPaymentRequests(): Promise<any> {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, provider);
      const res = await carContract.getPaymentRequests({ from: constants.AddressZero });
      let resArray = JSON.parse(JSON.stringify(res));
      const objArray = this.formatResponse(resArray);
      const filteredArray = objArray.filter(obj => !obj.executed);
      return filteredArray;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchExecutedPaymentRequests(): Promise<any> {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, provider);
      const res = await carContract.getPaymentRequests({ from: constants.AddressZero });
      let resArray = JSON.parse(JSON.stringify(res));
      const objArray = this.formatResponse(resArray);
      const filteredArray = objArray.filter(obj => obj.executed);
      return filteredArray;
    } catch (error) {
      console.log(error);
    }
  }

  async approvePaymentRequest(reqIndex: number): Promise<any> {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const wallet = new Wallet(sessionStorage.getItem('pvtKey') as string, provider);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, wallet);
      let res = await carContract.confirmPaymentRequest(reqIndex, environment.overrides);
      res = await res.wait();
      return res;
    } catch (error) {
      alert(error);
    }
  }

  async rejectPaymentRequest(reqIndex: number): Promise<any> {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const wallet = new Wallet(sessionStorage.getItem('pvtKey') as string, provider);
      const carContract = new Contract(environment.contractAddress.carWallet, carWalletAbi.abi, wallet);
      let res = await carContract.revokePaymentConfirmation(reqIndex, environment.overrides);
      res = await res.wait();
      return res;
    } catch (error) {
      alert(error);
    }
  }

}
