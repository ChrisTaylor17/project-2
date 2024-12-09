import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface NetworkStatusProps {
  isCorrectNetwork: boolean;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ isCorrectNetwork }) => {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
      isCorrectNetwork ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
    }`}>
      {isCorrectNetwork ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm">Connected to Sepolia</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">Please connect to Sepolia</span>
        </>
      )}
    </div>
  );
};