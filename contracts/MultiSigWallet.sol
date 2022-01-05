// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract CarMultiSigWallet {
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    address[] public primaryOwners;
    address[] public secondaryOwners;
    mapping(address => bool) public isPrimaryOwner;
    mapping(address => bool) public isSecondaryOwner;
    uint public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    // mapping from tx index => owner => bool
    mapping(uint => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isPrimaryOwner[msg.sender] || isSecondaryOwner[msg.sender], "CarMultiSigWallet: Not an owner.");
        _;
    }

    modifier onlyPrimaryOwner() {
        require(isPrimaryOwner[msg.sender], "CarMultiSigWallet: Not an owner.");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    constructor(address[] memory _primaryOwners, address[] memory _secondaryOwners, uint _numConfirmationsRequired) {
        require(_primaryOwners.length > 0, "CarMultiSigWallet: Primary owners required");
        require(_secondaryOwners.length > 0, "CarMultiSigWallet: Secondary owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _primaryOwners.length + _secondaryOwners.length,
            "CarMultiSigWallet: Invalid number of required confirmations"
        );

        for (uint i = 0; i < _primaryOwners.length; i++) {
            address owner = _primaryOwners[i];

            require(owner != address(0), "CarMultiSigWallet: Invalid owner");
            require(!isPrimaryOwner[owner], "CarMultiSigWallet: Owner not unique");

            isPrimaryOwner[owner] = true;
            primaryOwners.push(owner);
        }

        for (uint i = 0; i < _secondaryOwners.length; i++) {
            address owner = _secondaryOwners[i];

            require(owner != address(0), "CarMultiSigWallet: Invalid owner");
            require(!isSecondaryOwner[owner], "CarMultiSigWallet: Owner not unique");

            isSecondaryOwner[owner] = true;
            secondaryOwners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to, // ERC20 address
        uint _value, // 0
        bytes memory _data // transferFrom('multiSigAdd', 'subscriptionAdd', 'amt')
    ) public {
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex)
        public
        onlyPrimaryOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "CarMultiSigWallet: Not enough confirmations."
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "CarMultiSigWallet: Transaction Failed.");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
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
        return transactions.length;
    }

    function getTransaction(uint _txIndex)
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}