import { Trophy, Medal, Crown, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useWallet } from '../contexts/WalletContext';

export function LeaderboardPage() {
  const { walletAddress, isConnected, points } = useWallet();
  const topPlayers = [
    { rank: 1, name: 'CryptoMaster', address: '0x1a2b...3c4d', points: 45230, squad: 'Alpha Squad', change: 0 },
    { rank: 2, name: 'DeFiWarrior', address: '0x5e6f...7g8h', points: 42100, squad: 'Beta Team', change: 2 },
    { rank: 3, name: 'BlockchainPro', address: '0x9i0j...1k2l', points: 38950, squad: 'Gamma Force', change: -1 },
    { rank: 4, name: 'Web3Ninja', address: '0x3m4n...5o6p', points: 35420, squad: 'Alpha Squad', change: 1 },
    { rank: 5, name: 'TokenHunter', address: '0x7q8r...9s0t', points: 32180, squad: 'Delta Crew', change: -1 },
    { rank: 6, name: 'NFTCollector', address: '0x1u2v...3w4x', points: 29870, squad: 'Beta Team', change: 3 },
    { rank: 7, name: 'YieldFarmer', address: '0x5y6z...7a8b', points: 27650, squad: 'Epsilon Squad', change: 0 },
    { rank: 8, name: 'SmartContract', address: '0x9c0d...1e2f', points: 25430, squad: 'Alpha Squad', change: -2 },
    { rank: 9, name: 'GasOptimizer', address: '0x3g4h...5i6j', points: 23210, squad: 'Gamma Force', change: 1 },
    { rank: 10, name: 'MetaMage', address: '0x7k8l...9m0n', points: 21100, squad: 'Zeta Warriors', change: 4 },
  ];

  const squads = [
    { rank: 1, name: 'Alpha Squad', members: 47, totalPoints: 215430, avgPoints: 4583, change: 0 },
    { rank: 2, name: 'Beta Team', members: 52, totalPoints: 198750, avgPoints: 3822, change: 1 },
    { rank: 3, name: 'Gamma Force', members: 38, totalPoints: 187920, avgPoints: 4945, change: -1 },
    { rank: 4, name: 'Delta Crew', members: 41, totalPoints: 165340, avgPoints: 4032, change: 2 },
    { rank: 5, name: 'Epsilon Squad', members: 35, totalPoints: 152680, avgPoints: 4362, change: -1 },
    { rank: 6, name: 'Zeta Warriors', members: 29, totalPoints: 143210, avgPoints: 4938, change: 0 },
    { rank: 7, name: 'Eta Legends', members: 44, totalPoints: 138950, avgPoints: 3158, change: 1 },
    { rank: 8, name: 'Theta Guild', members: 36, totalPoints: 127840, avgPoints: 3551, change: -2 },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="text-white/60">#{rank}</span>;
  };

  const getChangeIndicator = (change: number) => {
    if (change === 0) return <span className="text-white/40">-</span>;
    if (change > 0) return <span className="text-green-400">↑{change}</span>;
    return <span className="text-red-400">↓{Math.abs(change)}</span>;
  };

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-0">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <h1 className="text-white text-5xl">Leaderboard</h1>
          </div>
          <p className="text-white/70 text-xl">
            Track the top performers and squads in the DeFi Sprint
          </p>
        </div>

        {/* Top 3 Spotlight */}
        <div className="grid md:grid-cols-3 gap-6">
          {topPlayers.slice(0, 3).map((player, index) => (
            <Card
              key={player.rank}
              className={`bg-white/10 backdrop-blur-md border-white/20 text-white relative overflow-hidden ${
                index === 0 ? 'md:col-span-3 md:scale-105' : ''
              }`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-10 blur-3xl" />
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{getRankIcon(player.rank)}</div>
                    <div>
                      <CardTitle className="text-2xl">{player.name}</CardTitle>
                      <CardDescription className="text-white/60">{player.address}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-purple-500/20 border-purple-400/30 text-purple-200">
                    {player.squad}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Points</p>
                    <p className="text-3xl">{player.points.toLocaleString()}</p>
                  </div>
                  {index === 0 && (
                    <Trophy className="w-16 h-16 text-yellow-400 opacity-50" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for Individual and Squad Leaderboards */}
        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/10 border border-white/20">
            <TabsTrigger value="individual" className="data-[state=active]:bg-white/20 text-white">
              Individual
            </TabsTrigger>
            <TabsTrigger value="squads" className="data-[state=active]:bg-white/20 text-white">
              Squads
            </TabsTrigger>
          </TabsList>

          {/* Individual Leaderboard */}
          <TabsContent value="individual" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Top Players</CardTitle>
                <CardDescription className="text-white/60">
                  Rankings updated every hour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPlayers.map((player) => {
                    const isCurrentUser = isConnected && player.address === walletAddress;
                    return (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        isCurrentUser 
                          ? 'bg-purple-500/20 border border-purple-400/30' 
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 text-center">
                          {getRankIcon(player.rank)}
                        </div>
                        <Avatar className={getRandomColor(player.name)}>
                          <AvatarFallback className="bg-transparent text-white">
                            {player.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-white flex items-center gap-2">
                            {player.name}
                            {isCurrentUser && (
                              <Badge className="bg-purple-500/20 border-purple-400/30 text-purple-200 text-xs">
                                You
                              </Badge>
                            )}
                          </p>
                          <p className="text-white/60 text-sm">{player.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <Badge variant="outline" className="border-white/20 text-white">
                          {player.squad}
                        </Badge>
                        <div className="text-right min-w-[100px]">
                          <p className="text-white text-lg">{player.points.toLocaleString()}</p>
                          <p className="text-white/60 text-sm">points</p>
                        </div>
                        <div className="w-12 text-center">
                          {getChangeIndicator(player.change)}
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Squad Leaderboard */}
          <TabsContent value="squads" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Top Squads</CardTitle>
                <CardDescription className="text-white/60">
                  Team performance rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {squads.map((squad) => (
                    <div
                      key={squad.rank}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 text-center">
                          {getRankIcon(squad.rank)}
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-lg">{squad.name}</p>
                          <p className="text-white/60 text-sm">{squad.members} members</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-white/60 text-sm">Total Points</p>
                          <p className="text-white text-lg">{squad.totalPoints.toLocaleString()}</p>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="text-white/60 text-sm">Avg Points</p>
                          <p className="text-white text-lg">{squad.avgPoints.toLocaleString()}</p>
                        </div>
                        <div className="w-12 text-center">
                          {getChangeIndicator(squad.change)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
