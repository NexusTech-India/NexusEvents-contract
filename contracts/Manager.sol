// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Evnt.sol";

contract EvntsManager {
    mapping(address => Evnt) private evnts;

    event EvntCreated(address indexed _owner, address _evnt);
    event EvntUpdated(address indexed _owner, address _evnt);

    function createEvnt(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _logo,
        uint256 _startDate,
        uint256 _endDate
    ) public returns (address) {
        Evnt newEvnt = new Evnt(
//            address(this),
            _name,
            _symbol,
            _description,
            _logo,
            msg.sender,
            _startDate,
            _endDate
        );
        evnts[address(newEvnt)] = newEvnt;

        emit EvntCreated(msg.sender, address(newEvnt));

        return address(newEvnt);
    }

    function getEvent(address _event) public view returns (Evnt) {
        return evnts[_event];
    }

    modifier onlyEvnt() {
        require(
            evnts[msg.sender] != Evnt(address(0)),
            "Only evnt can call this function"
        );
        _;
    }

    function updateEvnt(address orgOwner) public onlyEvnt {
        emit EvntUpdated(orgOwner, msg.sender);
    }
}