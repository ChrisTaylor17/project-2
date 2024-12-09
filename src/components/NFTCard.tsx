import React from 'react';
import { ShoppingCart, Loader2, Check } from 'lucide-react';

interface NFTCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  purchasing: boolean;
  owned: boolean;
  onPurchase: () => Promise<void>;
}

export const NFTCard: React.FC<NFTCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  purchasing,
  owned,
  onPurchase 
}) => {
  return (
    <div className="relative group overflow-hidden rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
      {owned && (
        <div className="absolute top-2 right-2 z-10 bg-green-500/90 text-white px-3 py-1 rounded-full flex items-center gap-1">
          <Check className="w-4 h-4" />
          <span className="text-sm">Owned</span>
        </div>
      )}
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-300">{price} SEP</p>
          </div>
          <button
            onClick={onPurchase}
            disabled={purchasing || owned}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            {purchasing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Buying...</span>
              </>
            ) : owned ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm">Owned</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Buy Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};