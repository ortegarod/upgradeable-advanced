// SPDX-License-Identifier: MIT
pragma solidity 0.5.2;

import "./Storage.sol";

contract DogsUpdated is Storage {

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  constructor() public {
    //owner = msg.sender;
    initialize(msg.sender);
  }

  // only runs function once
  function initialize(address _owner) public {
      require(!_initialized);
      owner = _owner;
      _initialized = true;
  }

  function getNumberOfDogs() public view returns(uint256) {
    return _uintStorage["Dogs"];
  }
  function setNumberOfDogs(uint256 toSet) public onlyOwner {
    _uintStorage["Dogs"] = toSet;
  }

}