import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EvntCreated,
  EvntUpdated,
  TicketMinted
} from "../generated/Manager/Manager"

export function createEvntCreatedEvent(
  _owner: Address,
  _evnt: Address
): EvntCreated {
  let evntCreatedEvent = changetype<EvntCreated>(newMockEvent())

  evntCreatedEvent.parameters = new Array()

  evntCreatedEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  evntCreatedEvent.parameters.push(
    new ethereum.EventParam("_evnt", ethereum.Value.fromAddress(_evnt))
  )

  return evntCreatedEvent
}

export function createEvntUpdatedEvent(
  _owner: Address,
  _evnt: Address
): EvntUpdated {
  let evntUpdatedEvent = changetype<EvntUpdated>(newMockEvent())

  evntUpdatedEvent.parameters = new Array()

  evntUpdatedEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  evntUpdatedEvent.parameters.push(
    new ethereum.EventParam("_evnt", ethereum.Value.fromAddress(_evnt))
  )

  return evntUpdatedEvent
}

export function createTicketMintedEvent(
  _owner: Address,
  _evnt: Address,
  quantity: BigInt
): TicketMinted {
  let ticketMintedEvent = changetype<TicketMinted>(newMockEvent())

  ticketMintedEvent.parameters = new Array()

  ticketMintedEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam("_evnt", ethereum.Value.fromAddress(_evnt))
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )

  return ticketMintedEvent
}
