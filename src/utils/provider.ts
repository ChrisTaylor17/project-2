import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

export class ProviderManager {
  private static provider: ethers.BrowserProvider | null = null;
  private static initializationPromise: Promise<ethers.BrowserProvider | null> | null = null;

  static async getProvider(): Promise<ethers.BrowserProvider | null> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      if (!window.ethereum) {
        toast.error('MetaMask is not installed');
        return null;
      }

      try {
        if (!this.provider) {
          this.provider = new ethers.BrowserProvider(window.ethereum, 'any');
          // Validate provider
          await this.provider.getNetwork();
        }
        return this.provider;
      } catch (error) {
        console.error('Error initializing provider:', error);
        toast.error('Failed to connect to MetaMask');
        this.provider = null;
        return null;
      } finally {
        this.initializationPromise = null;
      }
    })();

    return this.initializationPromise;
  }

  static async getSigner(): Promise<ethers.JsonRpcSigner | null> {
    const provider = await this.getProvider();
    if (!provider) return null;

    try {
      const signer = await provider.getSigner();
      // Validate signer
      await signer.getAddress();
      return signer;
    } catch (error) {
      console.error('Error getting signer:', error);
      toast.error('Failed to get wallet signer');
      return null;
    }
  }

  static resetProvider(): void {
    this.provider = null;
    this.initializationPromise = null;
  }
}