import { useState, useEffect } from "react";
import { FileText, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const DevNotes = () => {
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedNotes = localStorage.getItem("dev-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const saveNotes = () => {
    localStorage.setItem("dev-notes", notes);
    toast({
      title: "Notas salvas!",
      description: "Suas anotações foram salvas com sucesso.",
    });
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

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite suas anotações aqui... (Ctrl+S para salvar)"
        className="min-h-[200px] bg-background/20 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 font-mono text-sm resize-none"
      />

      <div className="mt-2 text-xs text-muted-foreground">
        {notes.length} caracteres • Ctrl+S para salvar
      </div>
    </Card>
  );
};