const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StreamLootFactory.sol", () => {
  let StreamLootFactory;
  let StreamLoot;
  let owner;
  let streamer1;
  let streamer2;
  const streamer1Id = 71092938;
  const streamer2Id = 67890;

  const deploy = async () => {
    [owner, streamer1, streamer2] = await ethers.getSigners();
    StreamLootFactory = await (
      await ethers.getContractFactory("StreamLootFactory")
    )
      .connect(owner)
      .deploy();
    await createStreamLoot(owner, streamer1.address, streamer1Id);
    const StreamLootAddr = await StreamLootFactory.allStreamLoots(0);
    StreamLoot = await ethers.getContractAt("StreamLoot", StreamLootAddr);
  };

  const createStreamLoot = async (signer, streamerAddr, streamerId) => {
    const hashRaw = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [streamerAddr, streamerId]
    );

    const message = ethers.utils.arrayify(hashRaw);
    const sig = await signer.signMessage(message);

    await StreamLootFactory.connect(signer).createStreamLoot(
      streamerAddr,
      streamerId,
      sig
    );
  };

  describe("Deployment", () => {
    beforeEach(async () => await deploy());
    it("Deploys successfully", async () => {
      expect(StreamLootFactory.address).to.be.properAddress;
    });
    it("Sets correct owner", async () => {
      expect(await StreamLootFactory.owner()).to.equal(owner.address);
    });
  });

  describe("createStreamLoot()", () => {
    beforeEach(async () => await deploy());
    it("Creates and stores multiple StreamLoots", async () => {
      await createStreamLoot(owner, streamer2.address, streamer2Id);
      const StreamLootOne = await StreamLootFactory.allStreamLoots(0);
      const StreamLootTwo = await StreamLootFactory.allStreamLoots(1);
      expect(StreamLootOne).to.be.properAddress;
      expect(StreamLootTwo).to.be.properAddress;
      expect(StreamLootOne).to.not.equal(StreamLootTwo);
    });
    it("Populates storage mappings", async () => {
      expect(
        await StreamLootFactory.streamerIdToStreamLoot(streamer1Id)
      ).to.equal(await StreamLootFactory.streamLootFor(streamer1Id));
      expect(
        await StreamLootFactory.streamLootToStreamerId(
          await StreamLootFactory.streamLootFor(streamer1Id)
        )
      ).to.equal(streamer1Id);
    });
    it("StreamLoot addresses are deterministic (CREATE2)", async () => {
      const expectedAddr = await StreamLootFactory.streamLootFor(streamer1Id);
      expect(StreamLoot.address).to.equal(expectedAddr);
    });
    it("Fails if: StreamLoot for given streamerId already exists", async () => {
      await expect(
        createStreamLoot(owner, streamer1.address, streamer1Id)
      ).to.be.revertedWith("StreamLootFactory: EXISTS");
    });
    it("Fails if: Invalid sig provided", async () => {
      const incorrectSig = await owner.signMessage("this is incorrect");
      await expect(
        StreamLootFactory.connect(owner).createStreamLoot(
          streamer2.address,
          streamer2Id,
          incorrectSig
        )
      ).to.be.revertedWith("StreamLootFactory: INVALID SIG");
    });
  });
});
