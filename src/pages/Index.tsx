import { usePomodoroTimer } from '@/hooks/usePomodoroTimer';
import { useStatistics } from '@/hooks/useStatistics';
import { useSoundSettings } from '@/hooks/useSoundSettings';
import TimerDisplay from '@/components/TimerDisplay';
import TimerControls from '@/components/TimerControls';
import SessionSelector from '@/components/SessionSelector';
import PomodoroCounter from '@/components/PomodoroCounter';
import CharacterDisplay from '@/components/CharacterDisplay';
import SettingsPanel from '@/components/SettingsPanel';
import StatisticsPanel from '@/components/StatisticsPanel';
import ZootopiaBackground from '@/components/ZootopiaBackground';
import ZPDBadge from '@/components/ZPDBadge';

const Index = () => {
  const { stats, recordPomodoro, getWeeklyData, resetStats } = useStatistics();
  const { settings: soundSettings, playNotification, toggleAmbient, updateSettings: updateSoundSettings } = useSoundSettings();

  const {
    timeRemaining,
    progress,
    isRunning,
    sessionType,
    completedPomodoros,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    switchSession,
    updateSettings,
  } = usePomodoroTimer(
    {},
    recordPomodoro,
    playNotification,
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ZootopiaBackground />
      <StatisticsPanel 
        stats={stats} 
        weeklyData={getWeeklyData()} 
        onReset={resetStats} 
      />
      <SettingsPanel 
        settings={settings} 
        soundSettings={soundSettings}
        onUpdateSettings={updateSettings} 
        onUpdateSoundSettings={updateSoundSettings}
        onToggleAmbient={toggleAmbient}
      />

      {/* Main content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <ZPDBadge />
          <h1 className="text-2xl md:text-4xl font-fredoka font-bold text-center">
            <span className="text-gradient-nick">Zoo</span>
            <span className="text-foreground">doro</span>
            <span className="text-gradient-judy"> Timer</span>
          </h1>
        </div>

        {/* Session selector */}
        <SessionSelector 
          currentSession={sessionType} 
          onSessionChange={switchSession} 
        />

        {/* Main timer area with characters */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 w-full">
          {/* Nick - Left side */}
          <div className="hidden md:block">
            <CharacterDisplay 
              sessionType={sessionType} 
              isRunning={isRunning} 
              position="left" 
            />
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <TimerDisplay
              timeRemaining={timeRemaining}
              progress={progress}
              sessionType={sessionType}
            />

            <TimerControls
              isRunning={isRunning}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
            />
          </div>

          {/* Judy - Right side */}
          <div className="hidden md:block">
            <CharacterDisplay 
              sessionType={sessionType} 
              isRunning={isRunning} 
              position="right" 
            />
          </div>
        </div>

        {/* Mobile characters */}
        <div className="flex md:hidden items-center justify-center gap-8 mt-4">
          <CharacterDisplay 
            sessionType={sessionType} 
            isRunning={isRunning} 
            position="left" 
          />
          <CharacterDisplay 
            sessionType={sessionType} 
            isRunning={isRunning} 
            position="right" 
          />
        </div>

        {/* Pomodoro counter */}
        <div className="mt-4 md:mt-6">
          <PomodoroCounter count={completedPomodoros} />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center">
        <p className="text-xs text-muted-foreground font-nunito">
          "Anyone can be productive!" - Inspired by Zootopia
        </p>
      </footer>
    </div>
  );
};

export default Index;
