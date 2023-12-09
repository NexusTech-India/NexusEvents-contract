import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  const Manager = await ethers.getContractFactory("Manager");
  const manager = await Manager.deploy();
  await manager.waitForDeployment();
  console.log("Manager address:", await manager.getAddress());
  console.log("Marketplace address:", await manager.marketplace());

  //@ts-ignore
  manager.once("EvntCreated", async (owner, _event) => {
    console.log("Event created by:", owner);
    console.log("Event address:", _event);

    const event = await ethers.getContractAt("Evnt", _event, deployer)

    //Mint 5 tickets
    console.log("Minting 5 tickets");
    await event.bulkMint(deployer.address, 5);
    console.log("Tickets minted");

    const marketplace = await ethers.getContractAt("Marketplace", await manager.marketplace(), deployer)

    //Create a new listing of 5 tickets for 0.0000001 ETH
    console.log("Creating a new listing");
    await marketplace.listBulkItems(_event, [1,2,3,4,5], 100000000);
    console.log("Listing created");
  })

  //Create a new Event
  console.log("Creating a new Event");
  let creatingEvent = await manager.createEvnt(
    "Event 1",
    "EVE",
    "Event 1 description. ",
    "https://ipfs.io/ipfs/QmUQJ1H7Z9pZLXo7y7X7hQ7e3Y3m6m7Zx8B7m9w8Y5k2Y1",
    new Date("2023-12-10").getTime(),
    new Date("2023-12-12").getTime(),
  )
  await creatingEvent.wait();
  console.log("Event created");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
