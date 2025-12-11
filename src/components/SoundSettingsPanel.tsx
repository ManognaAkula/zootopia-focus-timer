import { Volume2, VolumeX, Music } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { SoundSettings, NotificationSound } from '@/hooks/useSoundSettings';
import { cn } from '@/lib/utils';

interface SoundSettingsPanelProps {
  settings: SoundSettings;
  onUpdateSettings: (settings: Partial<SoundSettings>) => void;
  onToggleAmbient: (enabled: boolean) => void;
}

const soundOptions: { value: NotificationSound; label: string }[] = [
  { value: 'chime', label: 'Chime' },
  { value: 'bell', label: 'Bell' },
  { value: 'gentle', label: 'Gentle' },
  { value: 'none', label: 'None' },
];

const SoundSettingsPanel = ({ settings, onUpdateSettings, onToggleAmbient }: SoundSettingsPanelProps) => {
  return (
    <div className="space-y-6 border-t border-border/50 pt-6 mt-6">
      <h3 className="text-lg font-fredoka font-bold text-foreground flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-secondary" />
        Sound Settings
      </h3>

      {/* Notification Sound */}
      <div className="space-y-3">
        <label className="text-sm font-nunito text-muted-foreground">Notification Sound</label>
        <div className="flex gap-2 flex-wrap">
          {soundOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onUpdateSettings({ notificationSound: value })}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-nunito font-semibold transition-all duration-300",
                settings.notificationSound === value
                  ? "bg-secondary text-secondary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground glass-card"
              )}
            >
              {value === 'none' ? <VolumeX className="w-3 h-3" /> : label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Volume */}
      {settings.notificationSound !== 'none' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-nunito text-muted-foreground">Notification Volume</label>
            <span className="text-sm font-fredoka text-secondary">
              {Math.round(settings.notificationVolume * 100)}%
            </span>
          </div>
          <Slider
            value={[settings.notificationVolume * 100]}
            onValueChange={([value]) => onUpdateSettings({ notificationVolume: value / 100 })}
            min={0}
            max={100}
            step={5}
            className="cursor-pointer"
          />
        </div>
      )}

      {/* Ambient Sound */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-accent" />
            <label className="text-sm font-nunito text-muted-foreground">Ambient Sound</label>
          </div>
          <Switch
            checked={settings.ambientEnabled}
            onCheckedChange={onToggleAmbient}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Soft background sounds to help you focus
        </p>
      </div>

      {/* Ambient Volume */}
      {settings.ambientEnabled && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-nunito text-muted-foreground">Ambient Volume</label>
            <span className="text-sm font-fredoka text-accent">
              {Math.round(settings.ambientVolume * 100)}%
            </span>
          </div>
          <Slider
            value={[settings.ambientVolume * 100]}
            onValueChange={([value]) => onUpdateSettings({ ambientVolume: value / 100 })}
            min={0}
            max={100}
            step={5}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default SoundSettingsPanel;
