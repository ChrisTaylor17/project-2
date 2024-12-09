import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { SEPOLIA_CHAIN_ID } from '../config/networks';

export class NetworkManager {
  private static async ensureEthereum(): Promise<boolean> {
    if (!window.ethereum?.request) {
      toast.error('MetaMask is not properly initialized');
      return false;
    }
    return true;
  }

  static async getCurrentChainId(): Promise<string | null> {
    if (!await this.ensureEthereum()) return null;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return chainId;
    } catch (error) {
      console.error('Error getting chain ID:', error);
      return null;
    }
  }

  static async validateNetwork(provider: ethers.BrowserProvider): Promise<boolean> {
    try {
      const network = await provider.getNetwork();
      const currentChainId = '0x' + network.chainId.toString(16);
      return currentChainId.toLowerCase() === SEPOLIA_CHAIN_ID.toLowerCase();
    } catch (error) {
      console.error('Error validating network:', error);
      return false;
    }
  }

  static async handleNetworkSwitch(chainId: string, config: any): Promise<boolean> {
    if (!await this.ensureEthereum()) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId.toLowerCase() }],
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              ...config,
              chainId: chainId.toLowerCase(),
            }],
          });
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          toast.error('Failed to add network');
          return false;
        }
      }
      console.error('Error switching network:', error);
      toast.error('Failed to switch network');
      return false;
    }
  }
}