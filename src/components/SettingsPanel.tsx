import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimerSettings } from '@/hooks/usePomodoroTimer';
import { Slider } from '@/components/ui/slider';

interface SettingsPanelProps {
  settings: TimerSettings;
  onUpdateSettings: (settings: Partial<TimerSettings>) => void;
}

const SettingsPanel = ({ settings, onUpdateSettings }: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatMinutes = (seconds: number) => Math.round(seconds / 60);
  const toSeconds = (minutes: number) => minutes * 60;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 w-10 h-10 rounded-full glass-card border-border/50 hover:border-primary/50 hover:bg-primary/10"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md glass-card rounded-2xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-fredoka font-bold text-foreground">Timer Settings</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Work Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-nunito text-muted-foreground">Focus Duration</label>
                  <span className="text-lg font-fredoka text-primary">{formatMinutes(settings.workDuration)} min</span>
                </div>
                <Slider
                  value={[formatMinutes(settings.workDuration)]}
                  onValueChange={([value]) => onUpdateSettings({ workDuration: toSeconds(value) })}
                  min={1}
                  max={60}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Short Break Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-nunito text-muted-foreground">Short Break</label>
                  <span className="text-lg font-fredoka text-secondary">{formatMinutes(settings.shortBreakDuration)} min</span>
                </div>
                <Slider
                  value={[formatMinutes(settings.shortBreakDuration)]}
                  onValueChange={([value]) => onUpdateSettings({ shortBreakDuration: toSeconds(value) })}
                  min={1}
                  max={30}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Long Break Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-nunito text-muted-foreground">Long Break</label>
                  <span className="text-lg font-fredoka text-accent">{formatMinutes(settings.longBreakDuration)} min</span>
                </div>
                <Slider
                  value={[formatMinutes(settings.longBreakDuration)]}
                  onValueChange={([value]) => onUpdateSettings({ longBreakDuration: toSeconds(value) })}
                  min={5}
                  max={45}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Long Break Interval */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-nunito text-muted-foreground">Sessions until Long Break</label>
                  <span className="text-lg font-fredoka text-carrot">{settings.longBreakInterval}</span>
                </div>
                <Slider
                  value={[settings.longBreakInterval]}
                  onValueChange={([value]) => onUpdateSettings({ longBreakInterval: value })}
                  min={2}
                  max={8}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <p className="mt-6 text-xs text-center text-muted-foreground font-nunito">
              Settings apply to the next session
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;
