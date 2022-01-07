// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZFToken is ERC20 {

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "ZFToken: Sender must be contract owner.");
        _;
    }

    constructor() ERC20("ZF Token", "ZFT") {
        owner = msg.sender;
    }

    function assignTokens(address _accountAddress, uint256 _amount) public onlyOwner {
        _mint(_accountAddress, (_amount * ( 10 ** decimals())));
    }

    function transferTokens(address _accountAddress, uint256 _amount) public {
        bool success = transfer(_accountAddress, (_amount * ( 10 ** decimals())));
        require(success, "ZFToken: Token transfer failed.");
    }

}