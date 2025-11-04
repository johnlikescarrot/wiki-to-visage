import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface WikiInputProps {
  onParse: (data: unknown) => void;
  isLoading?: boolean;
}

export const WikiInput = ({ onParse, isLoading }: WikiInputProps) => {
  const [url, setUrl] = useState('');
  const [isParsing, setIsParsing] = useState(false);

  const validateWikipediaUrl = (url: string) => {
    const pattern = /https?:\/\/(en\.)?wikipedia\.org\/wiki\/.+/i;
    return pattern.test(url);
  };

  const handleParse = async () => {
    if (!url.trim()) {
      toast.error('Please enter a Wikipedia URL');
      return;
    }

    if (!validateWikipediaUrl(url)) {
      toast.error('Please enter a valid Wikipedia URL (e.g., https://en.wikipedia.org/wiki/...)');
      return;
    }

    setIsParsing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/parse-wikipedia`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to parse Wikipedia article');
      }

      const data = await response.json();
      toast.success(`Parsed: ${data.title}`);
      onParse(data);
    } catch (error) {
      console.error('Parse error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to parse article');
    } finally {
      setIsParsing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isParsing && !isLoading) {
      handleParse();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="https://en.wikipedia.org/wiki/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isParsing || isLoading}
            className="pl-11 h-12 bg-card/50 border-border/50 focus:border-primary/50 transition-all"
          />
        </div>
        <Button
          onClick={handleParse}
          disabled={isParsing || isLoading || !url.trim()}
          size="lg"
          className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          {isParsing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Parsing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Parse Article
            </>
          )}
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>Try: <button onClick={() => setUrl('https://en.wikipedia.org/wiki/Artificial_intelligence')} className="text-primary hover:underline">Artificial Intelligence</button>, <button onClick={() => setUrl('https://en.wikipedia.org/wiki/Space_exploration')} className="text-primary hover:underline">Space Exploration</button></p>
      </div>
    </div>
  );
};
