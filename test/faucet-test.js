const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

describe("Faucet + MyToken", function () {
  let token, faucet, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");
    const initialSupply = ethers.parseEther("10000"); // ✅ equivalent to 10,000 * 10^18
    token = await Token.deploy(initialSupply);
    await token.waitForDeployment();

    const Faucet = await ethers.getContractFactory("Faucet");
    faucet = await Faucet.deploy(await token.getAddress());
    await faucet.waitForDeployment();

    // Fund faucet with 1,000 tokens
    const fundAmount = ethers.parseEther("1000");
    await token.transfer(await faucet.getAddress(), fundAmount);
  });

  it("lets a user claim tokens once per block", async () => {
    const dripAmount = ethers.parseEther("100");
    await expect(faucet.connect(user).claim())
      .to.emit(faucet, "Dripped")
      .withArgs(await user.getAddress(), dripAmount);

    await expect(faucet.connect(user).claim.staticCall()).to.be.revertedWith(
      "Already claimed this block."
    );
  });
});
