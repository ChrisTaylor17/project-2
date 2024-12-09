import { useState, useEffect } from 'react';
import { getNFTContract, checkNFTOwnership } from '../contracts/nftContract';
import { isValidAddress } from '../utils/addressUtils';
import { getEthereumProvider } from '../utils/contractUtils';
import toast from 'react-hot-toast';

export const useNFTOwnership = (account: string | null) => {
  const [ownedNFTs, setOwnedNFTs] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOwnedNFTs = async () => {
      if (!account || !isValidAddress(account)) {
        setOwnedNFTs([]);
        return;
      }
      
      setLoading(true);
      try {
        const provider = await getEthereumProvider();
        if (!provider) {
          throw new Error('No provider available');
        }

        const contract = getNFTContract(provider);
        const owned = await checkNFTOwnership(contract, account);
        setOwnedNFTs(owned);
      } catch (error) {
        console.error('Error loading owned NFTs:', error);
        toast.error('Failed to load owned NFTs');
        setOwnedNFTs([]);
      } finally {
        setLoading(false);
      }
    };

    loadOwnedNFTs();
  }, [account]);

  return { ownedNFTs, loading, setOwnedNFTs };
};