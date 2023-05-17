//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract StreamLoot is ERC1155 {
    address public factory;
    address public owner;
    address public streamerAddr;
    uint256 public streamerId;
    // @Notice: mapping for token ID to token mint history
    mapping(uint256 => mapping(address => bool)) public mintedBefore;
    enum Tokens {
        FT,
        NFT1,
        NFT2,
        NFT3
    }

    // uint256 public constant TOKEN = 0;
    // uint256 public constant NFT1 = 1;
    // uint256 public constant NFT2 = 2;
    // uint256 public constant NFT3 = 3;

    constructor()
        // TODO: set correct URIs
        ERC1155("https://streamloot.xyz/api/streamer/item/{id}.json")
    {
        factory = msg.sender;
    }

    function initialize(
        address _owner,
        address _streamerAddr,
        uint256 _streamerId
    ) public {
        require(msg.sender == factory, "StreamLoot: NOT_FACTORY");
        owner = _owner;
        streamerAddr = _streamerAddr;
        streamerId = _streamerId;
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes calldata _data,
        bytes calldata _signature
    ) external {
        // TODO: add the streamerId or the address of this contract into the sig
        require(
            verifySigSingle(_to, _id, _amount, _signature),
            "StreamLoot: INVALID_SIG"
        );
        require(!mintedBefore[_id][_to], "StreamLoot: NFT_MINTED_BEFORE");
        mintedBefore[_id][_to] = true;
        _mint(_to, _id, _amount, _data);
    }

    function mintBatch(
        address _to,
        uint256[] calldata _ids,
        uint256[] calldata _amounts,
        bytes calldata _data,
        bytes calldata _signature
    ) external {
        // TODO: add the streamerId or the address of this contract into the sig
        require(
            verifySigBatch(_to, _ids, _amounts, _signature),
            "StreamLoot: INVALID_SIG"
        );
        for (uint256 i = 0; i < _ids.length; i++) {
            if (_ids[i] != 0)
                require(
                    !mintedBefore[_ids[i]][_to],
                    "StreamLoot: NFT_MINTED_BEFORE"
                );
            mintedBefore[_ids[i]][_to] = true;
        }
        _mintBatch(_to, _ids, _amounts, _data);
    }

    function burn(
        address _from,
        uint256 _id,
        uint256 _amount,
        bytes calldata _signature
    ) external {
        require(
            verifySigSingle(_from, _id, _amount, _signature),
            "StreamLoot: INVALID_SIG"
        );
        _burn(_from, _id, _amount);
    }

    function burnBatch(
        address _from,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes calldata _signature
    ) external {
        require(
            verifySigBatch(_from, _ids, _amounts, _signature),
            "StreamLoot: INVALID_SIG"
        );
        _burnBatch(_from, _ids, _amounts);
    }

    function verifySigSingle(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes calldata _signature
    ) private view returns (bool isValid) {
        bytes32 hash = ECDSA.toEthSignedMessageHash(
            keccak256(abi.encodePacked(_to, _id, _amount))
        );
        if (ECDSA.recover(hash, _signature) == owner) isValid = true;
    }

    function verifySigBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes calldata _signature
    ) private view returns (bool isValid) {
        bytes32 hash = ECDSA.toEthSignedMessageHash(
            keccak256(abi.encodePacked(_to, _ids, _amounts))
        );
        if (ECDSA.recover(hash, _signature) == owner) isValid = true;
    }
}
