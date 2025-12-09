import { SessionType } from '@/hooks/usePomodoroTimer';

interface TimerDisplayProps {
  timeRemaining: number;
  progress: number;
  sessionType: SessionType;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TimerDisplay = ({ timeRemaining, progress, sessionType }: TimerDisplayProps) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work':
        return 'stroke-primary';
      case 'shortBreak':
        return 'stroke-secondary';
      case 'longBreak':
        return 'stroke-accent';
    }
  };

  const getGlowClass = () => {
    switch (sessionType) {
      case 'work':
        return 'glow-orange';
      case 'shortBreak':
      case 'longBreak':
        return 'glow-purple';
    }
  };

  return (
    <div className={`relative w-64 h-64 md:w-80 md:h-80 ${getGlowClass()} rounded-full transition-all duration-500`}>
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
      
      {/* Glass card background */}
      <div className="absolute inset-2 rounded-full glass-card" />
      
      {/* SVG Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-muted/30"
        />
        
        {/* Progress ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className={`${getSessionColor()} transition-all duration-300`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
        
        {/* Glow ring overlay */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className={`${getSessionColor()} opacity-30 blur-sm`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>

      {/* Timer text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl md:text-6xl font-fredoka font-bold text-foreground tracking-wider">
          {formatTime(timeRemaining)}
        </span>
        <span className="text-sm md:text-base text-muted-foreground font-nunito mt-2 uppercase tracking-widest">
          {sessionType === 'work' ? 'Focus Time' : sessionType === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </span>
      </div>
    </div>
  );
};

export default TimerDisplay;
