// SPDX-License-Identifier: MIT
// this contract cannot change in the future - it cannot be upgraded

// this contract allows for flexbility in adding future variables without having to edit this contract

pragma solidity 0.5.2;

contract Storage {
  mapping (string => uint256) _uintStorage;
  mapping (string => address) _addressStorage;
  mapping (string => bool) _boolStorage;
  mapping (string => string) _stringStorage;
  mapping (string => bytes4) _bytesStorage;
  address public owner;
  bool public _initialized;
}