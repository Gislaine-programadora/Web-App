import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Pesquisar no Google..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-20 h-14 text-lg bg-gradient-card border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
};