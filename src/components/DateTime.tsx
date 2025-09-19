import { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

export const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-3 bg-gradient-card border border-border/50 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-primary" />
        <div className="font-mono text-lg font-semibold text-foreground">
          {formatTime(currentTime)}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Calendar className="w-3 h-3 text-muted-foreground" />
        <div className="text-xs text-muted-foreground capitalize">
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  );
};