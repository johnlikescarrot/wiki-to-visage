import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Wand2, Zap, Film } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  style: {
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    transitionStyle: string;
    musicGenre?: string;
  };
}

const templates: Template[] = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Epic, dramatic style with sweeping transitions',
    icon: Film,
    style: {
      fontFamily: 'serif',
      primaryColor: '#FFD700',
      secondaryColor: '#1A1A2E',
      transitionStyle: 'fade-zoom',
      musicGenre: 'epic'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimalist design with smooth animations',
    icon: Sparkles,
    style: {
      fontFamily: 'sans-serif',
      primaryColor: '#00D9FF',
      secondaryColor: '#FF6B6B',
      transitionStyle: 'slide',
      musicGenre: 'electronic'
    }
  },
  {
    id: 'educational',
    name: 'Educational',
    description: 'Clear, informative layout perfect for learning',
    icon: Wand2,
    style: {
      fontFamily: 'system-ui',
      primaryColor: '#4CAF50',
      secondaryColor: '#2196F3',
      transitionStyle: 'cut',
      musicGenre: 'ambient'
    }
  },
  {
    id: 'dynamic',
    name: 'Dynamic',
    description: 'High-energy with fast-paced transitions',
    icon: Zap,
    style: {
      fontFamily: 'sans-serif',
      primaryColor: '#FF3366',
      secondaryColor: '#9933FF',
      transitionStyle: 'flash',
      musicGenre: 'upbeat'
    }
  }
];

interface TemplateSelectorProps {
  onTemplateSelect: (template: Template) => void;
  selectedTemplateId?: string;
}

export const TemplateSelector = ({ onTemplateSelect, selectedTemplateId }: TemplateSelectorProps) => {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div>
        <h3 className="text-lg font-semibold mb-2">Video Templates</h3>
        <p className="text-sm text-muted-foreground">
          Choose a professional template to instantly style your video
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplateId === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                isSelected
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                  : 'border-border/50 hover:border-primary/50 bg-background/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-primary/20' : 'bg-muted/50'
                }`}>
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-card"
                      style={{ backgroundColor: template.style.primaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-card"
                      style={{ backgroundColor: template.style.secondaryColor }}
                    />
                    <span className="text-muted-foreground ml-auto">Active</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};
