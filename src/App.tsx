import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useWallet } from './hooks/useWallet';
import { WalletButton } from './components/WalletButton';
import { NetworkStatus } from './components/NetworkStatus';
import { NFTMarketplace } from './components/NFTMarketplace';
import { Sparkles } from 'lucide-react';

function App() {
  const { account, loading, isCorrectNetwork, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 py-12">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-bold mb-6 animate-pulse">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12" />
            DecentralBridge
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8 animate-fadeIn">
          Empowering a future where financial freedom knows no bounds. Through blockchain technology,
          we're building bridges to a more inclusive, transparent, and equitable digital economy.
          Join us in revolutionizing the way we connect, create, and prosper together.
        </p>
      </div>

      <div className="w-full max-w-6xl space-y-8">
        <div className="flex flex-col items-center gap-4">
          <WalletButton
            onClick={account ? disconnectWallet : connectWallet}
            loading={loading}
            connected={!!account}
            account={account}
          />

          {account && (
            <NetworkStatus isCorrectNetwork={isCorrectNetwork} />
          )}
        </div>

        {account && isCorrectNetwork ? (
          <NFTMarketplace account={account} />
        ) : (
          <div className="text-center mt-12">
            <p className="text-xl text-gray-400">
              {account ? 'Please switch to Sepolia network' : 'Connect your wallet to start your blockchain journey'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;