import { useState } from 'react';
import { Copy, Check, Sparkles, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { useWallet } from '../contexts/WalletContext';

export function MintPage() {
  const { walletAddress, isConnected, connectWallet, addPoints } = useWallet();
  const [mintAmount, setMintAmount] = useState(1);
  const [referralCode, setReferralCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const maxCap = 10000;
  const minted = 7234;
  const remaining = maxCap - minted;
  const percentMinted = (minted / maxCap) * 100;
  const userReferralCode = 'DEFI-X7K9M';

  const handleMint = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (mintAmount < 1 || mintAmount > 10) {
      toast.error('Mint amount must be between 1 and 10');
      return;
    }
    
    // Add points for minting
    const pointsEarned = mintAmount * 250;
    addPoints(pointsEarned);
    
    toast.success(`Successfully minted ${mintAmount} NFT${mintAmount > 1 ? 's' : ''}! Earned ${pointsEarned} points.`);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopiedCode(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-0">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-white/20 text-white border-white/30">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            Limited Edition
          </Badge>
          <h1 className="text-white text-5xl">Mint Your Sprint NFT</h1>
          <p className="text-white/70 text-xl">
            Own a piece of DeFi history. Each NFT grants you exclusive benefits and rewards.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Total Minted</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{minted.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Remaining</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{remaining.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Price</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">0.05 ETH</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mint Progress</span>
                <span>{percentMinted.toFixed(1)}% Complete</span>
              </div>
              <Progress value={percentMinted} className="h-3 bg-white/10" />
              <p className="text-white/60 text-sm">
                {remaining.toLocaleString()} NFTs remaining out of {maxCap.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mint Widget */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle>Mint NFT</CardTitle>
            <CardDescription className="text-white/60">
              Connect your wallet to mint your Sprint NFT
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Connection */}
            {!isConnected ? (
              <div className="space-y-4">
                <p className="text-white/60 text-center">Connect your wallet to mint NFTs</p>
                <Button
                  onClick={connectWallet}
                  className="w-full bg-white text-purple-600 hover:bg-white/90"
                  size="lg"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full" />
                    <div>
                      <p className="text-sm text-white/60">Connected Wallet</p>
                      <p className="text-white">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                    </div>
                  </div>
                </div>

                {/* Mint Amount */}
                <div className="space-y-2">
                  <Label htmlFor="mintAmount" className="text-white">Amount to Mint (Max 10)</Label>
                  <Input
                    id="mintAmount"
                    type="number"
                    min="1"
                    max="10"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(parseInt(e.target.value) || 1)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <p className="text-sm text-white/60">
                    Total: {(mintAmount * 0.05).toFixed(2)} ETH
                  </p>
                </div>

                {/* Referral Code Input */}
                <div className="space-y-2">
                  <Label htmlFor="referralCode" className="text-white">Referral Code (Optional)</Label>
                  <Input
                    id="referralCode"
                    type="text"
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <p className="text-sm text-white/60">
                    Get 5% bonus points with a referral code
                  </p>
                </div>

                {/* Mint Button */}
                <Button
                  onClick={handleMint}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Mint {mintAmount} NFT{mintAmount > 1 ? 's' : ''}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral Section */}
        {isConnected && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
              <CardDescription className="text-white/60">
                Share your code and earn 100 points for each successful referral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={userReferralCode}
                  readOnly
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button
                  onClick={copyReferralCode}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Referrals</span>
                  </div>
                  <p className="text-2xl">12</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Points Earned</span>
                  </div>
                  <p className="text-2xl">1,200</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Exclusive Access', desc: 'Priority access to future drops' },
            { title: 'Bonus Rewards', desc: '2x points multiplier on quests' },
            { title: 'Governance Rights', desc: 'Vote on protocol decisions' },
          ].map((benefit) => (
            <Card key={benefit.title} className="bg-white/5 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 text-sm">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
