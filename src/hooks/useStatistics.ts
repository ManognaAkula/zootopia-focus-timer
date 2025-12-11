import { useState, useEffect, useCallback } from 'react';

export interface DailyStats {
  date: string;
  completedPomodoros: number;
  totalFocusMinutes: number;
}

export interface Statistics {
  totalPomodoros: number;
  totalFocusMinutes: number;
  currentStreak: number;
  longestStreak: number;
  dailyStats: DailyStats[];
}

const STORAGE_KEY = 'zoodoro-statistics';

const getDefaultStats = (): Statistics => ({
  totalPomodoros: 0,
  totalFocusMinutes: 0,
  currentStreak: 0,
  longestStreak: 0,
  dailyStats: [],
});

const getTodayString = () => new Date().toISOString().split('T')[0];

export const useStatistics = () => {
  const [stats, setStats] = useState<Statistics>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultStats();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const recordPomodoro = useCallback((focusMinutes: number) => {
    setStats(prev => {
      const today = getTodayString();
      const existingDayIndex = prev.dailyStats.findIndex(d => d.date === today);
      
      let newDailyStats = [...prev.dailyStats];
      if (existingDayIndex >= 0) {
        newDailyStats[existingDayIndex] = {
          ...newDailyStats[existingDayIndex],
          completedPomodoros: newDailyStats[existingDayIndex].completedPomodoros + 1,
          totalFocusMinutes: newDailyStats[existingDayIndex].totalFocusMinutes + focusMinutes,
        };
      } else {
        newDailyStats.push({
          date: today,
          completedPomodoros: 1,
          totalFocusMinutes: focusMinutes,
        });
      }

      // Keep only last 30 days
      newDailyStats = newDailyStats
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30);

      // Calculate streak
      let currentStreak = 0;
      const sortedDates = newDailyStats.map(d => d.date).sort().reverse();
      const todayDate = new Date(today);
      
      for (let i = 0; i < sortedDates.length; i++) {
        const checkDate = new Date(todayDate);
        checkDate.setDate(checkDate.getDate() - i);
        const checkString = checkDate.toISOString().split('T')[0];
        
        if (sortedDates.includes(checkString)) {
          currentStreak++;
        } else {
          break;
        }
      }

      return {
        totalPomodoros: prev.totalPomodoros + 1,
        totalFocusMinutes: prev.totalFocusMinutes + focusMinutes,
        currentStreak,
        longestStreak: Math.max(prev.longestStreak, currentStreak),
        dailyStats: newDailyStats,
      };
    });
  }, []);

  const getWeeklyData = useCallback(() => {
    const last7Days: DailyStats[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const existing = stats.dailyStats.find(d => d.date === dateString);
      last7Days.push(existing || {
        date: dateString,
        completedPomodoros: 0,
        totalFocusMinutes: 0,
      });
    }
    
    return last7Days;
  }, [stats.dailyStats]);

  const resetStats = useCallback(() => {
    setStats(getDefaultStats());
  }, []);

  return {
    stats,
    recordPomodoro,
    getWeeklyData,
    resetStats,
  };
};
