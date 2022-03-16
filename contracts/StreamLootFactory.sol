//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./StreamLoot.sol";
import "../interfaces/IStreamLoot.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract StreamLootFactory {
    address public owner;
    address[] public allStreamLoots;
    mapping(uint256 => address) public streamerIdToStreamLoot;
    mapping(address => uint256) public streamLootToStreamerId;

    constructor() {
        owner = msg.sender;
    }

    function createStreamLoot(
        address _streamerAddr,
        uint256 _streamerId,
        bytes memory _signature
    ) external returns (address newStreamLoot) {
        require(
            streamerIdToStreamLoot[_streamerId] == address(0),
            "StreamLootFactory: EXISTS"
        );

        // @Notice: ensures the server approved the creation
        bytes32 hash = ECDSA.toEthSignedMessageHash(
            keccak256(abi.encodePacked(_streamerAddr, _streamerId))
        );
        address signer = ECDSA.recover(hash, _signature);
        require(signer == owner, "StreamLootFactory: INVALID_SIG");

        // @Notice: uses CREATE2 for deterministic StreamerLoot addresses
        bytes memory bytecode = type(StreamLoot).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_streamerId));
        assembly {
            newStreamLoot := create2(
                0,
                add(bytecode, 32),
                mload(bytecode),
                salt
            )
        }
        IStreamLoot(newStreamLoot).initialize(
            owner,
            _streamerAddr,
            _streamerId
        );
        allStreamLoots.push(newStreamLoot);
        streamerIdToStreamLoot[_streamerId] = newStreamLoot;
        streamLootToStreamerId[newStreamLoot] = _streamerId;
        emit StreamLootCreated(newStreamLoot, _streamerAddr, _streamerId);
    }

    function streamLootFor(uint256 _streamerId)
        external
        view
        returns (address streamLoot)
    {
        streamLoot = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xff),
                            address(this),
                            keccak256(abi.encodePacked(_streamerId)),
                            keccak256(type(StreamLoot).creationCode)
                        )
                    )
                )
            )
        );
    }

    event StreamLootCreated(
        address indexed streamLoot,
        address indexed streamerAddr,
        uint256 streamerId
    );
}
