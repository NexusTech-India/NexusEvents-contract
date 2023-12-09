import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { EvntCreated } from "../generated/schema"
import { EvntCreated as EvntCreatedEvent } from "../generated/Manager/Manager"
import { handleEvntCreated } from "../src/manager"
import { createEvntCreatedEvent } from "./manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _owner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _evnt = Address.fromString("0x0000000000000000000000000000000000000001")
    let newEvntCreatedEvent = createEvntCreatedEvent(_owner, _evnt)
    handleEvntCreated(newEvntCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EvntCreated created and stored", () => {
    assert.entityCount("EvntCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EvntCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "EvntCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_evnt",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
