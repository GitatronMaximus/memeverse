// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MemeVoting {
    struct Meme {
        uint256 id;
        string url;
        uint256 votes;
        address submitter;
    }

    uint256 public memeCount;
    mapping(uint256 => Meme) public memes;
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    event MemeSubmitted(uint256 indexed id, string url, address indexed submitter);
    event MemeVoted(uint256 indexed id, uint256 votes);

    function submitMeme(string memory _url) public {
        require(bytes(_url).length > 0, "Meme URL cannot be empty");

        memeCount++;
        memes[memeCount] = Meme(memeCount, _url, 0, msg.sender);

        emit MemeSubmitted(memeCount, _url, msg.sender);
    }

    function voteForMeme(uint256 _id) public {
        require(_id > 0 && _id <= memeCount, "Meme does not exist");
        require(!hasVoted[msg.sender][_id], "You have already voted for this meme");

        memes[_id].votes++;
        hasVoted[msg.sender][_id] = true;

        emit MemeVoted(_id, memes[_id].votes);
    }

    function getMeme(uint256 _id) public view returns (Meme memory) {
        require(_id > 0 && _id <= memeCount, "Meme does not exist");
        return memes[_id];
    }
}
