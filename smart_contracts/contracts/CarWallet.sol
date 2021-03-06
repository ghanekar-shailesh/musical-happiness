// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract CarWallet {

    event SubmitPaymentRequest(
        address indexed from,
        address indexed to,
        uint indexed txIndex,
        uint amount,
        bytes data
    );
    event ConfirmPaymentRequest(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecutePaymentRequest(address indexed owner, uint indexed txIndex);

    address[] public primaryOwners;
    address[] public secondaryOwners;
    PaymentRequest[] public requests;
    SimplifiedRequest[] public simpleRequests;
    address public currentCarUser;
    bool carInUse;

    mapping(address => bool) public isPrimaryOwner;
    mapping(address => bool) public isSecondaryOwner;
    mapping(uint => mapping(address => bool)) public isConfirmed;
    mapping(address => bool) public subscriptions;

    struct PaymentRequest {
        address to;
        address fromAddress;
        address carUser;
        string fromName;
        uint reqId;
        uint amount;
        bytes data;
        bool executed;
    }

    struct SimplifiedRequest {
        address carUser;
        string fromName;
        uint amount;
        bool executed;
    }

    modifier onlyOwner() {
        require(isPrimaryOwner[msg.sender] || isSecondaryOwner[msg.sender], "CarMultiSigWallet: Not an owner.");
        _;
    }

    modifier onlyPrimaryOwner() {
        require(isPrimaryOwner[msg.sender], "CarMultiSigWallet: Not a primary owner.");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < requests.length, "CarMultiSigWallet: Txn does not exist.");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!requests[_txIndex].executed, "CarMultiSigWallet: Txn already executed.");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "CarMultiSigWallet: Txn already confirmed.");
        _;
    }

    modifier isSubscription() {
        require(subscriptions[msg.sender], "CarMultiSigWallet: Sender's service is not subscribed.");
        _;
    }

    constructor(address[] memory _primaryOwners, address[] memory _secondaryOwners) {
        require(_primaryOwners.length > 0, "CarMultiSigWallet: Primary owners required");
        require(_secondaryOwners.length > 0, "CarMultiSigWallet: Secondary owners required");

        for (uint i = 0; i < _primaryOwners.length; i++) {
            address owner = _primaryOwners[i];

            require(owner != address(0), "CarMultiSigWallet: Invalid owner.");
            require(!isPrimaryOwner[owner], "CarMultiSigWallet: Owner not unique.");

            isPrimaryOwner[owner] = true;
            primaryOwners.push(owner);
        }

        for (uint i = 0; i < _secondaryOwners.length; i++) {
            address owner = _secondaryOwners[i];

            require(owner != address(0), "CarMultiSigWallet: Invalid owner.");
            require(!isSecondaryOwner[owner], "CarMultiSigWallet: Owner not unique.");

            isSecondaryOwner[owner] = true;
            secondaryOwners.push(owner);
        }
    }

    function subscribe(address _serviceAddress, uint _maxAmount) public onlyPrimaryOwner {
        bytes memory subscribeTxn = abi.encodeWithSignature("subscribe(uint256)", _maxAmount);
        (bool success, ) = _serviceAddress.call{value: 0}(
            subscribeTxn
        );
        require(success, "CarMultiSigWallet: Subscription failed.");
        subscriptions[_serviceAddress] = true;
    }

    function setCurrentCarUser() public onlyOwner {
        require(!carInUse , "CarMultiSigWallet: Car already in use.");
        currentCarUser = msg.sender;
        carInUse = true;
    }

    function resetCurrentCarUser() public onlyOwner {
        require(carInUse , "The car is not in use at present.");
        require(msg.sender == currentCarUser , "You are not using the car at present.");

        currentCarUser = address(0);
        carInUse = false;
    }

    function submitPaymentRequest(
        address _to,
        string memory _from,
        uint _reqId,
        uint _amount,
        bytes memory _data
    ) public isSubscription {
        uint txIndex = requests.length;
        requests.push(
            PaymentRequest({
                to: _to,
                fromName: _from,
                carUser: currentCarUser,
                fromAddress: msg.sender,
                reqId: _reqId,
                amount: _amount,
                data: _data,
                executed: false
            })
        );

        simpleRequests.push(
            SimplifiedRequest({
                fromName: _from,
                carUser: currentCarUser,
                amount: _amount,
                executed: false
            })
        );

        emit SubmitPaymentRequest(msg.sender, _to, txIndex, _amount, _data);
    }

    function confirmPaymentRequest(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmPaymentRequest(msg.sender, _txIndex);

        if(isRequestConfirmed(_txIndex)){
            executePaymentRequest(_txIndex);
        }
    }

    function executePaymentRequest(uint _txIndex)
        internal
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        PaymentRequest storage request = requests[_txIndex];
        SimplifiedRequest storage simpleRequest = simpleRequests[_txIndex];

        request.executed = true;
        simpleRequest.executed = true;

        (bool paymentSuccess, ) = request.to.call{value: 0}(
            request.data
        );
        require(paymentSuccess, "CarMultiSigWallet: Payment request failed.");

        emit ExecutePaymentRequest(msg.sender, _txIndex);
    }

    function revokePaymentConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        require(isConfirmed[_txIndex][msg.sender], "CarMultiSigWallet: Request not confirmed.");

        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getPrimaryOwners() public view returns (address[] memory) {
        return primaryOwners;
    }

    function getSecondaryOwners() public view returns (address[] memory) {
        return secondaryOwners;
    }

    function getTransactionCount() public view returns (uint) {
        return requests.length;
    }

    function getPaymentRequest(uint _txIndex)
        public
        view
        returns (
            address to,
            address carUser,
            string memory fromName,
            uint value,
            bool executed
        )
    {
        PaymentRequest storage request = requests[_txIndex];

        return (
            request.to,
            request.carUser,
            request.fromName,
            request.amount,
            request.executed
        );
    }

    function getPaymentRequests() public view returns (SimplifiedRequest[] memory) {
        return simpleRequests;
    }

    function isRequestConfirmed(uint _txIndex) internal view returns (bool) {
        if(primaryOwners[0] == currentCarUser) {
            if(isConfirmed[_txIndex][currentCarUser]){
                return true;
            }
        } else {
            if(isConfirmed[_txIndex][currentCarUser] && isConfirmed[_txIndex][primaryOwners[0]]){
                return true;
            }
        }
        return false;
    }
}