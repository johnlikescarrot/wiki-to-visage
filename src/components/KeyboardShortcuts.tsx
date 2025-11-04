import { useEffect } from 'react';
import { toast } from 'sonner';

interface KeyboardShortcutsProps {
  onPlay?: () => void;
  onSave?: () => void;
  onExport?: () => void;
}

export const useKeyboardShortcuts = ({ onPlay, onSave, onExport }: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S - Save project
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (onSave) {
          onSave();
          toast.success('Save shortcut triggered');
        }
      }

      // Cmd/Ctrl + E - Export
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        if (onExport) {
          onExport();
          toast.success('Export shortcut triggered');
        }
      }

      // Space - Play/Pause preview
      if (e.code === 'Space' && !isInputFocused()) {
        e.preventDefault();
        if (onPlay) {
          onPlay();
          toast.success('Preview toggled');
        }
      }

      // ? - Show keyboard shortcuts
      if (e.shiftKey && e.key === '?') {
        e.preventDefault();
        showShortcuts();
      }
    };

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.hasAttribute('contenteditable')
      );
    };

    const showShortcuts = () => {
      toast.info('Keyboard Shortcuts', {
        description: (
          <div className="space-y-1 text-xs">
            <div><kbd>Cmd/Ctrl + S</kbd> - Save Project</div>
            <div><kbd>Cmd/Ctrl + E</kbd> - Export Video</div>
            <div><kbd>Space</kbd> - Play/Pause Preview</div>
            <div><kbd>?</kbd> - Show Shortcuts</div>
          </div>
        ),
        duration: 5000,
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onPlay, onSave, onExport]);
};
