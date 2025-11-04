import { Card } from './ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
}

export const LoadingState = ({ 
  message = 'Processing...', 
  submessage = 'This may take a few moments' 
}: LoadingStateProps) => {
  return (
    <Card className="p-8 text-center space-y-4 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="relative inline-flex">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 absolute animate-ping" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
          <Loader2 className="h-8 w-8 text-background animate-spin" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold">{message}</h3>
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </div>
        <p className="text-sm text-muted-foreground">{submessage}</p>
      </div>

      <div className="flex justify-center gap-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" />
      </div>
    </Card>
  );
};
