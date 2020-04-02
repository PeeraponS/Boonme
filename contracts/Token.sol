pragma solidity ^0.5.0;

import "./ERC20.sol";
import "./ERC20Detailed.sol";


contract Token is ERC20, ERC20Detailed {
    constructor() public ERC20Detailed("BoonmeCoin", "BMC", 0) {
        _mint(msg.sender, 1000000);
    }
}
