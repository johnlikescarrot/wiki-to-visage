import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Play, Pause, SkipBack, SkipForward, Scissors, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Scene {
  text: string;
  duration: number;
  visualSuggestion: string;
}

interface TimelineEditorProps {
  scenes: Scene[];
  onScenesUpdate: (scenes: Scene[]) => void;
}

export const TimelineEditor = ({ scenes, onScenesUpdate }: TimelineEditorProps) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [playheadPosition, setPlayheadPosition] = useState(0);

  const totalDuration = scenes.reduce((acc, scene) => acc + scene.duration, 0);

  const handleSceneDurationChange = (index: number, newDuration: number) => {
    const updatedScenes = [...scenes];
    updatedScenes[index] = { ...updatedScenes[index], duration: newDuration };
    onScenesUpdate(updatedScenes);
  };

  const handleSceneTextChange = (index: number, newText: string) => {
    const updatedScenes = [...scenes];
    updatedScenes[index] = { ...updatedScenes[index], text: newText };
    onScenesUpdate(updatedScenes);
  };

  const handleDeleteScene = (index: number) => {
    if (scenes.length <= 1) {
      toast.error('Cannot delete the last scene');
      return;
    }
    const updatedScenes = scenes.filter((_, i) => i !== index);
    onScenesUpdate(updatedScenes);
    toast.success('Scene deleted');
  };

  const handleSplitScene = (index: number) => {
    const scene = scenes[index];
    const midPoint = Math.floor(scene.text.length / 2);
    const newScenes = [...scenes];
    
    newScenes.splice(index, 1, 
      {
        text: scene.text.substring(0, midPoint),
        duration: scene.duration / 2,
        visualSuggestion: scene.visualSuggestion
      },
      {
        text: scene.text.substring(midPoint),
        duration: scene.duration / 2,
        visualSuggestion: scene.visualSuggestion
      }
    );
    
    onScenesUpdate(newScenes);
    toast.success('Scene split');
  };

  const getScenePosition = (sceneIndex: number) => {
    let position = 0;
    for (let i = 0; i < sceneIndex; i++) {
      position += scenes[i].duration;
    }
    return position;
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Timeline Editor</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Total: {totalDuration}s</span>
          <span>•</span>
          <span>{scenes.length} scenes</span>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="space-y-3">
        <div className="relative h-20 bg-background/50 rounded-lg overflow-hidden">
          {/* Scenes */}
          {scenes.map((scene, index) => {
            const position = getScenePosition(index);
            const width = (scene.duration / totalDuration) * 100;
            
            return (
              <div
                key={index}
                onClick={() => setSelectedSceneIndex(index)}
                className={`absolute top-0 h-full cursor-pointer transition-all hover:opacity-90 ${
                  selectedSceneIndex === index
                    ? 'ring-2 ring-primary z-10'
                    : 'hover:ring-1 hover:ring-primary/50'
                }`}
                style={{
                  left: `${(position / totalDuration) * 100}%`,
                  width: `${width}%`,
                  background: `linear-gradient(135deg, hsl(${190 + index * 20} 70% 50% / 0.3), hsl(${190 + index * 20} 70% 60% / 0.5))`
                }}
              >
                <div className="p-2 h-full flex flex-col justify-between">
                  <div className="text-xs font-medium truncate">
                    Scene {index + 1}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {scene.duration}s
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-secondary z-20 pointer-events-none"
            style={{ left: `${(playheadPosition / totalDuration) * 100}%` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button size="sm" variant="outline">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" variant="outline">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Scene Editor */}
      {scenes[selectedSceneIndex] && (
        <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Scene {selectedSceneIndex + 1} Editor</h4>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSplitScene(selectedSceneIndex)}
                className="gap-2"
              >
                <Scissors className="h-3 w-3" />
                Split
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeleteScene(selectedSceneIndex)}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Scene Text
              </label>
              <Input
                value={scenes[selectedSceneIndex].text}
                onChange={(e) => handleSceneTextChange(selectedSceneIndex, e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Duration: {scenes[selectedSceneIndex].duration}s
              </label>
              <Slider
                value={[scenes[selectedSceneIndex].duration]}
                onValueChange={(value) => handleSceneDurationChange(selectedSceneIndex, value[0])}
                min={1}
                max={30}
                step={0.5}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Visual Suggestion
              </label>
              <Input
                value={scenes[selectedSceneIndex].visualSuggestion}
                onChange={(e) => {
                  const updatedScenes = [...scenes];
                  updatedScenes[selectedSceneIndex] = {
                    ...updatedScenes[selectedSceneIndex],
                    visualSuggestion: e.target.value
                  };
                  onScenesUpdate(updatedScenes);
                }}
                className="bg-background/50"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
