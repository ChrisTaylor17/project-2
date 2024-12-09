import { NFTContractConfig } from './types';

export const CONTRACT_CONFIG: NFTContractConfig = {
  address: '0x1a92cf0b4d14c0640e66c12e901ad2ff413c7e56',
  abi: [
    'function safeMint(address to) public payable returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
    'function balanceOf(address owner) view returns (uint256)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'function setTokenURI(uint256 tokenId, string memory _tokenURI) public',
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)'
  ]
};

export const NFT_METADATA = {
  name: "DecentralBridge NFT",
  description: "A unique digital asset representing ownership in the DecentralBridge ecosystem",
  image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80",
  attributes: [
    {
      trait_type: "Collection",
      value: "Genesis"
    },
    {
      trait_type: "Rarity",
      value: "Rare"
    }
  ]
};