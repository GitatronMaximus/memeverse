const { expect } = require("chai");
const { ethers } = require("hardhat");
console.log("ethers:", ethers); // Add this line


describe("MemeVoting", function () {
  let MemeVoting, memeVoting, owner, addr1;

  beforeEach(async function () {
    console.log("ethers:", ethers);
    [owner, addr1] = await ethers.getSigners();
    console.log("Owner address:", owner.address);  
    MemeVoting = await ethers.getContractFactory("MemeVoting");
    memeVoting = await MemeVoting.deploy();
    await memeVoting.deployed();
  });

  it("Should allow a user to submit a meme", async function () {
    await memeVoting.submitMeme("https://example.com/meme1.jpg");

    const meme = await memeVoting.getMeme(1);
    expect(meme.url).to.equal("https://example.com/meme1.jpg");
    expect(meme.votes).to.equal(0);
  });

  it("Should allow a user to vote for a meme", async function () {
    await memeVoting.submitMeme("https://example.com/meme2.jpg");

    await memeVoting.connect(addr1).voteForMeme(1);
    const meme = await memeVoting.getMeme(1);

    expect(meme.votes).to.equal(1);
    expect(await memeVoting.hasVoted(addr1.address, 1)).to.equal(true);
  });

  it("Should prevent double voting", async function () {
    await memeVoting.submitMeme("https://example.com/meme3.jpg");
    await memeVoting.connect(addr1).voteForMeme(1);

    await expect(memeVoting.connect(addr1).voteForMeme(1)).to.be.revertedWith("You have already voted for this meme");
  });
});
