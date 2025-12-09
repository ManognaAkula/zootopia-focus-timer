import { Carrot } from 'lucide-react';

interface PomodoroCounterProps {
  count: number;
  maxDisplay?: number;
}

const PomodoroCounter = ({ count, maxDisplay = 8 }: PomodoroCounterProps) => {
  const displayCount = Math.min(count, maxDisplay);
  const extraCount = count - maxDisplay;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-nunito">
        Completed Pomodoros
      </span>
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {Array.from({ length: displayCount }).map((_, i) => (
          <div
            key={i}
            className="animate-scale-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Carrot 
              className="w-5 h-5 md:w-6 md:h-6 text-carrot drop-shadow-lg" 
              style={{ 
                filter: 'drop-shadow(0 0 4px hsl(20 95% 50% / 0.5))',
                transform: `rotate(${-15 + Math.random() * 30}deg)`
              }}
            />
          </div>
        ))}
        {extraCount > 0 && (
          <span className="text-sm font-bold text-carrot ml-1">+{extraCount}</span>
        )}
        {count === 0 && (
          <span className="text-sm text-muted-foreground">Start your first session!</span>
        )}
      </div>
    </div>
  );
};

export default PomodoroCounter;
