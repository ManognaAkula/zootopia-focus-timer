import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls = ({ isRunning, onStart, onPause, onReset }: TimerControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-card border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
      >
        <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      <Button
        onClick={isRunning ? onPause : onStart}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full btn-zootopia bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all duration-300"
      >
        {isRunning ? (
          <Pause className="w-7 h-7 md:w-8 md:h-8" />
        ) : (
          <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" />
        )}
      </Button>

      <div className="w-12 h-12 md:w-14 md:h-14" /> {/* Spacer for symmetry */}
    </div>
  );
};

export default TimerControls;
