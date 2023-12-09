// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class EvntCreated extends ethereum.Event {
  get params(): EvntCreated__Params {
    return new EvntCreated__Params(this);
  }
}

export class EvntCreated__Params {
  _event: EvntCreated;

  constructor(event: EvntCreated) {
    this._event = event;
  }

  get _owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _evnt(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class EvntUpdated extends ethereum.Event {
  get params(): EvntUpdated__Params {
    return new EvntUpdated__Params(this);
  }
}

export class EvntUpdated__Params {
  _event: EvntUpdated;

  constructor(event: EvntUpdated) {
    this._event = event;
  }

  get _owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _evnt(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TicketMinted extends ethereum.Event {
  get params(): TicketMinted__Params {
    return new TicketMinted__Params(this);
  }
}

export class TicketMinted__Params {
  _event: TicketMinted;

  constructor(event: TicketMinted) {
    this._event = event;
  }

  get _owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _evnt(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get quantity(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Manager extends ethereum.SmartContract {
  static bind(address: Address): Manager {
    return new Manager("Manager", address);
  }

  createEvnt(
    _name: string,
    _symbol: string,
    _description: string,
    _logo: string,
    _startDate: BigInt,
    _endDate: BigInt
  ): Address {
    let result = super.call(
      "createEvnt",
      "createEvnt(string,string,string,string,uint256,uint256):(address)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_symbol),
        ethereum.Value.fromString(_description),
        ethereum.Value.fromString(_logo),
        ethereum.Value.fromUnsignedBigInt(_startDate),
        ethereum.Value.fromUnsignedBigInt(_endDate)
      ]
    );

    return result[0].toAddress();
  }

  try_createEvnt(
    _name: string,
    _symbol: string,
    _description: string,
    _logo: string,
    _startDate: BigInt,
    _endDate: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createEvnt",
      "createEvnt(string,string,string,string,uint256,uint256):(address)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_symbol),
        ethereum.Value.fromString(_description),
        ethereum.Value.fromString(_logo),
        ethereum.Value.fromUnsignedBigInt(_startDate),
        ethereum.Value.fromUnsignedBigInt(_endDate)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getEvent(_event: Address): Address {
    let result = super.call("getEvent", "getEvent(address):(address)", [
      ethereum.Value.fromAddress(_event)
    ]);

    return result[0].toAddress();
  }

  try_getEvent(_event: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("getEvent", "getEvent(address):(address)", [
      ethereum.Value.fromAddress(_event)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  marketplace(): Address {
    let result = super.call("marketplace", "marketplace():(address)", []);

    return result[0].toAddress();
  }

  try_marketplace(): ethereum.CallResult<Address> {
    let result = super.tryCall("marketplace", "marketplace():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateEvntCall extends ethereum.Call {
  get inputs(): CreateEvntCall__Inputs {
    return new CreateEvntCall__Inputs(this);
  }

  get outputs(): CreateEvntCall__Outputs {
    return new CreateEvntCall__Outputs(this);
  }
}

export class CreateEvntCall__Inputs {
  _call: CreateEvntCall;

  constructor(call: CreateEvntCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _logo(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _startDate(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _endDate(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class CreateEvntCall__Outputs {
  _call: CreateEvntCall;

  constructor(call: CreateEvntCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class MintTicketCall extends ethereum.Call {
  get inputs(): MintTicketCall__Inputs {
    return new MintTicketCall__Inputs(this);
  }

  get outputs(): MintTicketCall__Outputs {
    return new MintTicketCall__Outputs(this);
  }
}

export class MintTicketCall__Inputs {
  _call: MintTicketCall;

  constructor(call: MintTicketCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get quantity(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MintTicketCall__Outputs {
  _call: MintTicketCall;

  constructor(call: MintTicketCall) {
    this._call = call;
  }
}

export class SetEventEndDateCall extends ethereum.Call {
  get inputs(): SetEventEndDateCall__Inputs {
    return new SetEventEndDateCall__Inputs(this);
  }

  get outputs(): SetEventEndDateCall__Outputs {
    return new SetEventEndDateCall__Outputs(this);
  }
}

export class SetEventEndDateCall__Inputs {
  _call: SetEventEndDateCall;

  constructor(call: SetEventEndDateCall) {
    this._call = call;
  }

  get _event(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _endDate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetEventEndDateCall__Outputs {
  _call: SetEventEndDateCall;

  constructor(call: SetEventEndDateCall) {
    this._call = call;
  }
}

export class SetEvntStartDateCall extends ethereum.Call {
  get inputs(): SetEvntStartDateCall__Inputs {
    return new SetEvntStartDateCall__Inputs(this);
  }

  get outputs(): SetEvntStartDateCall__Outputs {
    return new SetEvntStartDateCall__Outputs(this);
  }
}

export class SetEvntStartDateCall__Inputs {
  _call: SetEvntStartDateCall;

  constructor(call: SetEvntStartDateCall) {
    this._call = call;
  }

  get _event(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _startDate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetEvntStartDateCall__Outputs {
  _call: SetEvntStartDateCall;

  constructor(call: SetEvntStartDateCall) {
    this._call = call;
  }
}

export class UpdateEvntCall extends ethereum.Call {
  get inputs(): UpdateEvntCall__Inputs {
    return new UpdateEvntCall__Inputs(this);
  }

  get outputs(): UpdateEvntCall__Outputs {
    return new UpdateEvntCall__Outputs(this);
  }
}

export class UpdateEvntCall__Inputs {
  _call: UpdateEvntCall;

  constructor(call: UpdateEvntCall) {
    this._call = call;
  }

  get orgOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateEvntCall__Outputs {
  _call: UpdateEvntCall;

  constructor(call: UpdateEvntCall) {
    this._call = call;
  }
}