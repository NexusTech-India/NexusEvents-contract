import {
  EvntCreated as EvntCreatedEvent,
  EvntUpdated as EvntUpdatedEvent,
  TicketMinted as TicketMintedEvent
} from "../generated/Manager/Manager"
import { EvntCreated, EvntUpdated, TicketMinted } from "../generated/schema"

export function handleEvntCreated(event: EvntCreatedEvent): void {
  let entity = new EvntCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._evnt = event.params._evnt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEvntUpdated(event: EvntUpdatedEvent): void {
  let entity = new EvntUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._evnt = event.params._evnt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTicketMinted(event: TicketMintedEvent): void {
  let entity = new TicketMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._evnt = event.params._evnt
  entity.quantity = event.params.quantity

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
