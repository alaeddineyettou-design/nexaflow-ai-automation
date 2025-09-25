import React from 'react';
import { Sparkles } from "@/components/ui/sparkles";
import { useTheme } from './ThemeProvider';
import { 
  Zap, 
  Workflow, 
  Settings, 
  Bot, 
  GitBranch, 
  Database,
  Cloud,
  Cpu
} from 'lucide-react';

const TrustedBySection: React.FC = () => {
  const { theme } = useTheme();

  const automationPlatforms = [
    {
      name: "Make.com",
      icon: <Zap className="w-12 h-12" />,
      color: "text-purple-500"
    },
    {
      name: "n8n",
      icon: <Workflow className="w-12 h-12" />,
      color: "text-red-500"
    },
    {
      name: "Zapier",
      icon: <Settings className="w-12 h-12" />,
      color: "text-orange-500"
    },
    {
      name: "Microsoft Power Automate",
      icon: <Bot className="w-12 h-12" />,
      color: "text-blue-500"
    },
    {
      name: "Integromat",
      icon: <GitBranch className="w-12 h-12" />,
      color: "text-green-500"
    },
    {
      name: "Workato",
      icon: <Database className="w-12 h-12" />,
      color: "text-indigo-500"
    },
    {
      name: "Tray.io",
      icon: <Cloud className="w-12 h-12" />,
      color: "text-cyan-500"
    },
    {
      name: "UiPath",
      icon: <Cpu className="w-12 h-12" />,
      color: "text-pink-500"
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-sm mb-4">
            TRUSTED BY EXPERTS
          </div>
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Powered by Industry Leaders
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We leverage the most advanced automation platforms trusted by Fortune 500 companies worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16">
          {automationPlatforms.map((platform, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`${platform.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {platform.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                {platform.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Sparkles Effect Container */}
        <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#10b981,transparent_70%)] before:opacity-40" />
          <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-emerald-500/20 bg-slate-950" />
          <Sparkles
            density={1200}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            color={theme === "dark" ? "#10b981" : "#059669"}
            size={2}
            speed={0.5}
            opacity={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;