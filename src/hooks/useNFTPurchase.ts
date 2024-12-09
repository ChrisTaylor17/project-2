import { useState } from 'react';
import { ethers } from 'ethers';
import { getNFTContract, checkNFTOwnership } from '../contracts/nftContract';
import { normalizeAddress, isValidAddress } from '../utils/addressUtils';
import { ProviderManager } from '../utils/provider';
import { TransactionToast } from '../components/toast/TransactionToast';
import toast from 'react-hot-toast';

export const useNFTPurchase = (account: string | null, onSuccess: (owned: number[]) => void) => {
  const [purchasing, setPurchasing] = useState<number | null>(null);

  const handlePurchase = async (id: number, price: string) => {
    if (!account || !isValidAddress(account)) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setPurchasing(id);
      const provider = await ProviderManager.getProvider();
      if (!provider) {
        throw new Error('No provider available');
      }

      const signer = await provider.getSigner();
      const checksummedAddress = normalizeAddress(account);
      const contract = getNFTContract(provider).connect(signer);

      const toastId = toast.loading('Initiating purchase...');

      const tx = await contract.safeMint(checksummedAddress, {
        value: ethers.parseEther(price),
        gasLimit: 200000
      });

      toast.loading('Transaction submitted. Waiting for confirmation...', { id: toastId });
      
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        const owned = await checkNFTOwnership(contract, checksummedAddress);
        onSuccess(owned);
        
        toast.success('NFT purchased successfully!', { id: toastId });
        
        toast.custom((t) => (
          <TransactionToast
            txHash={tx.hash}
            contractAddress={contract.target}
            userAddress={checksummedAddress}
          />
        ), { duration: 10000 });
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      const errorMessage = error.reason || error.message || 'Failed to purchase NFT';
      toast.error(errorMessage);
    } finally {
      setPurchasing(null);
    }
  };

  return { purchasing, handlePurchase };
};