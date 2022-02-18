//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "hardhat/console.sol";

contract StreamLoot is ERC1155 {
    address public factory;
    address public owner;
    address public streamerAddr;
    uint256 public streamerId;
    // Mapping from token ID to token mint history
    mapping(uint256 => mapping(address => bool)) public mintedBefore;
    // pack these?
    uint256 public constant TOKEN = 0;
    uint256 public constant NFT1 = 1;
    uint256 public constant NFT2 = 2;
    uint256 public constant NFT3 = 3;

    modifier onlyOwner() {
        require(msg.sender == owner, "StreamLoot: NOT_OWNER");
        _;
    }

    modifier onlyTokenholder(address _from) {
        require(_from == msg.sender, "StreamLoot: NOT_TOKENHOLDER");
        _;
    }

    constructor()
    // need to set right URI
        ERC1155("https://streamloot.xyz/api/streamer/item/{id}.json")
    {
        factory = msg.sender;
    }

    function initialize(
        address _owner,
        address _streamerAddr,
        uint256 _streamerId
    ) public {
        require(msg.sender == factory, "StreamLoot: NOT_OWNER");
        owner = _owner;
        streamerAddr = _streamerAddr;
        streamerId = _streamerId;
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external onlyOwner {
        if (_id != 0) require(!mintedBefore[_id][_to], "StreamLoot: NFT_MINTED_BEFORE");
        mintedBefore[_id][_to] = true;
        _mint(_to, _id, _amount, _data);
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external onlyOwner {
        uint256 length = _ids.length;
        for (uint i = 0; i < length; i++) {
            if (_ids[i] != 0) require(!mintedBefore[_ids[i]][_to], "StreamLoot: NFT_MINTED_BEFORE");
            mintedBefore[_ids[i]][_to] = true;
        }
        _mintBatch(_to, _ids, _amounts, _data);
    }

    function burn(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external onlyTokenholder(_from) {
        _burn(_from, _id, _amount);
    }

    function burnBatch(
        address _from,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external onlyTokenholder(_from) {
        _burnBatch(_from, _ids, _amounts);
    }
}
