import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Save, FolderOpen, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  title: string;
  wikipedia_url: string;
  created_at: string;
  updated_at: string;
}

interface ProjectManagerProps {
  currentProject: {
    title: string;
    url: string;
    articleData: any;
    script: any;
    settings: any;
  } | null;
  onLoadProject: (projectData: any) => void;
}

export const ProjectManager = ({ currentProject, onLoadProject }: ProjectManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const saveProject = async () => {
    if (!currentProject) {
      toast.error('No project to save');
      return;
    }

    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: projectName,
          wikipedia_url: currentProject.url,
          article_data: currentProject.articleData,
          script_data: currentProject.script,
          settings: currentProject.settings,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Project saved successfully!');
      setProjectName('');
      await loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProject = async (projectId: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;

      onLoadProject({
        url: data.wikipedia_url,
        articleData: data.article_data,
        script: data.script_data,
        settings: data.settings,
      });

      toast.success(`Loaded: ${data.title}`);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast.success('Project deleted');
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Manager</h3>
        <FolderOpen className="h-5 w-5 text-primary" />
      </div>

      {/* Save Current Project */}
      {currentProject && (
        <div className="space-y-3 pb-4 border-b border-border/50">
          <Input
            placeholder="Project name..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-background/50"
          />
          <Button
            onClick={saveProject}
            disabled={isLoading || !projectName.trim()}
            className="w-full gap-2"
          >
            <Save className="h-4 w-4" />
            Save Current Project
          </Button>
        </div>
      )}

      {/* Recent Projects */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Recent Projects</h4>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No saved projects yet
          </p>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm truncate mb-1">
                      {project.title}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(project.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => loadProject(project.id)}
                      disabled={isLoading}
                    >
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
