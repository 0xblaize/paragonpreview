import { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2, Circle, Twitter, Github, Youtube, FileText, Code, Users, Zap, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { useWallet } from '../contexts/WalletContext';

interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'code' | 'social' | 'content' | 'community';
  type: 'pr' | 'tweet' | 'video' | 'article';
  icon: any;
  completed: boolean;
  proofLink?: string;
}

export function QuestsPage() {
  const { isConnected, completedQuests, completeQuest, addPoints } = useWallet();
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Submit a Bug Fix PR',
      description: 'Find and fix a bug in the protocol. Submit a pull request with your fix.',
      points: 500,
      category: 'code',
      type: 'pr',
      icon: Github,
      completed: false,
    },
    {
      id: '2',
      title: 'Share Your Experience',
      description: 'Tweet about your experience with the DeFi Sprint. Tag @DeFiSprint and use #DeFiSprint.',
      points: 100,
      category: 'social',
      type: 'tweet',
      icon: Twitter,
      completed: false,
    },
    {
      id: '3',
      title: 'Create Tutorial Video',
      description: 'Make a video tutorial explaining how to participate in the sprint (min 3 minutes).',
      points: 750,
      category: 'content',
      type: 'video',
      icon: Youtube,
      completed: false,
    },
    {
      id: '4',
      title: 'Add New Feature',
      description: 'Implement a new feature requested in GitHub issues. Submit PR with implementation.',
      points: 1000,
      category: 'code',
      type: 'pr',
      icon: Code,
      completed: false,
    },
    {
      id: '5',
      title: 'Write Technical Article',
      description: 'Write a detailed technical article about DeFi protocols (min 1000 words).',
      points: 600,
      category: 'content',
      type: 'article',
      icon: FileText,
      completed: false,
    },
    {
      id: '6',
      title: 'Community Engagement',
      description: 'Help 5+ community members in Discord support channel.',
      points: 300,
      category: 'community',
      type: 'article',
      icon: Users,
      completed: false,
    },
    {
      id: '7',
      title: 'Improve Documentation',
      description: 'Submit a PR improving existing documentation or adding missing docs.',
      points: 400,
      category: 'code',
      type: 'pr',
      icon: Github,
      completed: false,
    },
    {
      id: '8',
      title: 'Create Social Media Post',
      description: 'Create an engaging post about DeFi Sprint on LinkedIn or Medium.',
      points: 150,
      category: 'social',
      type: 'article',
      icon: FileText,
      completed: false,
    },
    {
      id: '9',
      title: 'Code Review Contribution',
      description: 'Provide thorough code reviews on 3+ community PRs.',
      points: 350,
      category: 'code',
      type: 'pr',
      icon: Code,
      completed: false,
    },
    {
      id: '10',
      title: 'Short-form Video',
      description: 'Create a 60-second explainer video for TikTok/Instagram Reels.',
      points: 200,
      category: 'content',
      type: 'video',
      icon: Zap,
      completed: false,
    },
    {
      id: '11',
      title: 'Security Audit Report',
      description: 'Submit a detailed security analysis of a smart contract.',
      points: 1500,
      category: 'code',
      type: 'pr',
      icon: Trophy,
      completed: false,
    },
    {
      id: '12',
      title: 'Twitter Thread',
      description: 'Create an educational Twitter thread about DeFi concepts (min 5 tweets).',
      points: 250,
      category: 'social',
      type: 'tweet',
      icon: Twitter,
      completed: false,
    },
    {
      id: '13',
      title: 'Organize Community Event',
      description: 'Host a community call, workshop, or AMA session.',
      points: 800,
      category: 'community',
      type: 'article',
      icon: Users,
      completed: false,
    },
    {
      id: '14',
      title: 'Performance Optimization',
      description: 'Submit PR that improves gas efficiency or runtime performance.',
      points: 900,
      category: 'code',
      type: 'pr',
      icon: Target,
      completed: false,
    },
    {
      id: '15',
      title: 'Meme Creation',
      description: 'Create and share a viral-worthy DeFi meme on social media.',
      points: 50,
      category: 'social',
      type: 'tweet',
      icon: Twitter,
      completed: false,
    },
  ]);

  const [proofLinks, setProofLinks] = useState<{ [key: string]: string }>({});

  // Sync quests with wallet context
  useEffect(() => {
    setQuests((prevQuests) =>
      prevQuests.map((q) => ({
        ...q,
        completed: completedQuests.includes(q.id),
      }))
    );
  }, [completedQuests]);

  const totalQuests = quests.length;
  const completedQuestsCount = quests.filter((q) => q.completed).length;
  const totalPoints = quests.reduce((sum, q) => sum + (q.completed ? q.points : 0), 0);
  const maxPoints = quests.reduce((sum, q) => sum + q.points, 0);

  const getCategoryColor = (category: Quest['category']) => {
    switch (category) {
      case 'code':
        return 'bg-blue-500/20 border-blue-400/30 text-blue-200';
      case 'social':
        return 'bg-purple-500/20 border-purple-400/30 text-purple-200';
      case 'content':
        return 'bg-pink-500/20 border-pink-400/30 text-pink-200';
      case 'community':
        return 'bg-green-500/20 border-green-400/30 text-green-200';
    }
  };

  const handleSubmitProof = (questId: string) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    const proofLink = proofLinks[questId];
    if (!proofLink || !proofLink.trim()) {
      toast.error('Please enter a proof link');
      return;
    }

    const quest = quests.find((q) => q.id === questId);
    if (!quest) return;

    // Mark quest as completed in wallet context
    completeQuest(questId);
    
    // Add points
    addPoints(quest.points);

    setQuests(
      quests.map((q) =>
        q.id === questId ? { ...q, completed: true, proofLink } : q
      )
    );
    
    toast.success(`Quest completed! Earned ${quest.points} points.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-0">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-white/20 text-white border-white/30">
            <Target className="w-3 h-3 mr-1 inline" />
            Active Quests
          </Badge>
          <h1 className="text-white text-5xl">Quests</h1>
          <p className="text-white/70 text-xl">
            Complete quests to earn points and climb the leaderboard
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Total Quests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{totalQuests}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-400">{completedQuestsCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Points Earned</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{totalPoints.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardDescription className="text-white/60">Completion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl">{Math.round((completedQuestsCount / totalQuests) * 100)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>
                  {totalPoints.toLocaleString()} / {maxPoints.toLocaleString()} points
                </span>
              </div>
              <Progress value={(totalPoints / maxPoints) * 100} className="h-3 bg-white/10" />
            </div>
          </CardContent>
        </Card>

        {/* Quests Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {quests.map((quest) => {
            const Icon = quest.icon;
            return (
              <Card
                key={quest.id}
                className={`bg-white/10 backdrop-blur-md border-white/20 text-white relative overflow-hidden ${
                  quest.completed ? 'opacity-75' : ''
                }`}
              >
                {quest.completed && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-xl">{quest.title}</CardTitle>
                      </div>
                      <CardDescription className="text-white/60">
                        {quest.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(quest.category)}>
                      {quest.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400">{quest.points} points</span>
                    </div>
                  </div>

                  {quest.completed ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Quest Completed</span>
                      </div>
                      {quest.proofLink && (
                        <a
                          href={quest.proofLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Proof
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`proof-${quest.id}`} className="text-white text-sm">
                          Proof Link
                        </Label>
                        <Input
                          id={`proof-${quest.id}`}
                          type="url"
                          placeholder="https://..."
                          value={proofLinks[quest.id] || ''}
                          onChange={(e) =>
                            setProofLinks({ ...proofLinks, [quest.id]: e.target.value })
                          }
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        />
                      </div>
                      <Button
                        onClick={() => handleSubmitProof(quest.id)}
                        className="w-full bg-white/20 hover:bg-white/30 text-white"
                        disabled={!isConnected}
                      >
                        {isConnected ? 'Submit Proof' : 'Connect Wallet First'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
