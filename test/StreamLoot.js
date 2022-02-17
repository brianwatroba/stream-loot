const { expect } = require("chai");
const { keccak256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("StreamLoot.sol", () => {
  let StreamLootFactory,
    StreamLoot,
    owner,
    streamer1,
    streamer2,
    viewer1,
    viewer2;

  let streamer1Id = 71092938;
  let streamer2Id = 67890;

  let resolved;

  const deploy = async () => {
    [owner, streamer1, streamer2, viewer1, viewer2] = await ethers.getSigners();
    StreamLootFactory = await (
      await ethers.getContractFactory("StreamLootFactory")
    )
      .connect(owner)
      .deploy();
    await createStreamLoot(streamer1, streamer1Id);
    const StreamLootAddr = await StreamLootFactory.allStreamLoots(0);
    StreamLoot = await ethers.getContractAt("StreamLoot", StreamLootAddr);
  };

  const createStreamLoot = async (signer, streamerId) => {
    resolved = await StreamLootFactory.connect(owner).createStreamLoot(
      signer.address,
      streamerId
    );
  };

  describe("Deployment", () => {
    beforeEach(async () => await deploy());
    it("Deploys successfully", async () => {
      expect(StreamLootFactory.address).to.be.properAddress;
      // expect(await StreamLoot.owner()).to.equal(owner.address);
    });
    it("Sets correct owner", async () => {
      expect(await StreamLootFactory.owner()).to.equal(owner.address);
      // expect(await StreamLoot.owner()).to.equal(owner.address);
    });
  });

  describe("createStreamLoot()", () => {
    beforeEach(async () => await deploy());
    it("Creates and stores multiple StreamLoots", async () => {
      await createStreamLoot(streamer2, streamer2Id);
      const StreamLootOne = await StreamLootFactory.allStreamLoots(0);
      const StreamLootTwo = await StreamLootFactory.allStreamLoots(1);
      expect(StreamLootOne).to.be.properAddress;
      expect(StreamLootTwo).to.be.properAddress;
      expect(StreamLootOne).to.not.equal(StreamLootTwo);
    });
    it("StreamLoot addresses are deterministic (CREATE2)", async () => {
      const expectedAddr = await StreamLootFactory.streamLootFor(streamer1Id);
      expect(StreamLoot.address).to.equal(expectedAddr);
    });
    it("Fails if: StreamLoot for given streamerId already exists", async () => {
      await expect(createStreamLoot(streamer1, streamer1Id)).to.be.revertedWith(
        "StreamLootFactory: EXISTS"
      );
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
  });
});
