// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";

contract Evnt is ERC721A {
    string public contractURI;
    address public evntOrganizer;
    uint256 public startDate;
    uint256 public endDate;
    string public description;
    string public logo;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _logo,
        address _evntOrganizer,
        uint256 _startDate,
        uint256 _endDate
    ) ERC721A(_name, _symbol) {
        evntOrganizer = _evntOrganizer;
        startDate = _startDate;
        endDate = _endDate;
        description = _description;
        logo = _logo;
    }
}