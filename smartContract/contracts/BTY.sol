// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BTY is ERC20 {
    constructor(string memory name_,string memory symbol_ )
        ERC20(name_, symbol_)
    {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
    function withdrawTokens(address to, uint256 amount) public  {
    require(balanceOf(address(this)) >= amount, "Not enough tokens in contract");
    _transfer(address(this), to, amount);
}

}
