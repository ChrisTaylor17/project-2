import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletButtonProps {
  onClick: () => void;
  loading: boolean;
  connected: boolean;
  account?: string | null;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  onClick,
  loading,
  connected,
  account,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 text-white border border-white rounded-full hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
    >
      <Wallet className="w-5 h-5" />
      <span className="text-sm">
        {loading
          ? 'Connecting...'
          : connected
          ? `${account?.slice(0, 6)}...${account?.slice(-4)}`
          : 'Connect Wallet'}
      </span>
    </button>
  );
};