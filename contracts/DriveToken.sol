// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DriveToken is ERC20 {

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "DriveToken: Sender must be contract owner.");
        _;
    }

    constructor() ERC20("Drive Token", "DVT") {
        owner = msg.sender;
    }

    function assignTokens(address _accountAddress, uint256 _amount) public onlyOwner {
        _mint(_accountAddress, (_amount * 10^decimals()));
    }

    function transferTokens(address _accountAddress, uint256 _amount) public {
        bool success = transfer(_accountAddress, (_amount * 10^decimals()));
        require(success, "DriveToken: Token transfer failed.");
    }

}
