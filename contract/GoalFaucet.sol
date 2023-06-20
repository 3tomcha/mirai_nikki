// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);
}

contract GoalFaucet {
    IERC20 public goalToken;
    constructor(address _goalToken) {
        goalToken = IERC20(_goalToken);
    }
    function withdrawTokens(uint256 amount) public {
        goalToken.transfer(msg.sender, amount);
    }
}