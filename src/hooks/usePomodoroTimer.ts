import { useState, useEffect, useCallback, useRef } from 'react';

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

export const usePomodoroTimer = (initialSettings: Partial<TimerSettings> = {}) => {
  const settings = { ...DEFAULT_SETTINGS, ...initialSettings };
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<TimerState>({
    timeRemaining: settings.workDuration,
    totalTime: settings.workDuration,
    isRunning: false,
    sessionType: 'work',
    completedPomodoros: 0,
    sessionsUntilLongBreak: settings.longBreakInterval,
  });

  const [timerSettings, setTimerSettings] = useState<TimerSettings>(settings);

  // Create audio context for notification
  useEffect(() => {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVFIU6S8rH9nWGZ2k6msi25maHWMo6qjjn1ze4qaoaGUhoGEjZWVnJuSjY2PkJOVlZOSkJCQkJGSkZKRkJCRkJGRkZGQkJGQkJCRkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Oj4+Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6OjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uKioqKioqKioqKioqKioqKioqKioqKioqKioqKiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEhISEhISEhISEhISEhISEhISEhISEhISEhISEg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf39/f39/f39/f39/f39/f39/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn59fX19fX19fX19fX19fX19fX19fX19fX19fX19fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHt7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7enp6enp6enp6enp6enp6enp6enp6enp6enp6enl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzcnJycnJycnJycnJycnJycnJycnJycnJycnJycnFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBvb29vb29vb29vb29vb29vb29vb29vb29vb29ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1sbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsa2tra2tra2tra2tra2tra2tra2tra2tra2tra2traWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWA=');
  }, []);

  const playNotification = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

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
          playNotification();
          
          // Session completed
          if (prev.sessionType === 'work') {
            const newCompleted = prev.completedPomodoros + 1;
            const sessionsUntilLong = prev.sessionsUntilLongBreak - 1;
            
            if (sessionsUntilLong === 0) {
              // Time for long break
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
              // Time for short break
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
            // Break completed, back to work
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
  }, [state.isRunning, timerSettings, playNotification]);

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
