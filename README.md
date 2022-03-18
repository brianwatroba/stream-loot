# Stream Loot 🏆

Decentralized rewards program for Twitch streamers and their communities. Automatically bridges on-Twitch donations and channel subscriptions to tradeable crypto equivalents (tokens and NFTs) on Polygon.

https://www.streamloot.xyz

_Beta launching Spring 2022_

## Background

#### WHY BUILD THIS?

Monetization for Twitch streamers is hard. Viewers are so passionate that they are literally sending their favorite streamers free money (donations). For nothing in return. And they're thrilled to do it.

This begs a question: would viewers support streamers more if they _did get more in return_? In what ways could Twitch's on-platform support methods (donations and channel subscriptions) be enhanced to better match viewers' eagerness to help and connect? What's missing?

_How Twitch on-platform support could be improved:_

1. More customization for each streamer
2. More utility to viewers outside of the Twitch platform. After all, they engage with their favorite streamers across a variety of spaces, both online and real life.

#### OUR SOLUTION

Bolster the existing Twitch streamer support system (donations/subscriptions) by adding a crypto dimension.

Automatically convert donation/subscription events on a Streamer's channel to token and NFT equivalents, which the streamers can customize. Make them tradeable. Give streamers opportunities to use these rewards off of Twitch: in ecommerce, promotions, and events off of Twitch.

## Project North Stars

- Streamers earn more with less effort
- Viewers feel more connected and satisfied with their support
- No fancy crypto stuff. Earning tokens should be as easy as donating on Twitch.

## How it works

1. **Streamers customize and mint their Loot Set (on-chain):** Streamer is authenticated via Twitch Oauth and then can customize their set. Donation events are mapped to a token that streamers can customize name and logo for. Channel subscriptions are mapped to NFTs that streamers can customize name, image, and tenure (awarding after x months subbed). Standard Loot Sets include 1 token and 3 NFTs. Uses ERC1155 token standard to encompass all loot into a single contract. Streamers can decide to mint a portion of tokens for themselves at initial contract creation.
2. **Server listens for and saves on-Twitch donation and sub events (centralized):** after minting their Loot Set, Streamers provide necessary Twitch API eventsub permissions so our server can begin listening for events and logging them. All donation and channel subscription events are saved to a centralized database and not minted on chain yet.
3. **Viewers mint their rewards when they'd like:** viewers can log into Stream Loot (via Twitch Oauth) to view their current Stream Loot--both minted and un-minted. If a viewer chooses, they can mint any available Stream Loot by making a server request (which signs the transaction with a private key), and in turn call mint()/mintBatch() on the Stream Loot Polygon smart contract. The contract verifies the signature, and mints the Stream Loot if all conditions are met.
4. **Viewers are free to trade and spend rewards:** viewers can interact with and swap their loot directly with the on-chain contracts. Stream Loot also provides a front end for easy contract interaction.

## Structure

![Project structure](https://streamloot.s3.us-east-2.amazonaws.com/streamlootstructure.png)

## Contract addresses

#### Polygon (Main Net)

- _StreamLootFactory.sol:_ TBD
- _StreamLoot.sol:_ TBD

#### Test (Polygon - Mumbai)

- _StreamLootFactory.sol:_ TBD
- _StreamLoot.sol:_ TBD

## Local setup

1. Clone repository: `git clone https://github.com/brianwatroba/stream-loot.git`
2. Install base project dependencies: cd into root, run `npm install`
3. Add local .env file to project root. Include below env variables (replace keys with your own):

```bash
/.env

ALCHEMY_API_KEY=XXX
POLYGON_PRIVATE_KEY=xxx
```

## Usage

1. Front end (on localhost): finish this later
2. Local testing: tests written in Chai/Mocha using Hardhat/Ethers.js. Run `npx hardhat test` for test suite.
3. Deployment to Polygon Test (Mumbai): ensure your .env file includes your Rinkeby private key. Then run `npx hardhat run scripts/deploy.js --network polygon-mumbai`. Deploy script only deploys the ProjectFactory.sol contract.
4. Deployment to other test nets: add your desired network to the `networks` object in `hardhat-config.js` using the following format:

```javascript
/hardhat.config.js

polygon: {
      url: `https://polygon-mumbai.g.alchemy.com/v2${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.POLYGON_TEST_PRIVATE_KEY}`],
    },
```

## Contributing

Pull requests are welcome. Thanks for your interest!

## License

[MIT](https://choosealicense.com/licenses/mit/)
