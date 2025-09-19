import { SearchBar } from "@/components/SearchBar";
import { QuickLinks } from "@/components/QuickLinks";
import { Calculator } from "@/components/Calculator";
import { DevNotes } from "@/components/DevNotes";
import { StockTicker } from "@/components/StockTicker";
import { NewsCards } from "@/components/NewsCards";
import { DateTime } from "@/components/DateTime";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header com busca */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-6">
          <SearchBar />
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Layout principal */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Sidebar esquerdo */}
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            <DateTime />
            <Calculator />
            <DevNotes />
          </aside>

          {/* Área principal */}
          <main className="col-span-12 lg:col-span-9 space-y-8">
            
            {/* Links rápidos */}
            <section>
              <QuickLinks />
            </section>

            {/* Cotações financeiras */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                Mercados Financeiros
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
              </h2>
              <StockTicker />
            </section>

            {/* Feed de notícias */}
            <section>
              <NewsCards />
            </section>

          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            Dashboard Produtivo • Desenvolvido para máxima eficiência
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;