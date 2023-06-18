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
    uint256 public participantsCount;
    uint256 public verifiersCount;
    mapping(address => bool) public participants;
    mapping(address => bool) public verifiers;
    mapping(address => bool) public hasVerified;
    IERC20 public goalToken;

    struct Participant {
        uint256 amount;
        bool participated;
    }

    modifier onlyOwner() {
        require(
            msg.sender == goalOwner,
            "Only goal owner can call this function."
        );
        _;
    }

    modifier onlyParticipants() {
        require(
            participants[msg.sender],
            "Only participants can call this function."
        );
        _;
    }

    modifier onlyVerifiers() {
        require(
            verifiers[msg.sender],
            "Only verifiers can call this function."
        );
        _;
    }

    constructor(address _goalToken) {
        goalOwner = payable(msg.sender);
        participants[goalOwner] = true;
        goalToken = IERC20(_goalToken);
    }

    function participate(uint256 amount) external {
        require(amount > 0, "Amount should be greater than 0");

        participants[msg.sender].amount = amount;
        participants[msg.sender].participated = true;
    }
}
