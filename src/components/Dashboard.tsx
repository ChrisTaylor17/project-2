import React from 'react';
import { Wallet, Activity } from 'lucide-react';
import { NFTMarketplace } from './NFTMarketplace';

interface DashboardProps {
  account: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ account }) => {
  return (
    <div className="w-full max-w-4xl space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-white/20 rounded-lg backdrop-blur-sm hover:border-white/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold">Account Details</h3>
          </div>
          <div className="space-y-2 text-gray-400">
            <p>Address: {account.slice(0, 6)}...{account.slice(-4)}</p>
            <p>Network: Ethereum Mainnet</p>
            <p>Member Since: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="p-6 border border-white/20 rounded-lg backdrop-blur-sm hover:border-white/40 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold">Activity</h3>
          </div>
          <div className="space-y-2 text-gray-400">
            <p>Last Login: Just Now</p>
            <p>Transactions: 0</p>
            <p>NFTs Owned: 0</p>
          </div>
        </div>
      </div>

      <NFTMarketplace account={account} />
    </div>
  );
};