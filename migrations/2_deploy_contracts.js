const CarWallet = artifacts.require('CarWallet');
const DriveToken = artifacts.require('DriveToken');
const SubscriptionService = artifacts.require('SubscriptionService');

module.exports = async function (deployer, network, accounts) {
    let carWallet, driveToken, subService;
    const primaryOwners = [accounts[1]];
    const secondaryOwners = [accounts[2], accounts[3]];

    driveToken = await deployer.deploy(DriveToken, { from: accounts[0] });
    subService = await deployer.deploy(SubscriptionService, 'NTSB', { from: accounts[0] });
    carWallet = await deployer.deploy(CarWallet, primaryOwners, secondaryOwners, 2, { from: accounts[0] });

    const msg = `-----------------------------------
    date: ${new Date().toString()}
    network: ${network}
    CarWallet address: ${CarWallet.address}
    DriveToken address: ${DriveToken.address}
    SubscriptionService address: ${SubscriptionService.address}
    -----------------------------------`

    console.log(msg);
}