// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Erc20Token.sol";

contract Brc20Token is Erc20Token {
	uint32 feeRate = 0;
	uint256 feeValue = 0;
	address feeAddress = address(0);

	event SetFeeRate(address indexed owner, uint32 feeRate);
	event SetFeeValue(address indexed owner, uint256 feeValue);
	event SetFeeAddress(address indexed owner, address feeAddress);
	event ProduceFee(address indexed user, uint256 fee);

	constructor(
		string memory _name,
		string memory _symbol,
		uint8 _decimal,
		uint32 _feeRate,
		uint256 _feeValue,
		address _feeAddress
	) Erc20Token(_name, _symbol, _decimal) {
		_setFeeRate(_feeRate);
		_setFeeValue(_feeValue);
		_setFeeAddress(_feeAddress);
	}

	function send(address _to, uint256 _value) public returns (bool) {
		require(feeValue <= _value, "send value too small");
		require(address(0) != _to, "send to empty address not allow");
		require(msg.sender != _to, "send to self not allow");

		uint256 fee = (_value * feeRate) / 10000;
		if (fee < feeValue) {
			fee = feeValue;
		}
		uint256 value = _value - fee;

		if (address(0) == feeAddress || 0 == fee) {
			return transfer(_to, _value);
		}

		if (transfer(feeAddress, fee)) {
			emit ProduceFee(_to, fee);

			return transfer(_to, value);
		}

		return false;
	}

	function getFeeRate() external view returns (uint32) {
		return feeRate;
	}

	function getFeeValue() external view returns (uint256) {
		return feeValue;
	}

	// /////////////////// only owner /////////////////// //

	function setFeeRate(uint32 _feeRate) external onlyOwner {
		_setFeeRate(_feeRate);
	}

	function _setFeeRate(uint32 _feeRate) internal {
		require(_feeRate >= 0 && _feeRate <= 10000, "invalid fee rate range");

		emit SetFeeRate(msg.sender, _feeRate);
		feeRate = _feeRate;
	}

	function setFeeValue(uint256 _feeValue) external onlyOwner {
		_setFeeValue(_feeValue);
	}

	function _setFeeValue(uint256 _feeValue) internal {
		emit SetFeeValue(msg.sender, _feeValue);

		feeValue = _feeValue;
	}

	function setFeeAddress(address _feeAddress) external onlyOwner {
		_setFeeAddress(_feeAddress);
	}

	function _setFeeAddress(address _feeAddress) internal {
		require(_feeAddress != address(0), "empty fee address");
		require(_feeAddress != feeAddress, "address the same not change");

		emit SetFeeAddress(msg.sender, _feeAddress);
		feeAddress = _feeAddress;
	}
}
