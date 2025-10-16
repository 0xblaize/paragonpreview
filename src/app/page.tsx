"use client";

import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { Navigation } from './components/Navigation';
import { SprintPage } from './components/SprintPage';
import { MintPage } from './components/MintPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { QuestsPage } from './components/QuestsPage';
import { DiscordBar } from './components/DiscordBar';
import { WalletProvider } from './contexts/WalletContext';
import { config } from './config/wagmi';

type Page = 'sprint' | 'mint' | 'leaderboard' | 'quests';

// Setup queryClient
const queryClient = new QueryClient();

// WalletConnect Project ID
const projectId = 'c94f9dbd9ba68e96fb9c26881e3343c8';

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#8b5cf6',
    '--w3m-border-radius-master': '8px',
  },
});

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('sprint');

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
            <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
            
            <main>
              {currentPage === 'sprint' && <SprintPage />}
              {currentPage === 'mint' && <MintPage />}
              {currentPage === 'leaderboard' && <LeaderboardPage />}
              {currentPage === 'quests' && <QuestsPage />}
            </main>

            <DiscordBar />
          </div>
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
