// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract TollSubscription {

    string serviceName;
    address owner;

    struct Subscription {
        bool exists;
        address subscriber;
        uint expires;
        uint maxAmount; 
    }

    mapping(address => Subscription) public subscribers;

    constructor(address _owner, string memory _serviceName) {
        serviceName = _serviceName;
        owner = _owner;
    }

    function subscribe(uint _maxAmount) public {
        subscribers[msg.sender] = Subscription({exists: true, subscriber: msg.sender, expires: block.timestamp + 2 weeks, maxAmount: _maxAmount});
    }

    function chargeAmount(uint _numTokens, address _multiSigAddress, address _erc20Address) external {
        require(subscribers[_multiSigAddress].exists, "TollSubscription: Subscription does not exist.");
        require(subscribers[_multiSigAddress].expires > block.timestamp, "TollSubscription: Subscription expired.");
        require(subscribers[_multiSigAddress].maxAmount >= _numTokens, "TollSubscription: Amount threshold breached.");
        bytes memory transferTxn = abi.encodeWithSignature("transfer(address,uint256)", address(this), _numTokens);
        bytes memory multiSigSubmitTxn = abi.encodeWithSignature("submitTransaction(address,uint256,bytes)", _erc20Address, 0, transferTxn);
        (bool success, ) = _multiSigAddress.call{value: 0}(
            multiSigSubmitTxn
        );
        require(success, "TollSubscription: Txn failed.");
    }

}