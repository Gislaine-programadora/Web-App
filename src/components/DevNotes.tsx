import { useState, useEffect } from "react";
import { FileText, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const DevNotes = () => {
  const [notes, setNotes] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("dev-notes");
      if (savedNotes) {
        setNotes(savedNotes);
      }
    } catch (error) {
      console.error("Erro ao carregar notas:", error);
    }
  }, []);

  const saveNotes = () => {
    try {
      localStorage.setItem("dev-notes", notes);
      toast({
        title: "Notas salvas!",
        description: "Suas anotações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as notas.",
        variant: "destructive",
      });
    }
  };

  const viewSavedNotes = () => {
    try {
      const savedNotes = localStorage.getItem("dev-notes");
      if (savedNotes) {
        setShowSaved(!showSaved);
        toast({
          title: showSaved ? "Escondendo notas" : "Mostrando notas salvas",
          description: `${savedNotes.length} caracteres salvos`,
        });
      } else {
        toast({
          title: "Nenhuma nota salva",
          description: "Não há notas salvas no momento.",
        });
      }
    } catch (error) {
      console.error("Erro ao visualizar notas:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveNotes();
    }
  };

  return (
    <Card className="p-4 bg-gradient-card border-border/50 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-foreground">dev.bloco</h4>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={viewSavedNotes}
            variant="outline"
            size="sm"
            className="bg-background/20 hover:bg-background/30 border-border/50"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver Salvas
          </Button>
          <Button
            onClick={saveNotes}
            variant="secondary"
            size="sm"
            className="bg-secondary/50 hover:bg-secondary border-border/50"
          >
            <Save className="w-4 h-4 mr-1" />
            Salvar
          </Button>
        </div>
      </div>

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite suas anotações aqui... (Ctrl+S para salvar)"
        className="min-h-[200px] bg-background/20 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 font-mono text-sm resize-none"
      />

      {showSaved && (
        <div className="mt-3 p-3 bg-background/30 border border-border/50 rounded-md">
          <div className="text-xs text-muted-foreground mb-2">Notas Salvas:</div>
          <div className="text-sm font-mono text-foreground/80 whitespace-pre-wrap max-h-32 overflow-y-auto">
            {localStorage.getItem("dev-notes") || "Nenhuma nota salva"}
          </div>
        </div>
      )}

      <div className="mt-2 text-xs text-muted-foreground">
        {notes.length} caracteres • Ctrl+S para salvar
      </div>
    </Card>
  );
};