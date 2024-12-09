import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from './config';
import { normalizeAddress } from '../utils/addressUtils';
import { NFTContract } from './types';
import { validateProvider } from '../utils/contractUtils';

export const getNFTContract = (provider: ethers.Provider): NFTContract => {
  if (!validateProvider(provider)) {
    throw new Error('Invalid provider');
  }

  try {
    const address = normalizeAddress(CONTRACT_CONFIG.address);
    return new ethers.Contract(
      address,
      CONTRACT_CONFIG.abi,
      provider
    ) as NFTContract;
  } catch (error) {
    console.error('Error creating contract instance:', error);
    throw new Error('Failed to create contract instance');
  }
};

export const checkNFTOwnership = async (
  contract: NFTContract,
  address: string | null
): Promise<number[]> => {
  if (!address) {
    console.log('No address provided for NFT ownership check');
    return [];
  }

  try {
    const checksummedAddress = normalizeAddress(address);
    
    if (!contract.runner) {
      throw new Error('Contract not properly connected');
    }

    const balance = await contract.balanceOf(checksummedAddress);
    const balanceNumber = Number(balance);
    
    if (balanceNumber === 0) {
      return [];
    }

    const ownedTokens: number[] = [];
    const promises = Array.from({ length: balanceNumber }, (_, i) => 
      contract.tokenOfOwnerByIndex(checksummedAddress, i)
        .then(tokenId => ownedTokens.push(Number(tokenId)))
        .catch(error => console.error(`Error fetching token at index ${i}:`, error))
    );
    
    await Promise.all(promises);
    return ownedTokens.sort((a, b) => a - b);
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    return [];
  }
};