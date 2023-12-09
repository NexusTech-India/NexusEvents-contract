import { ethers } from "hardhat";

async function main() {
  console.log("Deploying contracts...");
  const [deployer] = await ethers.getSigners();
  console.log("delpoyer")
  const EventsManager = await ethers.getContractFactory("Manager", deployer);
  console.log("got EventManager")
  const eventsManager = await EventsManager.deploy();
  console.log("Did deploy()")
  await eventsManager.waitForDeployment();
  console.log("Did waitForDeployment()")

  console.log("Deploying contracts with the account: ", deployer.address);
  console.log("EventsManager deployed to: ", await eventsManager.getAddress());
  console.log("Marketplace   deployed to: ", await eventsManager.marketplace());

  const tickets = async (eventAddr: string) => {
    const eventContract = await ethers.getContractAt("Evnt", eventAddr, deployer)
    console.log("Minting 5 tickets ")
    const mintTx = await eventContract.mint(deployer.address, 2)
    await mintTx.wait()
    console.log("Tickets minted")

    //Putting the tickets for sale
    console.log("Putting the 3 tickets for sale")
    const marketplace = await ethers.getContractAt("Marketplace", await eventsManager.marketplace(), deployer)

    const putForSaleTx = await marketplace.listBulkItems(eventAddr, [1], 100)
    await putForSaleTx.wait()
    console.log("1 Tickets are put for sale at price: 100")
  }

  //@ts-ignore
  eventsManager.once("EvntCreated", (owner: string, event: string) => {
    console.log("Event address: ", event)
    tickets(event)
  })

  //Create a new event
  console.log("Creating a new event")
  const createEventTx = await eventsManager.createEvnt(
    "ETH India 2023",
    "ETH",
    "ETH India 2023 is a hackathon for developers, designers, and entrepreneurs to learn, build and teach the Ethereum community about the applications of Ethereum to India's social and economic problems.",
    "QmeBSHYuYf6JBymaxrsTW5ZjesSrLECtifX9sW8X3KgFmD",
    new Date("2023-12-08").getTime(),
    new Date("2023-12-10").getTime(),
    1,
    "India",
    true
  )
  await createEventTx.wait()
  console.log("Event created")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});