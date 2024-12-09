import React from 'react';

interface TransactionToastProps {
  txHash: string;
  contractAddress?: string;
  userAddress?: string;
}

export const TransactionToast: React.FC<TransactionToastProps> = ({
  txHash,
  contractAddress,
  userAddress,
}) => {
  const explorerBaseUrl = 'https://sepolia.etherscan.io';

  return (
    <div className="bg-white/10 backdrop-blur-lg text-white p-4 rounded-lg shadow-xl max-w-sm border border-white/20">
      <h3 className="font-semibold mb-2">Transaction Details</h3>
      <div className="space-y-2 text-sm">
        <a
          href={`${explorerBaseUrl}/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          View Transaction →
        </a>
        {contractAddress && userAddress && (
          <a
            href={`${explorerBaseUrl}/token/${contractAddress}?a=${userAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-400 hover:text-blue-300 transition-colors"
          >
            View NFT →
          </a>
        )}
      </div>
    </div>
  );
}