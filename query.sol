// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Blockchain {
    struct Block {
        uint index;
        string data;
        uint timestamp;
        bytes32 previousHash;
        bytes32 hash;
    }

    mapping(uint => Block) public blocks;
    uint public latestBlockIndex;

    event NewBlockAdded(uint index, string data, uint timestamp);

    // Function to add a new block to the blockchain
    function addBlock(string memory _data) public {
        bytes32 _previousHash;
        if (latestBlockIndex == 0) {
            // Genesis block, no previous hash
            _previousHash = 0;
        } else {
            _previousHash = blocks[latestBlockIndex].hash;
        }

        bytes32 _hash = keccak256(abi.encodePacked(latestBlockIndex + 1, _data, block.timestamp, _previousHash));

        Block memory newBlock = Block({
            index: latestBlockIndex + 1,
            data: _data,
            timestamp: block.timestamp,
            previousHash: _previousHash,
            hash: _hash
        });

        blocks[latestBlockIndex + 1] = newBlock;
        latestBlockIndex++;

        emit NewBlockAdded(newBlock.index, newBlock.data, newBlock.timestamp);
    }

    // Function to get block details by index
    function getBlock(uint _index) public view returns (uint, string memory, uint, bytes32, bytes32) {
        require(_index <= latestBlockIndex && _index > 0, "Block does not exist");
        Block memory blockData = blocks[_index];
        return (blockData.index, blockData.data, blockData.timestamp, blockData.previousHash, blockData.hash);
    }
}
