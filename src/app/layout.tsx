"use client";

import './styles/globals.css';
import { WagmiProvider } from 'wagmi';
import { config } from './config/wagmi'; // adjust path

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}
