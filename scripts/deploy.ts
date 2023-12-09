import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const EventsManager = await ethers.getContractFactory("Manager", deployer);
  const eventsManager = await EventsManager.deploy();
  await eventsManager.waitForDeployment();

  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("EventsManager deployed to: ", await eventsManager.getAddress());
  console.log("Marketplace   deployed to: ", await eventsManager.marketplace());

  const tickets = async (eventAddr: string) => {
    const eventContract = await ethers.getContractAt("Evnt", eventAddr, deployer)
    console.log("Minting 1 ticket ")
    const mintTx = await eventContract.mint(deployer.address, 1)
    await mintTx.wait()
    console.log("Ticket minted")

    console.log("Bulk Minting 5 tickets for the Event")
    const bulkMintTx = await eventContract.bulkMint(deployer.address, 5)
    await bulkMintTx.wait()
    console.log("Tickets minted")

    //Putting the tickets for sale
    console.log("Putting the 1+3 tickets for sale")
    const marketplace = await ethers.getContractAt("Marketplace", await eventsManager.marketplace(), deployer)

    const purOneTx = await marketplace.listItem(eventAddr, 1, 100);
    await purOneTx.wait()
    console.log("Ticket 1 is put for sale at price: 100")

    const putForSaleTx = await marketplace.listBulkItems(eventAddr, [4, 2, 3], 100)
    await putForSaleTx.wait()
    console.log("3 Tickets are put for sale at price: 100")
  }

  //@ts-ignore
  eventsManager.once("EvntCreated", (owner: string, event: string) => {
    console.log("Event address: ", event)
    tickets(event)
  })

  //Create a new event
  const createEventTx = await eventsManager.createEvnt(
    "ETH India 2023",
    "ETH",
    "ETH India 2023 is a hackathon for developers, designers, and entrepreneurs to learn, build and teach the Ethereum community about the applications of Ethereum to India's social and economic problems.",
    "QmeBSHYuYf6JBymaxrsTW5ZjesSrLECtifX9sW8X3KgFmD",
    new Date("2023-12-08").getTime(),
    new Date("2023-12-10").getTime(),
  )
  await createEventTx.wait()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});