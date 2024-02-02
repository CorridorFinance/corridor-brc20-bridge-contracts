// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Erc20Token is ERC20, ERC20Burnable, Ownable {
	uint8 decimal = 18;

	constructor(
		string memory _name,
		string memory _symbol,
		uint8 _decimal
	) ERC20(_name, _symbol) Ownable(msg.sender) {
		decimal = _decimal;
	}

	function decimals() public view virtual override returns (uint8) {
		return decimal;
	}

	// /////////////////// only owner /////////////////// //

	function mint(uint256 value) public virtual onlyOwner {
		_mint(msg.sender, value);
	}

	function mintTo(address account, uint256 value) public virtual onlyOwner {
		_mint(account, value);
	}

	function renounceOwnership() public virtual override onlyOwner {}
}
