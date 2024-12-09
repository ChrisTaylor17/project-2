import { ethers } from 'ethers';

export const validateProvider = (provider: any): boolean => {
  return provider !== null && 
         provider !== undefined && 
         typeof provider.getNetwork === 'function';
};

export const validateContractTransaction = async (
  tx: ethers.ContractTransaction
): Promise<boolean> => {
  try {
    const receipt = await tx.wait();
    return receipt.status === 1;
  } catch {
    return false;
  }
};

export const getEthereumProvider = async (): Promise<ethers.BrowserProvider | null> => {
  if (!window.ethereum) {
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.getNetwork(); // Validate provider is working
    return provider;
  } catch (error) {
    console.error('Error initializing provider:', error);
    return null;
  }
};