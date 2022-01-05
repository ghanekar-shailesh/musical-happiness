// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract SubscriptionService {

    string serviceName;
    address owner;
    uint numRequests;

    mapping(address => Subscription) private subscribers;
    mapping(address => mapping(uint256 => bool)) private requestStatus;

    struct Subscription {
        bool exists;
        address subscriber;
        uint expires;
        uint maxAmount; 
    }

    struct PaymentRequest {
        address to;
        bool complete;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Subscription: Not the owner.");
        _;
    }

    constructor(string memory _serviceName) {
        serviceName = _serviceName;
        owner = msg.sender;
    }

    function subscribe(uint _maxAmount) public {
        subscribers[msg.sender] = Subscription({exists: true, subscriber: msg.sender, expires: block.timestamp + 2 weeks, maxAmount: _maxAmount});
    }

    function chargeAmount(uint _numTokens, address _multiSigAddress, address _erc20Address) public onlyOwner {
        require(subscribers[_multiSigAddress].exists, "Subscription: Subscription does not exist.");
        require(subscribers[_multiSigAddress].expires > block.timestamp, "Subscription: Subscription expired.");
        require(subscribers[_multiSigAddress].maxAmount >= _numTokens, "Subscription: Amount threshold breached.");
        uint reqId = numRequests;
        requestStatus[_multiSigAddress][reqId] = false;
        bytes memory transferTxn = abi.encodeWithSignature("transferTokens(address,uint256)", address(this), _numTokens);
        bytes memory multiSigSubmitTxn = abi.encodeWithSignature("submitPaymentRequest(address,string,uint256,uint256,bytes)", _erc20Address, serviceName, reqId, _numTokens, transferTxn);
        (bool success, ) = _multiSigAddress.call{value: 0}(
            multiSigSubmitTxn
        );
        require(success, "Subscription: Txn failed.");
        numRequests += 1;
    }

    function markRequestComplete(address _subscriberAddress, uint256 _reqId) public onlyOwner {
        require(subscribers[_subscriberAddress].exists, "Subscription: Sender not a subscriber.");
        requestStatus[_subscriberAddress][_reqId] = true;
    }

    function getRequestStatus(address _subscriberAddress, uint256 _reqId) public view returns (bool) {
        return requestStatus[_subscriberAddress][_reqId];
    }

}