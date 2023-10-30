# THE BOUNTY HUNTER

## How the game works..

This is a simple game.

At the beginning of each new level, you are meant to find the criminal by clicking on door handles to open them. After opening each door, a message will be printed on the right side of the screen indicating hints, or if the criminal has been found.

At the beginning of each level, the player has a number of tries to open the doors and a countdown timer to find the criminal. As the level increases, the number of doors increases, hence making it more difficult to find the criminal.

After finding each criminal, the player is rewarded with some game rewards (USD) which can be claimed for BTY tokens in the rewards section. After catching the level 5 Boss, the player is bestowed with an NFT which can also be minted from the rewards section.

## Functions in the smart contract

This game comprises of two smart contracts:

- One for the Non-fungible BTY collections.
- The other for the in-game ERC-20 BTY tokens.

There are two main functions in these contracts:

1. **PrimarySale**:
   - For the NFT token.
   - Takes in a token id as a parameter.
   - Mints the specified token in the collection to the user's wallet address.
2. **WithdrawTokens**:
   - For the ERC-20 in-game currencies.
   - Withdraws a specified amount of tokens from the smart contract to the user's wallet address.

---

**Note**: This game was built in a hurry and later features will be added soon. Features like a shop, where players can shop for weapons and artifacts to help catch the tougher criminals. Also, users will be able to select particular hunters to hunt with and many more features to come.

I hope you enjoy playing. Have fun!
