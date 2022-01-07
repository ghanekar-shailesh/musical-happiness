const CarWallet = artifacts.require('CarWallet');
const ZFToken = artifacts.require('ZFToken');
const SubscriptionService = artifacts.require('SubscriptionService');

module.exports = async function (deployer, network, accounts) {
    let carWallet, zfToken, subService;
    const primaryOwners = [accounts[1]];
    const secondaryOwners = [accounts[2], accounts[3]];

    zfToken = await deployer.deploy(ZFToken, { from: accounts[0] });
    subService = await deployer.deploy(SubscriptionService, 'NTSB', { from: accounts[0] });
    carWallet = await deployer.deploy(CarWallet, primaryOwners, secondaryOwners, { from: accounts[0] });

    const msg = `-----------------------------------
    date: ${new Date().toString()}
    network: ${network}
    CarWallet address: ${CarWallet.address}
    DriveToken address: ${ZFToken.address}
    SubscriptionService address: ${SubscriptionService.address}
    -----------------------------------`

    console.log(msg);
}