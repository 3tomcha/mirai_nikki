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
    address public participant;
    address public verifier;
    mapping(address => bool) public hasVerified;
    IERC20 public goalToken;
    bool public canWithdraw;
    
    modifier onlyOwner() {
        require(msg.sender == goalOwner, "Only goal owner can call this function.");
        _;
    }
    
    modifier onlyParticipant() {
        require(msg.sender == participant, "Only the participant can call this function.");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only the verifier can call this function.");
        _;
    }
    
    constructor(address _goalToken) {
        goalOwner = payable(msg.sender);
        goalToken = IERC20(_goalToken);
    }
    
    function participate(uint256 amount) external {
        require(amount > 0, "Amount should be greater than 0");

        goalToken.transferFrom(msg.sender, address(this), amount);

        goalAmount = amount;
        participant = msg.sender;
    }

    function addVerifier(address _verifier) external {
        require(_verifier != participant, "Verifier cannot be a participant.");
        verifier = _verifier;
    }
    
    function markGoalAchieved() external onlyVerifier {
        hasVerified[participant] = true;
    }
    
    function reset() public {
        delete hasVerified[participant];
        participant = address(0);
        verifier =address(0);
    }

     function withdrawTokens() external onlyParticipant {
        require(hasVerified[participant], "Cannot withdraw tokens at the moment.");
        goalToken.transfer(participant, goalAmount);
    }
}