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

  const mintToken = async (signer, to, id, amount, sig) => {
    return await StreamLoot.connect(signer).mint(
      to,
      id,
      amount,
      ethers.utils.formatBytes32String(""),
      sig
    );
  };
  const mintTokens = async (signer, to, ids, amounts, sig) => {
    return await StreamLoot.connect(signer).mintBatch(
      to,
      ids,
      amounts,
      ethers.utils.formatBytes32String(""),
      sig
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
      ).to.be.revertedWith("StreamLoot: NOT_FACTORY");
    });
  });

  describe("mint()", () => {
    beforeEach(async () => await deploy());
    it("Mints a token amount successfully", async () => {
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(0);

      const hashRaw = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [streamer1.address, 0, 200]
      );
      const message = ethers.utils.arrayify(hashRaw);
      const sig = await owner.signMessage(message);

      await mintToken(owner, streamer1.address, 0, 200, sig);
      expect(await StreamLoot.balanceOf(streamer1.address, 0)).to.equal(200);
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(0);

      const hashRaw2 = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [streamer1.address, 1, 1]
      );
      const message2 = ethers.utils.arrayify(hashRaw2);
      const sig2 = await owner.signMessage(message2);
      await mintToken(owner, streamer1.address, 1, 1, sig2);
      expect(await StreamLoot.balanceOf(streamer1.address, 1)).to.equal(1);
    });
    it("Fails if: NFTs already minted for given userId", async () => {
      const hashRaw = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [streamer1.address, 1, 1]
      );
      const message = ethers.utils.arrayify(hashRaw);
      const sig = await owner.signMessage(message);
      await mintToken(owner, streamer1.address, 1, 1, sig);

      await expect(
        mintToken(owner, streamer1.address, 1, 1, sig)
      ).to.be.revertedWith("StreamLoot: NFT_MINTED_BEFORE");
    });
    it("Fails if: signature is invalid", async () => {
      const hashRaw = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [streamer1.address, 1, 1]
      );
      const message = ethers.utils.arrayify(hashRaw);
      const sig = await owner.signMessage(message);
      await expect(
        mintToken(streamer1, streamer1.address, 2, 1, sig)
      ).to.be.revertedWith("StreamLoot: INVALID_SIG");
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
      const hashRaw = ethers.utils.solidityKeccak256(
        ["address", "uint256[]", "uint256[]"],
        [streamer1.address, [0, 1, 2], [200, 1, 1]]
      );
      const message = ethers.utils.arrayify(hashRaw);
      const sig = await owner.signMessage(message);
      await mintTokens(owner, streamer1.address, [0, 1, 2], [200, 1, 1], sig);
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
      const hashRaw = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [streamer1.address, 1, 1]
      );
      const message = ethers.utils.arrayify(hashRaw);
      const sig = await owner.signMessage(message);
      await mintToken(owner, streamer1.address, 1, 1, sig);
      const hashRaw2 = ethers.utils.solidityKeccak256(
        ["address", "uint256[]", "uint256[]"],
        [streamer1.address, [0, 1], [200, 1]]
      );
      const message2 = ethers.utils.arrayify(hashRaw2);
      const sig2 = await owner.signMessage(message2);
      await expect(
        mintTokens(owner, streamer1.address, [0, 1], [200, 1], sig2)
      ).to.be.revertedWith("StreamLoot: NFT_MINTED_BEFORE");
    });
    it("Fails if: sig is invalid", async () => {
      const hashRaw = ethers.utils.solidityKeccak256(
        ["address", "uint256[]", "uint256[]"],
        [streamer1.address, [0, 1, 2], [200, 1, 1]]
      );
      const message = ethers.utils.arrayify(hashRaw);
      const sig = await owner.signMessage(message);
      await expect(
        mintTokens(streamer1, streamer1.address, [0, 2, 2], [200, 1, 1], sig)
      ).to.be.revertedWith("StreamLoot: INVALID_SIG");
    });
  });

  describe.skip("burn()", () => {
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

  describe.skip("burnBatch()", () => {
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
