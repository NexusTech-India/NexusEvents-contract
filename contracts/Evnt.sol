// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";
import "./Manager.sol";

struct Requirements {
    uint256 age; //0 - No, 1 - Above 18, -1 - Below 18
    string country;
    bool codingExp;
}

contract Evnt is ERC721A {
    string public contractURI;
    address public evntOrganizer;
    uint256 public startDate;
    uint256 public endDate;
    Manager public manager;
    string public description;
    string public logo;
    Requirements public requirements;
    address public admin = 0x777E78C2FBB296c7dF2dfA80402531aDD1624E7d;

    mapping(address => Requirements) private userRequirements;

    constructor(
        address _manager,
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _logo,
        address _evntOrganizer,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _age,
        string memory _country,
        bool _codingExp
    ) ERC721A(_name, _symbol) {
        manager = Manager(_manager);
        evntOrganizer = _evntOrganizer;
        startDate = _startDate;
        endDate = _endDate;
        description = _description;
        logo = _logo;

        requirements = Requirements({
            age: _age,
            country: _country,
            codingExp: _codingExp
        });
    }

    modifier onlyEvntOrganizer() {
        require(
            msg.sender == evntOrganizer || msg.sender == address(manager),
            "Only evnt organizer can call this function"
        );
        _;
    }

    function setDetails(
        string memory _description,
        string memory _logo,
        uint256 _startDate,
        uint256 _endDate
    ) public onlyEvntOrganizer {
        description = _description;
        logo = _logo;
        startDate = _startDate;
        endDate = _endDate;
        manager.updateEvnt(evntOrganizer);
    }

    function mint(address _to, uint256 _ticketId) public onlyEvntOrganizer {
        _mint(_to, _ticketId);

        for (uint256 i = 0; i < _ticketId; i++) {
            manager.mintTicket(_to, (totalSupply() - 1 - i));
        }
    }

    function setRequirements(
        uint256 _age,
        string memory _country,
        bool _codingExp
    ) public onlyEvntOrganizer {
        requirements = Requirements({
            age: _age,
            country: _country,
            codingExp: _codingExp
        });
        manager.updateEvnt(evntOrganizer);
    }

    function setUserRequirements(
        address _user,
        uint256 _age,
        string memory _country,
        bool _codingExp
    ) public {
        require(
            msg.sender == admin,
            "Only admin or user can call this function"
        );
        userRequirements[_user] = Requirements({
            age: _age,
            country: _country,
            codingExp: _codingExp
        });
    }

    function isEligible(address _user) public view returns (bool) {
        Requirements memory userReq = userRequirements[_user];
        //country is not required if its ""
        return
            (userReq.age == requirements.age || requirements.age == 0) &&
            (keccak256(bytes(userReq.country)) ==
                keccak256(bytes(requirements.country)) ||
                keccak256(bytes(requirements.country)) ==
                keccak256(bytes(""))) &&
            (userReq.codingExp == requirements.codingExp ||
                requirements.codingExp == false);
    }
}
