import { useState, useEffect, useCallback } from 'react';

export type SessionType = 'work' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export interface TimerState {
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
  sessionType: SessionType;
  completedPomodoros: number;
  sessionsUntilLongBreak: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
};

export const usePomodoroTimer = (
  initialSettings: Partial<TimerSettings> = {},
  onPomodoroComplete?: (focusMinutes: number) => void,
  onSessionEnd?: () => void,
) => {
  const settings = { ...DEFAULT_SETTINGS, ...initialSettings };

  const [state, setState] = useState<TimerState>({
    timeRemaining: settings.workDuration,
    totalTime: settings.workDuration,
    isRunning: false,
    sessionType: 'work',
    completedPomodoros: 0,
    sessionsUntilLongBreak: settings.longBreakInterval,
  });

  const [timerSettings, setTimerSettings] = useState<TimerSettings>(settings);

  const getSessionDuration = useCallback((type: SessionType) => {
    switch (type) {
      case 'work':
        return timerSettings.workDuration;
      case 'shortBreak':
        return timerSettings.shortBreakDuration;
      case 'longBreak':
        return timerSettings.longBreakDuration;
    }
  }, [timerSettings]);

  const startTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeRemaining: getSessionDuration(prev.sessionType),
      totalTime: getSessionDuration(prev.sessionType),
      isRunning: false,
    }));
  }, [getSessionDuration]);

  const switchSession = useCallback((type: SessionType) => {
    const duration = getSessionDuration(type);
    setState(prev => ({
      ...prev,
      sessionType: type,
      timeRemaining: duration,
      totalTime: duration,
      isRunning: false,
    }));
  }, [getSessionDuration]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setTimerSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          onSessionEnd?.();
          
          // Session completed
          if (prev.sessionType === 'work') {
            const focusMinutes = Math.round(timerSettings.workDuration / 60);
            onPomodoroComplete?.(focusMinutes);
            
            const newCompleted = prev.completedPomodoros + 1;
            const sessionsUntilLong = prev.sessionsUntilLongBreak - 1;
            
            if (sessionsUntilLong === 0) {
              const duration = timerSettings.longBreakDuration;
              return {
                ...prev,
                timeRemaining: duration,
                totalTime: duration,
                isRunning: false,
                sessionType: 'longBreak',
                completedPomodoros: newCompleted,
                sessionsUntilLongBreak: timerSettings.longBreakInterval,
              };
            } else {
              const duration = timerSettings.shortBreakDuration;
              return {
                ...prev,
                timeRemaining: duration,
                totalTime: duration,
                isRunning: false,
                sessionType: 'shortBreak',
                completedPomodoros: newCompleted,
                sessionsUntilLongBreak: sessionsUntilLong,
              };
            }
          } else {
            const duration = timerSettings.workDuration;
            return {
              ...prev,
              timeRemaining: duration,
              totalTime: duration,
              isRunning: false,
              sessionType: 'work',
            };
          }
        }
        
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, timerSettings, onPomodoroComplete, onSessionEnd]);

  // Update timer when settings change
  useEffect(() => {
    if (!state.isRunning) {
      const duration = getSessionDuration(state.sessionType);
      setState(prev => ({
        ...prev,
        timeRemaining: duration,
        totalTime: duration,
      }));
    }
  }, [timerSettings, state.sessionType, state.isRunning, getSessionDuration]);

  const progress = ((state.totalTime - state.timeRemaining) / state.totalTime) * 100;

  return {
    ...state,
    progress,
    settings: timerSettings,
    startTimer,
    pauseTimer,
    resetTimer,
    switchSession,
    updateSettings,
  };
};
