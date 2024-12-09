import { SEPOLIA_CHAIN_ID, SEPOLIA_CONFIG } from '../config/networks';
import { checkMetaMaskInstalled } from './ethereum';
import { toast } from 'react-hot-toast';

export const switchToSepolia = async (): Promise<boolean> => {
  if (!checkMetaMaskInstalled()) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
    return true;
  } catch (error: any) {
    // If the chain hasn't been added to MetaMask
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [SEPOLIA_CONFIG],
        });
        return true;
      } catch (addError: any) {
        console.error('Error adding Sepolia network:', addError);
        toast.error(addError.message || 'Failed to add Sepolia network');
        return false;
      }
    }
    
    console.error('Error switching to Sepolia:', error);
    toast.error(error.message || 'Failed to switch network');
    return false;
  }
};

export const getCurrentNetwork = async (): Promise<string | null> => {
  if (!checkMetaMaskInstalled()) return null;
  
  try {
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    });
    return chainId;
  } catch (error: any) {
    console.error('Error getting network:', error);
    toast.error(error.message || 'Failed to get current network');
    return null;
  }
};