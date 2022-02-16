//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "hardhat/console.sol";

contract StreamLoot is ERC1155 {
    address public factory;
    address public owner;
    address public streamerAddr;
    uint256 public streamerId;
    // pack these?
    uint256 public constant TOKEN = 0;
    uint256 public constant NFT1 = 1;
    uint256 public constant NFT2 = 2;
    uint256 public constant NFT3 = 3;

    // need to store if a userId has been minted a specific NFT id before. Mapping of uint to uint? then need multiple lookups for a batch

    modifier onlyOwner() {
        require(msg.sender == owner, "StreamLoot: NOT_OWNER");
        _;
    }

    constructor()
        ERC1155("https://streamloot.xyz/api/streamer/item/{id}.json")
    {
        factory = msg.sender;
    }

    function initialize(
        address _owner,
        address _streamerAddr,
        uint256 _streamerId
    ) public {
        require(msg.sender == factory, "StreamLoot: FORBIDDEN");
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
        // check for duplicates
        _mint(_to, _id, _amount, _data);
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external onlyOwner {
        // check for duplicates
        _mintBatch(_to, _ids, _amounts, _data);
    }

    function burn(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external onlyOwner {
        _burn(_from, _id, _amount);
    }

    function burnBatch(
        address _from,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external onlyOwner {
        _burnBatch(_from, _ids, _amounts);
    }
}
