import { useState } from 'react';
import { WikiInput } from '@/components/WikiInput';
import { ScriptEditor } from '@/components/ScriptEditor';
import { VideoPreview } from '@/components/VideoPreview';
import { ExportPanel } from '@/components/ExportPanel';
import { Sparkles, Video, Zap } from 'lucide-react';

const Index = () => {
  const [articleData, setArticleData] = useState<any>(null);
  const [script, setScript] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Video className="h-6 w-6 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  WikiVideo AI
                </h1>
                <p className="text-xs text-muted-foreground">Transform knowledge into cinematic videos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
                <Zap className="h-3 w-3 text-primary" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10">
                <Sparkles className="h-3 w-3 text-accent" />
                <span>Production Ready</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!articleData ? (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="text-center space-y-4 py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                The Ultimate Wikipedia to Video AI Tool
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Turn Wikipedia Into
                <br />
                Stunning Videos
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform any Wikipedia article into engaging, professional videos with AI-powered narration,
                intelligent scene generation, and cinematic visuals.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10 animate-pulse-glow" />
              <WikiInput onParse={setArticleData} />
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">AI Script Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI analyzes Wikipedia content and creates engaging, natural-sounding video scripts in seconds.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Smart Scene Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically matches script segments with relevant visuals and creates a coherent video timeline.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold">Professional Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Export production-ready videos in multiple formats with customizable voices, pacing, and styles.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="lg:col-span-2 space-y-6">
              <VideoPreview articleData={articleData} script={script} />
              <ScriptEditor articleData={articleData} onScriptGenerated={setScript} />
            </div>
            
            <div className="space-y-6">
              <ExportPanel script={script} articleData={articleData} />
              
              <div className="p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 space-y-3">
                <h4 className="font-semibold">Article Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium text-right max-w-[200px] truncate">{articleData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sections</span>
                    <span className="font-medium">{articleData.sections?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-primary font-medium">Parsed ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Built with Lovable AI • Powered by Advanced Language Models</p>
            <p>Transform knowledge into engaging videos</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
