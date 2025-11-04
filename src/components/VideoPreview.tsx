import { Card } from './ui/card';
import { Play, Volume2, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface VideoPreviewProps {
  articleData?: any;
  script?: any;
}

export const VideoPreview = ({ articleData, script }: VideoPreviewProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="aspect-video bg-gradient-to-br from-background via-background to-muted/20 relative group">
        {articleData?.thumbnail ? (
          <img
            src={articleData.thumbnail}
            alt={articleData.title}
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse-glow">
                <Play className="h-12 w-12 text-primary" />
              </div>
              <p className="text-muted-foreground">Preview will appear here</p>
            </div>
          </div>
        )}
        
        {articleData && (
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        )}
        
        {articleData && (
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <h2 className="text-2xl font-bold text-foreground drop-shadow-lg">
              {articleData.title}
            </h2>
            {script && (
              <div className="flex gap-2">
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                  <Play className="h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Volume2 className="h-4 w-4" />
                  Voice
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {script?.scenes && (
        <div className="p-4 border-t border-border/50">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Timeline</h4>
          <div className="space-y-2">
            {script.scenes.slice(0, 3).map((scene: any, idx: number) => (
              <div key={idx} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{scene.text.substring(0, 60)}...</p>
                  <p className="text-xs text-muted-foreground">{scene.duration}s • {scene.visualSuggestion}</p>
                </div>
              </div>
            ))}
            {script.scenes.length > 3 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                +{script.scenes.length - 3} more scenes
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
