// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DemoNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIds;
    mapping(uint256 => uint256) private _nftPrices;

    constructor() ERC721("DemoNFT", "DT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _nftPrices[newItemId] = 0.01 ether;

        return newItemId;
    }

    function purchaseNFT(uint256 tokenId)
        public
        payable
        returns (uint256)
    {
        require(_exists(tokenId), "Invalid token");
        require(msg.value >= _nftPrices[tokenId], "Insufficient payment");

        address payable owner = payable(ownerOf(tokenId));

        _transfer(owner, msg.sender, tokenId);
        owner.transfer(msg.value);

        return tokenId;
    }

    function getNFTPrice(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Invalid token");
        return _nftPrices[tokenId];
    }

    function setNFTPrice(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Invalid token");
        _nftPrices[tokenId] = price;
    }
}
