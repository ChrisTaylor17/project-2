import { ethers } from 'ethers';

export const normalizeAddress = (address: string): string => {
  if (!address) {
    throw new Error('Address is required');
  }

  try {
    return ethers.getAddress(address.toLowerCase());
  } catch (error) {
    throw new Error(`Invalid address format: ${address}`);
  }
};

export const isValidAddress = (address: string): boolean => {
  try {
    ethers.getAddress(address.toLowerCase());
    return true;
  } catch {
    return false;
  }
};