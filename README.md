# Stream Loot 🏆

Decentralized rewards program for Twitch streamers and their communities.

Automatically bridges on-Twitch donations and channel subscriptions to tradeable crypto equivalents (tokens and NFTs) on Polygon.

<br>
<div style="display: flex;">
      <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" height="20" />
      <img src="https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black" height="20" />
      <img src="https://img.shields.io/badge/Base-1652f0?style=for-the-badge&logo=data:image/png;base64,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" height="20" />
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" height="20" />
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="20" />
      <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" height="20" />
      <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" height="20" />
</div>

---

<img src="https://res.cloudinary.com/dfuyisjqi/image/upload/v1684438324/github%20images/streamlootbanner_d8xamy.png" />

## Access

Front end DAPP: https://www.streamloot.xyz

_Beta launching Summer 2023_

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

## Project goals

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
