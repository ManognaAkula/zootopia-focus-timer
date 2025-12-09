import { SessionType } from '@/hooks/usePomodoroTimer';
import { cn } from '@/lib/utils';

interface SessionSelectorProps {
  currentSession: SessionType;
  onSessionChange: (session: SessionType) => void;
}

const sessions: { type: SessionType; label: string }[] = [
  { type: 'work', label: 'Focus' },
  { type: 'shortBreak', label: 'Short Break' },
  { type: 'longBreak', label: 'Long Break' },
];

const SessionSelector = ({ currentSession, onSessionChange }: SessionSelectorProps) => {
  return (
    <div className="flex gap-2 p-1 rounded-full glass-card">
      {sessions.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => onSessionChange(type)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-nunito font-semibold transition-all duration-300",
            currentSession === type
              ? type === 'work'
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : type === 'shortBreak'
                  ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30"
                  : "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SessionSelector;
