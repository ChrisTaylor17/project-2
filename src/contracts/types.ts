import { ethers } from 'ethers';

export interface NFTContractConfig {
  address: string;
  abi: string[];
}

export interface NFTContract extends ethers.Contract {
  safeMint(to: string, options?: ethers.PayableOverrides): Promise<ethers.ContractTransaction>;
  balanceOf(owner: string): Promise<bigint>;
  tokenOfOwnerByIndex(owner: string, index: number): Promise<bigint>;
  ownerOf(tokenId: number): Promise<string>;
  tokenURI(tokenId: number): Promise<string>;
}