import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Settings2, Music, ImageIcon, Type } from 'lucide-react';

interface VideoSettingsProps {
  settings: {
    aspectRatio: string;
    quality: string;
    includeMusic: boolean;
    musicVolume: number;
    includeSubtitles: boolean;
    transitionDuration: number;
    fontSize: number;
  };
  onSettingsChange: (settings: any) => void;
}

export const VideoSettings = ({ settings, onSettingsChange }: VideoSettingsProps) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Video Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Aspect Ratio */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Aspect Ratio</Label>
          <div className="grid grid-cols-3 gap-2">
            {['16:9', '9:16', '1:1'].map((ratio) => (
              <button
                key={ratio}
                onClick={() => updateSetting('aspectRatio', ratio)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  settings.aspectRatio === ratio
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Quality */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Video Quality</Label>
          <select
            value={settings.quality}
            onChange={(e) => updateSetting('quality', e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
          >
            <option value="720p">720p HD</option>
            <option value="1080p">1080p Full HD</option>
            <option value="4k">4K Ultra HD</option>
          </select>
        </div>

        {/* Music */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Background Music</Label>
            </div>
            <Switch
              checked={settings.includeMusic}
              onCheckedChange={(checked) => updateSetting('includeMusic', checked)}
            />
          </div>
          
          {settings.includeMusic && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Volume</span>
                <span>{settings.musicVolume}%</span>
              </div>
              <Slider
                value={[settings.musicVolume]}
                onValueChange={(value) => updateSetting('musicVolume', value[0])}
                min={0}
                max={100}
                step={5}
              />
            </div>
          )}
        </div>

        {/* Subtitles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Include Subtitles</Label>
          </div>
          <Switch
            checked={settings.includeSubtitles}
            onCheckedChange={(checked) => updateSetting('includeSubtitles', checked)}
          />
        </div>

        {/* Transitions */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <Label>Transition Duration</Label>
            <span className="text-muted-foreground">{settings.transitionDuration}s</span>
          </div>
          <Slider
            value={[settings.transitionDuration]}
            onValueChange={(value) => updateSetting('transitionDuration', value[0])}
            min={0}
            max={2}
            step={0.1}
          />
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <Label>Text Size</Label>
            <span className="text-muted-foreground">{settings.fontSize}px</span>
          </div>
          <Slider
            value={[settings.fontSize]}
            onValueChange={(value) => updateSetting('fontSize', value[0])}
            min={12}
            max={72}
            step={2}
          />
        </div>
      </div>
    </Card>
  );
};
