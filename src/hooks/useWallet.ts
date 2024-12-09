import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { SEPOLIA_CHAIN_ID, SEPOLIA_CONFIG } from '../config/networks';
import { MetaMaskService } from '../utils/metamask';
import { ProviderManager } from '../utils/provider';
import { NetworkManager } from '../utils/network';

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  const checkNetwork = useCallback(async () => {
    const provider = await ProviderManager.getProvider();
    if (!provider) return false;

    const correct = await NetworkManager.validateNetwork(provider);
    setIsCorrectNetwork(correct);
    return correct;
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);

      const switched = await MetaMaskService.switchNetwork(SEPOLIA_CHAIN_ID, SEPOLIA_CONFIG);
      if (!switched) {
        setLoading(false);
        return;
      }

      const accounts = await MetaMaskService.requestAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const networkCorrect = await checkNetwork();
        if (networkCorrect) {
          toast.success('Connected to MetaMask on Sepolia!');
        }
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setIsCorrectNetwork(false);
    ProviderManager.resetProvider();
    MetaMaskService.cleanup();
    toast.success('Disconnected from MetaMask');
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  }, [disconnectWallet]);

  const handleChainChanged = useCallback(() => {
    checkNetwork();
  }, [checkNetwork]);

  useEffect(() => {
    const initializeWallet = async () => {
      const provider = await ProviderManager.getProvider();
      if (!provider) return;

      try {
        const accounts = await MetaMaskService.requestAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await checkNetwork();
        }
      } catch (error) {
        console.error('Error initializing wallet:', error);
      }
    };

    initializeWallet();

    MetaMaskService.addAccountsListener(handleAccountsChanged);
    MetaMaskService.addChainListener(handleChainChanged);

    return () => {
      MetaMaskService.removeAccountsListener(handleAccountsChanged);
      MetaMaskService.removeChainListener(handleChainChanged);
      MetaMaskService.cleanup();
    };
  }, [handleAccountsChanged, handleChainChanged, checkNetwork]);

  return {
    account,
    loading,
    isCorrectNetwork,
    connectWallet,
    disconnectWallet
  };
};