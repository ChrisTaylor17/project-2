import { toast } from 'react-hot-toast';
import { NetworkManager } from './network';
import { WalletEventManager } from './events';

export class MetaMaskService {
  private static async ensureEthereum(): Promise<boolean> {
    const installed = typeof window !== 'undefined' && Boolean(window.ethereum?.request);
    if (!installed) {
      toast.error('Please install MetaMask to use this application');
    }
    return installed;
  }

  static async requestAccounts(): Promise<string[]> {
    if (!await this.ensureEthereum()) {
      throw new Error('MetaMask not installed');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      return accounts;
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('Please connect your MetaMask wallet');
      }
      console.error('Error requesting accounts:', error);
      throw new Error(error.message || 'Failed to connect to MetaMask');
    }
  }

  static async switchNetwork(chainId: string, config: any): Promise<boolean> {
    if (!await this.ensureEthereum()) return false;
    return NetworkManager.handleNetworkSwitch(chainId, config);
  }

  static addAccountsListener(callback: (accounts: string[]) => void): void {
    if (!window.ethereum?.on) return;
    WalletEventManager.addListener('accountsChanged', callback);
  }

  static addChainListener(callback: () => void): void {
    if (!window.ethereum?.on) return;
    WalletEventManager.addListener('chainChanged', callback);
  }

  static removeAccountsListener(callback: (accounts: string[]) => void): void {
    if (!window.ethereum?.removeListener) return;
    WalletEventManager.removeListener('accountsChanged', callback);
  }

  static removeChainListener(callback: () => void): void {
    if (!window.ethereum?.removeListener) return;
    WalletEventManager.removeListener('chainChanged', callback);
  }

  static cleanup(): void {
    WalletEventManager.removeAllListeners();
  }
}