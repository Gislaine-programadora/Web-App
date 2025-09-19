import { Mail, Youtube, Github, Code, Layers, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const quickLinks = [
  { 
    name: "Email", 
    icon: Mail, 
    url: "https://mail.google.com",
    color: "text-red-400"
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    url: "https://youtube.com",
    color: "text-red-500"
  },
  { 
    name: "GitHub", 
    icon: Github, 
    url: "https://github.com",
    color: "text-foreground"
  },
  { 
    name: "VS Code", 
    icon: Code, 
    url: "https://vscode.dev",
    color: "text-blue-400"
  },
  { 
    name: "Etherscan", 
    icon: Layers, 
    url: "https://etherscan.io",
    color: "text-primary"
  },
  { 
    name: "Remix", 
    icon: Repeat, 
    url: "https://remix.ethereum.org",
    color: "text-accent"
  }
];

export const QuickLinks = () => {
  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Links Rápidos</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => (
          <Button
            key={link.name}
            variant="secondary"
            onClick={() => window.open(link.url, '_blank')}
            className="h-auto p-4 flex flex-col items-center gap-2 bg-secondary/50 hover:bg-secondary border-border/50 transition-all duration-300 hover:shadow-glow"
          >
            <link.icon className={`w-6 h-6 ${link.color}`} />
            <span className="text-sm font-medium text-secondary-foreground">{link.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};