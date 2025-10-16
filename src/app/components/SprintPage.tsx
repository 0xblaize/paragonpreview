import { Clock, Shield, Zap, Users, TrendingUp, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

export function SprintPage() {
  const { isConnected, points, balance, walletAddress } = useWallet();
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tiers = [
    { name: 'Bronze', min: 0, max: 1000, color: 'bg-amber-700', users: 1234, rewards: '100 SAFE' },
    { name: 'Silver', min: 1001, max: 5000, color: 'bg-gray-400', users: 567, rewards: '500 SAFE' },
    { name: 'Gold', min: 5001, max: 15000, color: 'bg-yellow-500', users: 234, rewards: '1500 SAFE' },
    { name: 'Platinum', min: 15001, max: 50000, color: 'bg-cyan-400', users: 89, rewards: '5000 SAFE' },
    { name: 'Diamond', min: 50001, max: Infinity, color: 'bg-purple-500', users: 23, rewards: '15000 SAFE' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-0">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <Badge className="bg-white/20 text-white border-white/30">Season 1 Sprint</Badge>
        <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl">
          DeFi Sprint Challenge
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-xl">
          Join the ultimate DeFi sprint. Complete quests, earn points, and climb the leaderboard to win exclusive rewards.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <div className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5" />
            <span>Fast</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5" />
            <span>2,147 Participants</span>
          </div>
        </div>
      </section>

      {/* Live Safe Balance */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle>Total SAFE Balance</CardTitle>
            <CardDescription className="text-white/60">Locked in Sprint</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">1,247,856</p>
            <p className="text-white/60 mt-2">SAFE Tokens</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
            <CardDescription className="text-white/60">
              {isConnected ? 'Current Holdings' : 'Connect wallet to view'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <>
                <p className="text-4xl">{balance.toFixed(2)}</p>
                <p className="text-white/60 mt-2">SAFE Tokens</p>
              </>
            ) : (
              <div className="flex items-center gap-2 text-white/40">
                <Wallet className="w-8 h-8" />
                <p>Not connected</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle>Your Points</CardTitle>
            <CardDescription className="text-white/60">
              {isConnected ? 'Total Earned' : 'Connect wallet to view'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <>
                <p className="text-4xl">{points.toLocaleString()}</p>
                <p className="text-white/60 mt-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Rank #47
                </p>
              </>
            ) : (
              <div className="flex items-center gap-2 text-white/40">
                <Wallet className="w-8 h-8" />
                <p>Not connected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Countdown */}
      <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Clock className="w-5 h-5" />
            <span>Sprint Ends In</span>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-lg p-4">
                <p className="text-white text-4xl">{item.value.toString().padStart(2, '0')}</p>
                <p className="text-white/60 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-white text-4xl mb-2">Reward Tiers</h2>
          <p className="text-white/70">Earn more points to unlock higher rewards</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <Card key={tier.name} className="bg-white/10 backdrop-blur-md border-white/20 text-white relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 ${tier.color} opacity-20 blur-3xl`} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                    {tier.name}
                  </CardTitle>
                  <Badge className="bg-white/20 border-white/30">{tier.users} users</Badge>
                </div>
                <CardDescription className="text-white/60">
                  {tier.min.toLocaleString()} - {tier.max === Infinity ? '∞' : tier.max.toLocaleString()} points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{tier.rewards}</p>
                <Progress value={((index + 1) / tiers.length) * 100} className="mt-4 bg-white/10" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-white text-4xl mb-2">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg px-6">
            <AccordionTrigger className="text-white hover:text-white/80">
              What is the DeFi Sprint?
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              The DeFi Sprint is a competitive challenge where participants complete quests and tasks to earn points and climb the leaderboard. Top performers receive SAFE token rewards based on their tier.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg px-6">
            <AccordionTrigger className="text-white hover:text-white/80">
              How do I earn points?
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              Points can be earned by completing quests (submitting PRs, tweets, videos), minting NFTs, referring friends, and participating in community activities. Check the Quests page for available tasks.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg px-6">
            <AccordionTrigger className="text-white hover:text-white/80">
              When will rewards be distributed?
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              Rewards will be distributed within 7 days after the sprint ends. You'll receive your SAFE tokens directly to your connected wallet address.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg px-6">
            <AccordionTrigger className="text-white hover:text-white/80">
              Can I join multiple squads?
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              No, you can only be part of one squad at a time. However, you can leave your current squad and join another one, though your squad points will reset.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg px-6">
            <AccordionTrigger className="text-white hover:text-white/80">
              What happens if I miss the deadline?
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              Quest submissions must be completed before the countdown reaches zero. Late submissions will not be accepted for the current sprint but will count towards future seasons.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
