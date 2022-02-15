//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./StreamLoot.sol";
import "../interfaces/IStreamLoot.sol";

contract StreamLootFactory {
    address public owner;
    address[] public allStreamLoots;
    mapping(uint256 => address) public streamerIdToStreamLoot;
    mapping(address => uint256) public streamLootToStreamerId;

    modifier onlyOwner() {
        require(msg.sender == owner, "StreamLoot: Must be owner");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function createStreamLoot(
        address _owner,
        address _streamerAddr,
        uint256 _streamerId
    ) external onlyOwner returns (address newStreamLoot) {
        require(
            streamerIdToStreamLoot[_streamerId] != address(0),
            "StreamLootFactory: EXISTS"
        );
        bytes memory bytecode = type(StreamLoot).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_streamerId));
        // uses CREATE2 for deterministic StreamerLoot addresses
        assembly {
            newStreamLoot := create2(
                0,
                add(bytecode, 32),
                mload(bytecode),
                salt
            )
        }
        IStreamLoot(newStreamLoot).initialize(
            _owner,
            _streamerAddr,
            _streamerId
        );
        allStreamLoots.push(newStreamLoot);
        streamerIdToStreamLoot[_streamerId] = newStreamLoot;
        streamLootToStreamerId[newStreamLoot] = _streamerId;
        emit StreamLootCreated(newStreamLoot, _streamerAddr, _streamerId);
    }

    // not sure if we need this
    function streamLootFor(uint256 _streamerId)
        internal
        view
        returns (address streamLoot)
    {
        streamLoot = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            hex"ff",
                            address(this),
                            keccak256(abi.encodePacked(_streamerId)),
                            type(StreamLoot).creationCode
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
