const { expect } = require("chai");
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
    await StreamLootFactory.connect(owner).createStreamLoot(
      signer.address,
      streamerId
    );
  };

  describe("Deployment", () => {
    beforeEach(async () => await deploy());
    it("Deploys successfully", async () => {
      expect(StreamLoot.address).to.be.properAddress;
    });
    it("Sets correct owner", async () => {
      expect(await StreamLoot.owner()).to.equal(owner.address);
    });
  });

  describe("initialize()", () => {
    beforeEach(async () => await deploy());
    it("Fails if: not factory", async () => {
      await expect(
        StreamLoot.connect(streamer1).initialize(
          streamer1.address,
          streamer1.address,
          streamer1Id
        )
      ).to.be.revertedWith("StreamLoot: NOT_OWNER");
    });
  });

  describe("mint()", () => {
    beforeEach(async () => await deploy());
    it("Creates token successfully", async () => {
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(0);
      await StreamLoot.connect(owner).mint(
        streamer1.address,
        0,
        200,
        ethers.utils.formatBytes32String("")
      );
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(200);
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(0);
      await StreamLoot.connect(owner).mint(
        streamer1.address,
        1,
        1,
        ethers.utils.formatBytes32String("")
      );
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(1);
    });
    it("Fails if: NFTs already minted for given userId", async () => {});
    it("Fails if: not owner", async () => {
      await expect(
        StreamLoot.connect(streamer1).mint(
          streamer1.address,
          1,
          1,
          ethers.utils.formatBytes32String("")
        )
      ).to.be.revertedWith("StreamLoot: NOT_OWNER");
    });
  });

  describe("mintBatch()", () => {
    beforeEach(async () => await deploy());
    it("Creates multiple tokens at once successfully", async () => {});
    it("Fails if: any NFTs already minted for given userId", async () => {});
    it("Fails if: not owner", async () => {
      await expect(
        StreamLoot.connect(streamer1).mintBatch(
          streamer1.address,
          [1],
          [1],
          ethers.utils.formatBytes32String("")
        )
      ).to.be.revertedWith("StreamLoot: NOT_OWNER");
    });
  });
});
