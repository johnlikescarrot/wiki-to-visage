import { useState } from 'react';
import { WikiInput } from '@/components/WikiInput';
import { ScriptEditor } from '@/components/ScriptEditor';
import { EnhancedPreview } from '@/components/EnhancedPreview';
import { ExportPanel } from '@/components/ExportPanel';
import { TimelineEditor } from '@/components/TimelineEditor';
import { TemplateSelector } from '@/components/TemplateSelector';
import { VideoSettings } from '@/components/VideoSettings';
import { ProjectManager } from '@/components/ProjectManager';
import { Sparkles, Video, Zap, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [articleData, setArticleData] = useState<any>(null);
  const [script, setScript] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [videoSettings, setVideoSettings] = useState({
    aspectRatio: '16:9',
    quality: '1080p',
    includeMusic: false,
    musicVolume: 30,
    includeSubtitles: true,
    transitionDuration: 0.5,
    fontSize: 24,
  });

  const handleScriptGenerated = (generatedScript: any) => {
    setScript(generatedScript);
  };

  const handleScenesUpdate = (updatedScenes: any[]) => {
    if (script) {
      setScript({
        ...script,
        scenes: updatedScenes,
        estimatedDuration: updatedScenes.reduce((acc, scene) => acc + scene.duration, 0)
      });
    }
  };

  const handleLoadProject = (projectData: any) => {
    setArticleData(projectData.articleData);
    setScript(projectData.script);
    if (projectData.settings) {
      setVideoSettings(projectData.settings);
    }
  };

  const currentProject = articleData ? {
    title: articleData.title,
    url: articleData.url || '',
    articleData,
    script,
    settings: videoSettings,
  } : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Video className="h-6 w-6 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  WikiVideo AI Pro
                </h1>
                <p className="text-xs text-muted-foreground">Professional Wikipedia to Video Studio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="h-3 w-3 text-primary" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
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
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="text-center space-y-4 py-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                The Ultimate Wikipedia to Video AI Tool
              </div>
              <h2 className="text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
                Transform Wikipedia
                <br />
                Into Cinematic Videos
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Professional video creation powered by advanced AI. Generate scripts, customize scenes, 
                and export broadcast-quality videos in minutes.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl -z-10 animate-pulse-glow" />
              <WikiInput onParse={setArticleData} />
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-3 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">AI Script Generation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Advanced AI analyzes Wikipedia content and creates engaging, natural-sounding video scripts with scene-by-scene breakdowns.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-3 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shadow-lg shadow-accent/20">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Timeline Editor</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Professional timeline editing with drag-and-drop scenes, precise duration control, and visual customization.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-3 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center shadow-lg shadow-secondary/20">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold">Pro Templates</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Choose from professional templates with customizable styles, transitions, and music to match your brand.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Bar with Project Name */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-card to-card/50 border border-border/50">
              <div className="flex items-center gap-3">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold text-lg">{articleData.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {script ? `${script.scenes?.length || 0} scenes • ${script.estimatedDuration}s` : 'Waiting for script...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Editor Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Preview */}
              <div className="lg:col-span-2 space-y-6">
                <EnhancedPreview 
                  articleData={articleData} 
                  script={script}
                  template={selectedTemplate}
                  settings={videoSettings}
                />
                
                {script?.scenes && (
                  <TimelineEditor 
                    scenes={script.scenes}
                    onScenesUpdate={handleScenesUpdate}
                  />
                )}

                <Tabs defaultValue="script" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="script">Script Editor</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                  </TabsList>
                  <TabsContent value="script" className="mt-4">
                    <ScriptEditor 
                      articleData={articleData} 
                      onScriptGenerated={handleScriptGenerated} 
                    />
                  </TabsContent>
                  <TabsContent value="templates" className="mt-4">
                    <TemplateSelector 
                      onTemplateSelect={setSelectedTemplate}
                      selectedTemplateId={selectedTemplate?.id}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Right Column - Controls */}
              <div className="space-y-6">
                <VideoSettings 
                  settings={videoSettings}
                  onSettingsChange={setVideoSettings}
                />
                
                <ExportPanel script={script} articleData={articleData} />
                
                <ProjectManager 
                  currentProject={currentProject}
                  onLoadProject={handleLoadProject}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 bg-card/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Built with Lovable AI • Powered by Advanced Language Models</p>
            <div className="flex items-center gap-4">
              <span>Transform knowledge into engaging videos</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                <Sparkles className="h-3 w-3" />
                Production Ready
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
