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

contract GoalContract {
    address payable public goalOwner;
    uint256 public goalAmount;
    mapping(address => Participant) public participants;
    IERC20 public goalToken;
    mapping(address => bool) public verifiers;
    uint256 public verifiersCount;

    struct Participant {
        uint256 amount;
        bool participated;
    }

    constructor(address _goalToken) {
        goalOwner = payable(msg.sender);
        goalToken = IERC20(_goalToken);
    }

    function participate(uint256 amount) external {
        require(amount > 0, "Amount should be greater than 0");

        goalToken.transferFrom(msg.sender, address(this), amount);

        participants[msg.sender].amount = amount;
        participants[msg.sender].participated = true;
    }

    function addVerifier(address _verifier) external {
        require(!participants[_verifier].participated, "Verifier cannot be a participant.");
        verifiers[_verifier] = true;
        verifiersCount++;
    }
}
