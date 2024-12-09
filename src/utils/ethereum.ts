import { toast } from 'react-hot-toast';

export const checkMetaMaskInstalled = (): boolean => {
  const isInstalled = typeof window !== 'undefined' && Boolean(window.ethereum);
  if (!isInstalled) {
    toast.error('Please install MetaMask to use this application');
  }
  return isInstalled;
};

export const requestAccounts = async (): Promise<string[]> => {
  if (!checkMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts;
  } catch (error: any) {
    console.error('Error requesting accounts:', error);
    throw new Error(error.message || 'Failed to connect to MetaMask');
  }
};

export const listenToAccountChanges = (callback: (accounts: string[]) => void): void => {
  if (!checkMetaMaskInstalled()) return;

  window.ethereum.on('accountsChanged', callback);
};

export const listenToNetworkChanges = (callback: () => void): void => {
  if (!checkMetaMaskInstalled()) return;

  window.ethereum.on('chainChanged', callback);
};

export const removeNetworkListeners = (callback: () => void): void => {
  if (!checkMetaMaskInstalled()) return;

  window.ethereum.removeListener('chainChanged', callback);
};

export const removeAccountListeners = (callback: (accounts: string[]) => void): void => {
  if (!checkMetaMaskInstalled()) return;

  window.ethereum.removeListener('accountsChanged', callback);
};