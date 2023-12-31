// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./Marketplace.sol";
import "./Evnt.sol";

contract Manager {
    Marketplace public marketplace;
    mapping(address => Evnt) private evnts;

    event EvntCreated(address indexed _owner, address _evnt);
    event EvntUpdated(address indexed _owner, address _evnt);
    event TicketMinted(
        address indexed _owner,
        address _evnt,
        uint256 _ticketId
    );

    constructor() {
        marketplace = new Marketplace(address(this));
    }

    function createEvnt(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _logo,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _age,
        string memory _country,
        bool _codingExp
    ) public returns (address) {
        Evnt newEvnt = new Evnt(
            address(this),
            _name,
            _symbol,
            _description,
            _logo,
            msg.sender,
            _startDate,
            _endDate,
            _age,
            _country,
            _codingExp
        );
        evnts[address(newEvnt)] = newEvnt;

        emit EvntCreated(msg.sender, address(newEvnt));

        return address(newEvnt);
    }

    function getEvent(address _event) public view returns (Evnt) {
        return evnts[_event];
    }

    function setDetails(
        address _evnt,
        string memory _description,
        string memory _logo,
        uint256 _startDate,
        uint256 _endDate
    ) public {
        require(
            msg.sender == address(evnts[_evnt]),
            "Only evnt can call this function"
        );
        evnts[_evnt].setDetails(
            _description,
            _logo,
            _startDate,
            _endDate
        );
    }

    modifier onlyEvnt() {
        require(
            evnts[msg.sender] != Evnt(address(0)),
            "Only evnt can call this function"
        );
        _;
    }

    function mintTicket(address _to, uint256 _ticketId) public onlyEvnt {
        emit TicketMinted(_to, msg.sender, _ticketId);
    }

    function updateEvnt(address orgOwner) public onlyEvnt {
        emit EvntUpdated(orgOwner, msg.sender);
    }
}
