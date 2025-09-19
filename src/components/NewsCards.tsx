import { useState, useEffect } from "react";
import { Globe, Clock, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock news data - Em produção, conecte a APIs de notícias
const mockNews = [
  {
    id: 1,
    title: "Mercados globais registram alta após decisões de política monetária",
    summary: "Principais índices mundiais fecharam em alta após anúncios dos bancos centrais sobre taxas de juros.",
    source: "Financial Times",
    time: "2 horas atrás",
    category: "Economia",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    url: "#"
  },
  {
    id: 2,
    title: "Nova tecnologia blockchain promete revolucionar pagamentos digitais",
    summary: "Startup desenvolve solução que reduz tempo de transação para segundos com custos mínimos.",
    source: "TechCrunch",
    time: "4 horas atrás",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    url: "#"
  },
  {
    id: 3,
    title: "Petróleo atinge maior patamar do ano com tensões geopolíticas",
    summary: "Preços do petróleo sobem 3% em meio a preocupações sobre o fornecimento global.",
    source: "Reuters",
    time: "6 horas atrás",
    category: "Energia",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    url: "#"
  },
  {
    id: 4,
    title: "IA generativa acelera inovação em diversos setores industriais",
    summary: "Empresas reportam aumento de 40% na produtividade com implementação de ferramentas de IA.",
    source: "Wall Street Journal",
    time: "8 horas atrás",
    category: "Inteligência Artificial",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    url: "#"
  },
  {
    id: 5,
    title: "Energias renováveis batem recorde de investimentos globais",
    summary: "Investimentos em energia solar e eólica crescem 25% no último trimestre.",
    source: "Bloomberg",
    time: "12 horas atrás",
    category: "Sustentabilidade",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400",
    url: "#"
  },
  {
    id: 6,
    title: "Criptomoedas ganham espaço em portfólios institucionais",
    summary: "Grandes fundos aumentam alocação em ativos digitais como hedge contra inflação.",
    source: "CoinDesk",
    time: "1 dia atrás",
    category: "Criptomoedas",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400",
    url: "#"
  }
];

export const NewsCards = () => {
  const [news, setNews] = useState(mockNews);

  // Simula atualizações das notícias
  useEffect(() => {
    const interval = setInterval(() => {
      // Em produção, aqui faria uma nova chamada à API
      setNews(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Notícias Globais</h2>
        <div className="ml-auto text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Atualização automática
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <Card key={article.id} className="overflow-hidden bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 group">
            <div className="aspect-video overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground">{article.time}</span>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {article.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {article.source}
                </span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-secondary/50 hover:bg-secondary border-border/50"
                  onClick={() => window.open(article.url, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Ler mais
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};