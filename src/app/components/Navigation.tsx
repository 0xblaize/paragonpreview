import { Menu, X, Wallet, Coins } from 'lucide-react';
import { useState } from 'react';

import { Button } from './ui/button';
import { useWallet } from '../contexts/WalletContext';

type Page = 'sprint' | 'mint' | 'leaderboard' | 'quests';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { walletAddress, isConnected, points, balance, connectWallet, disconnectWallet } = useWallet();

  const navItems: { page: Page; label: string }[] = [
    { page: 'sprint', label: 'Sprint' },
    { page: 'mint', label: 'Mint' },
    { page: 'leaderboard', label: 'Leaderboard' },
    { page: 'quests', label: 'Quests' },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={"/logo.jpg"} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 transition-colors ${
                  currentPage === item.page
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Wallet Section */}
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">{points.toLocaleString()}</span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-white text-purple-600 hover:bg-white/90"
                size="sm"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  currentPage === item.page
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Wallet */}
            <div className="pt-3 px-3">
              {isConnected ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-white text-sm">
                    <span className="text-white/60">Points:</span>
                    <span>{points.toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={disconnectWallet}
                    variant="outline"
                    size="sm"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="w-full bg-white text-purple-600 hover:bg-white/90"
                  size="sm"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
