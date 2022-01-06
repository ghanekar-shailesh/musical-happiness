# ZF-Hackathon smart contracts

Smart contracts for ZF-Hackathon project.

# Steps for testing txn flow

- **Step 0**: Start ganache > `ganache-cli -e 100 -a 10 -b 5 -d`
- **Step 1**: Deploy three contracts > `truffle migrate --reset` [from account[0]]
- **Step 2**: Call DriveToken.assignTokens(carWalletAddress, 100) to assign 100 tokens to multiSig contract address [from account[0]]
- **Step 3**: Call CarWallet.subscribe(serviceContractAddress, 10) from primary owner's address to subscribe to the service and set max withdrawal limit to 10 [from account[1]]
- **Step 4**: Call SubscriptionService.chargeAmount(5, carWalletAddress, driveTokenAddress) from owner's account to submit payment request to multiSig [from account[0]]
- **Step 5**: Call CarWallet.confirmPayment(0) from owners' accounts based on number of confirmations required [from account[1/2/3]]
- **Step 6**: Call CarWallet.executePayment(0) from primary owner's account to transfer ERC20 to subscription contract [from account[1]]
- **Step 7**: Call DriveToken.balanceOf(carWalletAddress) and DriveToken.balanceOf(serviceContractAddress) to check if the [from account[0]]

