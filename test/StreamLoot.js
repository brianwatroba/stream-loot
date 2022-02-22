const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StreamLoot.sol", () => {
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

  const mintToken = async (signer, to, id, amount) => {
    return await StreamLoot.connect(signer).mint(
      to,
      id,
      amount,
      ethers.utils.formatBytes32String("")
    );
  };
  const mintTokens = async (signer, to, ids, amounts) => {
    return await StreamLoot.connect(signer).mintBatch(
      to,
      ids,
      amounts,
      ethers.utils.formatBytes32String("")
    );
  };

  const burnToken = async (signer, from, id, amount) => {
    return await StreamLoot.connect(signer).burn(from, id, amount);
  };

  const burnTokens = async (signer, from, ids, amounts) => {
    return await StreamLoot.connect(signer).burnBatch(from, ids, amounts);
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
    it("Mints a token amount successfully", async () => {
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(0);
      await mintToken(owner, streamer1.address, 0, 200);
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(200);
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(0);
      await mintToken(owner, streamer1.address, 1, 1);
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(1);
    });
    it("Fails if: NFTs already minted for given userId", async () => {
      await mintToken(owner, streamer1.address, 1, 1);
      await expect(
        mintToken(owner, streamer1.address, 1, 1)
      ).to.be.revertedWith("StreamLoot: NFT_MINTED_BEFORE");
    });
    it("Fails if: not owner", async () => {
      await expect(
        mintToken(streamer1, streamer1.address, 1, 1)
      ).to.be.revertedWith("StreamLoot: NOT_OWNER");
    });
  });

  describe("mintBatch()", () => {
    beforeEach(async () => await deploy());
    it("Mints multiple token amounts at once successfully", async () => {
      expect(
        await StreamLoot.balanceOfBatch(
          [streamer1.address, streamer1.address, streamer1.address],
          [0, 1, 2]
        )
      ).to.deep.equal([
        ethers.BigNumber.from(0),
        ethers.BigNumber.from(0),
        ethers.BigNumber.from(0),
      ]);
      await mintTokens(owner, streamer1.address, [0, 1, 2], [200, 1, 1]);
      expect(
        await StreamLoot.balanceOfBatch(
          [streamer1.address, streamer1.address, streamer1.address],
          [0, 1, 2]
        )
      ).to.deep.equal([
        ethers.BigNumber.from(200),
        ethers.BigNumber.from(1),
        ethers.BigNumber.from(1),
      ]);
    });
    it("Fails if: any NFTs already minted for given userId", async () => {
      await mintToken(owner, streamer1.address, 1, 1);
      await expect(
        mintTokens(owner, streamer1.address, [0, 1], [200, 1])
      ).to.be.revertedWith("StreamLoot: NFT_MINTED_BEFORE");
    });
    it("Fails if: not owner", async () => {
      await expect(
        mintTokens(streamer1, streamer1.address, [0, 1, 2], [200, 1, 1])
      ).to.be.revertedWith("StreamLoot: NOT_OWNER");
    });
  });

  describe("burn()", () => {
    beforeEach(async () => await deploy());
    it("Burns a token amount successfully", async () => {
      await mintToken(owner, streamer1.address, 1, 1);
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(1);
      await burnToken(streamer1, streamer1.address, 1, 1);
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(0);
    });
    it("Fails if: not tokenholder", async () => {
      await expect(
        burnToken(streamer1, streamer2.address, 1, 1)
      ).to.be.revertedWith("StreamLoot: NOT_TOKENHOLDER");
    });
  });

  describe("burnBatch()", () => {
    beforeEach(async () => await deploy());
    it("Burns multiple token amounts at once successfully", async () => {
      await mintTokens(owner, streamer1.address, [0, 1, 2], [200, 1, 1]);
      expect(
        await StreamLoot.balanceOfBatch(
          [streamer1.address, streamer1.address, streamer1.address],
          [0, 1, 2]
        )
      ).to.deep.equal([
        ethers.BigNumber.from(200),
        ethers.BigNumber.from(1),
        ethers.BigNumber.from(1),
      ]);
      await burnTokens(streamer1, streamer1.address, [0, 1, 2], [200, 1, 1]);
      expect(
        await StreamLoot.balanceOfBatch(
          [streamer1.address, streamer1.address, streamer1.address],
          [0, 1, 2]
        )
      ).to.deep.equal([
        ethers.BigNumber.from(0),
        ethers.BigNumber.from(0),
        ethers.BigNumber.from(0),
      ]);
    });
    it("Fails if: not tokenholder", async () => {
      await expect(
        burnToken(streamer1, streamer2.address, 1, 1)
      ).to.be.revertedWith("StreamLoot: NOT_TOKENHOLDER");
    });
  });
});
