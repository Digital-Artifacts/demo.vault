// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EncryptedFileAccess {
    address payable public owner;
    uint256 public accessFee;
    mapping(address => bool) public hasPaid;

    event FileAccessGranted(address indexed user);

    constructor(uint256 _accessFee) {
        owner = payable(msg.sender);
        accessFee = _accessFee;
    }

    function payAccessFee() external payable {
        require(msg.value >= accessFee, "Insufficient payment");

        hasPaid[msg.sender] = true;
        emit FileAccessGranted(msg.sender);

        // Transfer excess payment back to the sender
        if (msg.value > accessFee) {
            uint256 refundAmount = msg.value - accessFee;
            payable(msg.sender).transfer(refundAmount);
        }
    }

    function grantAccess() external {
        require(hasPaid[msg.sender], "Access fee not paid");
        // Perform necessary decryption or access to the file here

        // Transfer the access fee to the contract owner
        owner.transfer(accessFee);
    }

    function grantAccessWithToken(address tokenAddress) external {
        require(hasPaid[msg.sender], "Access fee not paid");

        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(msg.sender) >= accessFee, "Insufficient token balance");

        token.transferFrom(msg.sender, owner, accessFee);
        emit FileAccessGranted(msg.sender);
    }
}
