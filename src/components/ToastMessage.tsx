import React from 'react';

interface ToastMessageProps {
  message: string;
  txHash?: string;
  contractAddress?: string;
  userAddress?: string;
}

export const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  txHash,
  contractAddress,
  userAddress,
}) => {
  const explorerBaseUrl = 'https://sepolia.etherscan.io';
  
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-sm">
      <p className="font-medium">{message}</p>
      <div className="mt-2 space-y-1">
        {txHash && (
          <a
            href={`${explorerBaseUrl}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm block"
          >
            View Transaction →
          </a>
        )}
        {contractAddress && userAddress && (
          <a
            href={`${explorerBaseUrl}/token/${contractAddress}?a=${userAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm block"
          >
            View NFT →
          </a>
        )}
      </div>
    </div>
  );
};