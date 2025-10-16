import { createContext, useContext, useState, ReactNode } from 'react';
import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { toast } from 'sonner';

interface WalletContextType {
  walletAddress: string;
  isConnected: boolean;
  points: number;
  balance: string;
  completedQuests: string[];
  disconnect: () => void;
  addPoints: (amount: number) => void;
  completeQuest: (questId: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected: wagmiConnected } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { data: balanceData } = useBalance({
    address: address,
  });

  const [points, setPoints] = useState(12450);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const disconnect = () => {
    wagmiDisconnect();
    toast.info('Wallet disconnected');
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const completeQuest = (questId: string) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests((prev) => [...prev, questId]);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress: address || '',
        isConnected: wagmiConnected,
        points,
        balance: balanceData ? `${parseFloat(balanceData.formatted).toFixed(2)}` : '0.00',
        completedQuests,
        disconnect,
        addPoints,
        completeQuest,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
