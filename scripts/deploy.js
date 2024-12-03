const hre = require("hardhat");

async function main() {
  const MemeVoting = await hre.ethers.getContractFactory("MemeVoting");
  const memeVoting = await MemeVoting.deploy();

  await memeVoting.deployed();

  console.log("MemeVoting contract deployed to:", memeVoting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
