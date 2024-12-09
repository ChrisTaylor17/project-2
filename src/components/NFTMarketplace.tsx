import React from 'react';
import { NFTCard } from './NFTCard';
import { useNFTOwnership } from '../hooks/useNFTOwnership';
import { useNFTPurchase } from '../hooks/useNFTPurchase';

const FEATURED_NFTS = [
  {
    id: 1,
    name: 'Cosmic Dreamer #1',
    price: '0.01',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
  },
  {
    id: 2,
    name: 'Digital Phoenix #2',
    price: '0.015',
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2'
  },
  {
    id: 3,
    name: 'Neon Warrior #3',
    price: '0.02',
    image: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a'
  }
];

interface NFTMarketplaceProps {
  account: string | null;
}

export const NFTMarketplace: React.FC<NFTMarketplaceProps> = ({ account }) => {
  const { ownedNFTs, loading, setOwnedNFTs } = useNFTOwnership(account);
  const { purchasing, handlePurchase } = useNFTPurchase(account, setOwnedNFTs);

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-bold text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Featured NFTs
        </span>
      </h2>
      
      {loading ? (
        <div className="text-center text-gray-400">
          <p>Loading your NFTs...</p>
        </div>
      ) : ownedNFTs.length > 0 && (
        <div className="text-center text-green-400 bg-green-400/10 p-4 rounded-lg">
          <p>You own {ownedNFTs.length} NFT{ownedNFTs.length !== 1 ? 's' : ''} from this collection!</p>
          <p className="text-sm text-green-300">Token IDs: {ownedNFTs.join(', ')}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_NFTS.map((nft) => (
          <NFTCard
            key={nft.id}
            {...nft}
            purchasing={purchasing === nft.id}
            owned={ownedNFTs.includes(nft.id)}
            onPurchase={() => handlePurchase(nft.id, nft.price)}
          />
        ))}
      </div>
    </div>
  );
};