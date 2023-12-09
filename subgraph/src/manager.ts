import {
  EvntCreated as EvntCreatedEvent,
  TicketMinted as TicketMintedEvent,
  EvntUpdated as EvntUpdatedEvent
} from "../generated/Manager/Manager";
import { Evnt } from "../generated/Manager/Evnt";
import { Event, Ticket } from "../generated/schema";

export function handleEvntCreated(event: EvntCreatedEvent): void {
  let entity = new Event(event.params._evnt)

  const contract = Evnt.bind(event.params._evnt)
  entity.name = contract.name()
  entity.description = contract.description()
  entity.logo = contract.logo()
  entity.organizer = contract.evntOrganizer()
  entity.startDate = contract.startDate()
  entity.endDate = contract.endDate()
  entity.evnt = event.params._evnt
  entity.totalTickets = contract.totalSupply()
  entity.createdAt = event.block.timestamp
  entity.save()
}

export function handleTicketMinted(event: TicketMintedEvent): void {
  let ev = Event.load(event.params._evnt)!
  let ticket = Ticket.load(event.params._evnt.toHexString() + "-" + event.params._ticketId.toString())

  if (!ticket) ticket = new Ticket(event.params._evnt.toHexString() + "-" + event.params._ticketId.toString())

  ticket.owner = ev.organizer;
  ticket.nftAddress = event.params._evnt;
  ticket.tokenId = event.params._ticketId;
  ticket.event = ev.id;
  ticket.state = "NotForSale"
  ticket.save()
}

export function handleEvntUpdated(event: EvntUpdatedEvent): void {
  let entity = Event.load(event.params._evnt)
  if(!entity) entity = new Event(event.params._evnt)

  const contract = Evnt.bind(event.params._evnt)
  entity.name = contract.name()
  entity.description = contract.description()
  entity.logo = contract.logo()
  entity.organizer = contract.evntOrganizer()
  entity.startDate = contract.startDate()
  entity.endDate = contract.endDate()
  entity.evnt = event.params._evnt
  entity.totalTickets = contract.totalSupply()
  entity.createdAt = event.block.timestamp
  entity.save()
}