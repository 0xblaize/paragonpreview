import { MessageCircle, Twitter, Github, Send, Users, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function DiscordBar() {
  const socialLinks = [
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/defisprint',
      color: 'hover:text-[#5865F2]',
    },
    {
      name: 'Twitter/X',
      icon: Twitter,
      url: 'https://twitter.com/defisprint',
      color: 'hover:text-white',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/defisprint',
      color: 'hover:text-white',
    },
    {
      name: 'Telegram',
      icon: Send,
      url: 'https://t.me/defisprint',
      color: 'hover:text-[#0088cc]',
    },
  ];

  return (
    <footer className="mt-16 bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left side - Community CTA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-[#5865F2] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl">Join Our Community</h3>
                <p className="text-white/60 text-sm">Connect with 12.5K+ DeFi enthusiasts</p>
              </div>
            </div>
            <p className="text-white/70">
              Get the latest updates, participate in discussions, and be part of the DeFi Sprint community across all platforms.
            </p>
          </div>

          {/* Right side - Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl">Stay Updated</h3>
                <p className="text-white/60 text-sm">Get sprint updates in your inbox</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar with social icons */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 DeFi Sprint. All rights reserved.</p>
            
            {/* Social Icons - Small Size */}
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 transition-all ${link.color}`}
                    title={link.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            
            <div className="flex gap-6 text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
