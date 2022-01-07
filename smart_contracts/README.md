# ZF-Hackathon smart contracts

Smart contracts for ZF-Hackathon project.

# Steps for testing txn flow

- **Step 0**: Start ganache in background > `nohup ganache-cli -e 100 -a 10 -b 5 -h 0.0.0.0 -d &` and note the PID. To stop the process > `kill -9 <PID>`

- **Step 1**: Deploy three contracts > `truffle migrate --reset`

- **Step 2**: Replace contract addresses in angular project (in environment.ts)

- **Step 2**: Start truffle console > `truffle console`

- **Step 3**: Fetch all accounts > `let acc = await web3.eth.getAccounts()`

- **Step 4**: Get instances of deployed contracts > `let zt = await ZFToken.deployed() / let cw = await CarWallet.deployed()`

- **Step 5**: Call ZFToken.assignTokens(carWalletAddress, 100) to assign 200 tokens to multiSig contract address > `await zt.assignTokens("<CarWallet_address>", 200)`

- **Step 6**: Call CarWallet.subscribe(serviceContractAddress, 50) from primary owner's address to subscribe to the service and set max withdrawal limit to 50 > `await cw.subscribe("<SubscriptionService_address>", 50, {from:acc[1]})`

- **Step 7**: Call CarWallet.setCurrentCarUser() from primary owner's account > `await cw.setCurrentCarUser({from:acc[1]})`

---

# Required keys and addresses

## Private keys:
- Subscription service owner - (0) 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
- Car primary owner - (1) 0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
- Car secondary owner1 -(2) 0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c
- Car secondary owner2 -(3) 0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913

## Contract addresses:
- CarWallet address: 0xC89Ce4735882C9F0f0FE26686c53074E09B0D550
- ZFToken address: 0xCfEB869F69431e42cdB54A4F4f105C19C080A601
- SubscriptionService address: 0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B
