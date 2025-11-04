import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, Share2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ExportPanelProps {
  script?: unknown;
  articleData?: unknown;
}

export const ExportPanel = ({ script, articleData }: ExportPanelProps) => {
  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`, {
      description: 'This is a preview version. Full export will be available in production.'
    });
  };

  const handleShare = () => {
    toast.success('Share link copied!', {
      description: 'Anyone with this link can view your video project.'
    });
  };

  const canExport = script && articleData;

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Export & Share</h3>
        {canExport && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            Ready to export
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleExport('mp4')}
            disabled={!canExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            MP4 Video
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('json')}
            disabled={!canExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            JSON Data
          </Button>
        </div>

        <Button
          onClick={handleShare}
          disabled={!canExport}
          className="w-full gap-2 bg-gradient-to-r from-accent to-secondary hover:opacity-90"
        >
          <Share2 className="h-4 w-4" />
          Share Project
        </Button>
      </div>

      {canExport && (
        <div className="pt-4 border-t border-border/50 space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Video Quality</span>
            <span className="text-foreground font-medium">1080p HD</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Size</span>
            <span className="text-foreground font-medium">~{Math.ceil(script.estimatedDuration / 10)}MB</span>
          </div>
          <div className="flex justify-between">
            <span>Format</span>
            <span className="text-foreground font-medium">MP4 (H.264)</span>
          </div>
        </div>
      )}

      {!canExport && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Generate a script to enable export options</p>
        </div>
      )}
    </Card>
  );
};
