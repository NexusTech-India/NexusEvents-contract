import {
    ItemBought as ItemBoughtEvent,
    ItemCanceled as ItemCanceledEvent,
    ItemListed as ItemListedEvent
} from "../generated/Marketplace/Marketplace"
import { Event, Ticket } from "../generated/schema";

export function handleItemBought(event: ItemBoughtEvent): void {
    let ev = Event.load(event.params.nftAddress)
    let ticket = Ticket.load(event.params.nftAddress.toHexString() + "-" + event.params.tokenId.toString())

    if (ev != null && ticket != null) {
        ticket.owner = event.params.buyer
        ticket.state = "Sold"
        ticket.nftAddress = event.params.nftAddress
        ticket.tokenId = event.params.tokenId
        ticket.event = ev.id
        ticket.price = event.params.price
        ticket.save()
    }
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
    let ev = Event.load(event.params.nftAddress)
    let ticket = Ticket.load(event.params.nftAddress.toHexString() + "-" + event.params.tokenId.toString())

    if (ev != null && ticket != null) {
        ticket.owner = ev.organizer;
        ticket.seller = ev.organizer;
        ticket.state = "Available"
        ticket.nftAddress = event.params.nftAddress
        ticket.tokenId = event.params.tokenId
        ticket.event = ev.id
        ticket.save()
    }
}

export function handleItemListed(event: ItemListedEvent): void {
    let ev = Event.load(event.params.nftAddress)
    let ticket = Ticket.load(event.params.nftAddress.toHexString() + "-" + event.params.tokenId.toString())

    if (!ticket) ticket = new Ticket(event.params.nftAddress.toHexString() + "-" + event.params.tokenId.toString())

    if (ev != null && ticket != null) {
        ticket.owner = ev.organizer;
        ticket.seller = event.params.seller;
        ticket.price = event.params.price;
        ticket.nftAddress = event.params.nftAddress;
        ticket.tokenId = event.params.tokenId;
        ticket.event = ev.id;
        ticket.state = "Available"
        ticket.save()
    }
}