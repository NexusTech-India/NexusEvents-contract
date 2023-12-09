// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";
import "./Manager.sol";

contract Evnt is ERC721A {
    string public contractURI;
    address public evntOrganizer;
    uint256 public startDate;
    uint256 public endDate;
    Manager public manager;
    string public description;
    string public logo;

    constructor(
        address _manager,
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _logo,
        address _evntOrganizer,
        uint256 _startDate,
        uint256 _endDate
    ) ERC721A(_name, _symbol) {
        manager = Manager(_manager);
        evntOrganizer = _evntOrganizer;
        startDate = _startDate;
        endDate = _endDate;
        description = _description;
        logo = _logo;
    }

    modifier onlyEvntOrganizer() {
        require(
            msg.sender == evntOrganizer || msg.sender == address(manager),
            "Only evnt organizer can call this function"
        );
        _;
    }

    function setStartDate(uint256 _startDate) public onlyEvntOrganizer {
        startDate = _startDate;
        manager.updateEvnt(evntOrganizer);
    }

    function setEndDate(uint256 _endDate) public onlyEvntOrganizer {
        endDate = _endDate;
        manager.updateEvnt(evntOrganizer);
    }

    function setDescription(
        string memory _description
    ) public onlyEvntOrganizer {
        description = _description;
        manager.updateEvnt(evntOrganizer);
    }

    function setLogo(string memory _logo) public onlyEvntOrganizer {
        logo = _logo;
        manager.updateEvnt(evntOrganizer);
    }

    function mint(address _to, uint256 _ticketId) public onlyEvntOrganizer {
        _mint(_to, _ticketId);

        for(uint256 i = 0; i < _ticketId; i++) {
            manager.mintTicket(_to, (totalSupply() - 1 - i));
        }
    }
}
