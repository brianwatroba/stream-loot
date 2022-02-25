const { ethers } = require("ethers");
const config = require("config");

// DEV: Hardhat

// const provider = new ethers.providers.JsonRpcProvider();
// const wallet = new ethers.Wallet(config.get("WALLET_PRIVATE_KEY"));
// console.log("in wallet", wallet);

// const deploy = async () => {
//   const StreamLootFactory = await (
//     await ethers.getContractFactory("StreamLootFactory")
//   )
//     .connect(owner)
//     .deploy();
//   await createStreamLoot(streamer1, streamer1Id);
//   const StreamLootAddr = await StreamLootFactory.allStreamLoots(0);
//   const StreamLoot = await ethers.getContractAt("StreamLoot", StreamLootAddr);
// };

// const createStreamLoot = async (signer, streamerId) => {
//   await StreamLootFactory.connect(owner).createStreamLoot(
//     signer.address,
//     streamerId
//   );
// };

// STAGING: Rinkeby

// PROD: POLYGON

// const network = "rinkeby";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
// const provider = ethers.getDefaultProvider(network, {
// etherscan: YOUR_ETHERSCAN_API_KEY,
// infura: YOUR_INFURA_PROJECT_ID,
// Or if using a project secret:
// infura: {
//   projectId: YOUR_INFURA_PROJECT_ID,
//   projectSecret: YOUR_INFURA_PROJECT_SECRET,
// },
// alchemy: config.get("ALCHEMY_API_KEY"),
// pocket: YOUR_POCKET_APPLICATION_KEY,
// Or if using an application secret key:
// pocket: {
//   applicationId: ,
//   applicationSecretKey:
// }
// });

// create new provider where it's alchemy: ;
// connect my wallet from .env: const wallet = new ethers.Wallet(config.get("WALLET_PRIVATE_KEY"), provider)
// export wallet

// const signer = provider.getSigner();

module.exports = wallet;
