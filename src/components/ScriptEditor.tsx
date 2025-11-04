import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Wand2, RefreshCw, Copy } from 'lucide-react';
import { toast } from 'sonner';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface Scene {
  text: string;
  duration: number;
  visualSuggestion: string;
}

interface ScriptEditorProps {
  articleData: unknown;
  onScriptGenerated: (script: unknown) => void;
}

export const ScriptEditor = ({ articleData, onScriptGenerated }: ScriptEditorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<unknown>(null);
  const [duration, setDuration] = useState(60);
  const [style, setStyle] = useState('informative');
  const { theme } = useTheme();

  const generateScript = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-script`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            content: articleData.fullContent || articleData.summary,
            title: articleData.title,
            duration,
            style,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate script');
      }

      const data = await response.json();
      setGeneratedScript(data);
      onScriptGenerated(data);
      toast.success('Script generated successfully!');
    } catch (error) {
      console.error('Script generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate script');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI Script Generator</h3>
          {generatedScript && (
            <Button
              variant="outline"
              size="sm"
              onClick={generateScript}
              disabled={isGenerating}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full mt-1.5 h-10 rounded-md border border-border bg-background px-3 text-sm"
              disabled={isGenerating}
            >
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
              <option value={90}>90 seconds</option>
              <option value={120}>2 minutes</option>
              <option value={180}>3 minutes</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full mt-1.5 h-10 rounded-md border border-border bg-background px-3 text-sm"
              disabled={isGenerating}
            >
              <option value="informative">Informative</option>
              <option value="engaging">Engaging</option>
              <option value="documentary">Documentary</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        </div>

        {!generatedScript ? (
          <Button
            onClick={generateScript}
            disabled={isGenerating}
            className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating Script...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Video Script
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-background/50 p-3">
                <div className="text-muted-foreground">Word Count</div>
                <div className="text-lg font-semibold text-primary">{generatedScript.wordCount}</div>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <div className="text-muted-foreground">Duration</div>
                <div className="text-lg font-semibold text-primary">{generatedScript.estimatedDuration}s</div>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <div className="text-muted-foreground">Scenes</div>
                <div className="text-lg font-semibold text-primary">{generatedScript.scenes?.length || 0}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-muted-foreground">Generated Script</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedScript.script);
                    toast.success('Script copied to clipboard!');
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="mt-1.5 rounded-md border border-border/50 overflow-hidden">
                <Editor
                  height="200px"
                  language="markdown"
                  value={generatedScript.script}
                  onChange={(value) => setGeneratedScript({ ...generatedScript, script: value })}
                  theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
