import { Injectable } from '@angular/core';
import { BigNumber, constants, Contract, providers } from 'ethers';
import tokenAbi from 'src/assets/abi/DriveToken.json';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  async fetchBalances(): Promise<any> {
    try {
      const provider = new providers.JsonRpcProvider(environment.rpc_provider_url);
      const tokenContract = new Contract(environment.contractAddress.driveToken, tokenAbi.abi, provider);
      let carBal = await tokenContract.balanceOf(environment.contractAddress.carWallet, { from: constants.AddressZero });
      let subBal = await tokenContract.balanceOf(environment.contractAddress.subscriptionServive, { from: constants.AddressZero });
      carBal = Number(BigNumber.from(carBal._hex).toString()) / environment.decimals;
      subBal = Number(BigNumber.from(subBal._hex).toString()) / environment.decimals;
      return { carBal, subBal };
    } catch (error) {
      console.log(error);
    }
  }
}
