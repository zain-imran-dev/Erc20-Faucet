// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    IERC20 public token;
    uint256 public dripAmount = 100 * 10**18; // 100 tokens
    mapping(address => uint256) public lastClaimBlock;

    event Dripped(address indexed to, uint256 amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function claim() external {
        require(
            lastClaimBlock[msg.sender] < block.number,
            "Already claimed this block."
        );
        require(
            token.balanceOf(address(this)) >= dripAmount,
            "Faucet empty."
        );

        lastClaimBlock[msg.sender] = block.number;
        token.transfer(msg.sender, dripAmount);
        emit Dripped(msg.sender, dripAmount);
    }
}