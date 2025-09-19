import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, Bitcoin } from "lucide-react";
import { Card } from "@/components/ui/card";

// Mock data - Em produção, conecte a APIs reais
const generateMockPrice = (base: number, volatility: number) => {
  const change = (Math.random() - 0.5) * volatility;
  return Math.max(0, base + change);
};

export const StockTicker = () => {
  const [stocks, setStocks] = useState([
    { symbol: "IBOV", name: "Ibovespa", price: 126845.32, change: 0, type: "bovespa" },
    { symbol: "PETR4", name: "Petrobras", price: 32.15, change: 0, type: "bovespa" },
    { symbol: "VALE3", name: "Vale", price: 65.24, change: 0, type: "bovespa" },
    { symbol: "BTC", name: "Bitcoin", price: 43250.00, change: 0, type: "crypto" },
    { symbol: "ETH", name: "Ethereum", price: 2645.75, change: 0, type: "crypto" },
    { symbol: "ADA", name: "Cardano", price: 0.52, change: 0, type: "crypto" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        const oldPrice = stock.price;
        const newPrice = generateMockPrice(oldPrice, oldPrice * 0.01);
        const change = ((newPrice - oldPrice) / oldPrice) * 100;
        
        return {
          ...stock,
          price: newPrice,
          change: change
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "BTC" || symbol === "ETH") {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (symbol === "ADA") {
      return `$${price.toFixed(3)}`;
    } else {
      return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const getIcon = (type: string) => {
    return type === "crypto" ? Bitcoin : DollarSign;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-success" />
          <h3 className="text-lg font-semibold text-foreground">Bovespa</h3>
        </div>
        <div className="space-y-3">
          {stocks.filter(s => s.type === "bovespa").map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
              <div>
                <div className="font-semibold text-foreground">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg text-foreground">{formatPrice(stock.price, stock.symbol)}</div>
                <div className={`flex items-center gap-1 text-sm ${
                  stock.change >= 0 ? "text-success" : "text-destructive"
                }`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Bitcoin className="w-5 h-5 text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Criptomoedas</h3>
        </div>
        <div className="space-y-3">
          {stocks.filter(s => s.type === "crypto").map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
              <div>
                <div className="font-semibold text-foreground">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg text-foreground">{formatPrice(stock.price, stock.symbol)}</div>
                <div className={`flex items-center gap-1 text-sm ${
                  stock.change >= 0 ? "text-success" : "text-destructive"
                }`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};