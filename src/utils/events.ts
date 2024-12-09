export class WalletEventManager {
  private static listeners = new Map<string, Set<Function>>();

  static addListener(event: string, callback: Function): void {
    if (!window.ethereum) return;

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event)?.add(callback);
    window.ethereum.on(event, callback as any);
  }

  static removeListener(event: string, callback: Function): void {
    if (!window.ethereum) return;

    this.listeners.get(event)?.delete(callback);
    window.ethereum.removeListener(event, callback as any);
  }

  static removeAllListeners(): void {
    if (!window.ethereum) return;

    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach(callback => {
        window.ethereum.removeListener(event, callback as any);
      });
    });
    
    this.listeners.clear();
  }
}