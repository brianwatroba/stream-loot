// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStreamLoot {
    function initialize(
        address _owner,
        address _streamerAddr,
        uint256 _streamerId
    ) external;

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external;

    function burn(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external;

    function burnBatch(
        address _from,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external;
}
