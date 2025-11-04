import { Card } from './ui/card';
import { Button } from './ui/button';
import { Play, Download, Share2, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface EnhancedPreviewProps {
  articleData?: any;
  script?: any;
  template?: any;
  settings?: any;
}

export const EnhancedPreview = ({ articleData, script, template, settings }: EnhancedPreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '1:1': 'aspect-square'
  }[settings?.aspectRatio || '16:9'];

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className={`${aspectRatioClass} bg-gradient-to-br from-background via-background to-muted/20 relative group`}>
        {articleData?.thumbnail ? (
          <div className="absolute inset-0">
            <img
              src={articleData.thumbnail}
              alt={articleData.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        )}

        {/* Preview Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm">
          <div className="flex gap-3">
            <Button size="lg" className="gap-2 shadow-lg">
              <Play className="h-5 w-5" />
              Play Preview
            </Button>
            <Button size="lg" variant="outline" className="gap-2 shadow-lg">
              <Maximize2 className="h-5 w-5" />
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Content Overlay */}
        {articleData && (
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            {template && (
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 text-sm font-medium self-start">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: template.style.primaryColor }}
                />
                {template.name} Template
              </div>
            )}
            
            <h2
              className="text-4xl font-bold mb-3 drop-shadow-2xl"
              style={{
                fontFamily: template?.style.fontFamily || 'inherit',
                color: template?.style.primaryColor || 'inherit'
              }}
            >
              {articleData.title}
            </h2>

            {script && (
              <p className="text-lg text-foreground/90 max-w-2xl line-clamp-2 mb-4 drop-shadow-lg">
                {script.script?.substring(0, 150)}...
              </p>
            )}

            {settings?.includeSubtitles && script && (
              <div className="inline-flex px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm text-sm self-start">
                {script.scenes?.[0]?.text?.substring(0, 80)}...
              </div>
            )}
          </div>
        )}

        {/* Quality Badge */}
        {settings?.quality && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 text-xs font-medium">
            {settings.quality}
          </div>
        )}
      </div>

      {/* Stats Bar */}
      {script && (
        <div className="p-4 bg-background/30 border-t border-border/50">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Duration</div>
              <div className="text-sm font-semibold text-primary">
                {script.estimatedDuration}s
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Scenes</div>
              <div className="text-sm font-semibold text-primary">
                {script.scenes?.length || 0}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Words</div>
              <div className="text-sm font-semibold text-primary">
                {script.wordCount || 0}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Quality</div>
              <div className="text-sm font-semibold text-primary">
                {settings?.quality || '1080p'}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
