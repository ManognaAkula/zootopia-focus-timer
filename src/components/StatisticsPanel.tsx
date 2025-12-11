import { useState } from 'react';
import { BarChart3, X, Flame, Trophy, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Statistics, DailyStats } from '@/hooks/useStatistics';

interface StatisticsPanelProps {
  stats: Statistics;
  weeklyData: DailyStats[];
  onReset: () => void;
}

const StatisticsPanel = ({ stats, weeklyData, onReset }: StatisticsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const maxPomodoros = Math.max(...weeklyData.map(d => d.completedPomodoros), 1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 w-10 h-10 rounded-full glass-card border-border/50 hover:border-secondary/50 hover:bg-secondary/10"
      >
        <BarChart3 className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-fredoka font-bold text-foreground">Your Statistics</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card rounded-xl p-4 text-center">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-fredoka font-bold text-foreground">{stats.totalPomodoros}</div>
                <div className="text-xs text-muted-foreground">Total Pomodoros</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-fredoka font-bold text-foreground">
                  {Math.round(stats.totalFocusMinutes / 60)}h
                </div>
                <div className="text-xs text-muted-foreground">Focus Time</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Flame className="w-6 h-6 text-carrot mx-auto mb-2" />
                <div className="text-2xl font-fredoka font-bold text-foreground">{stats.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-zpd-gold mx-auto mb-2" />
                <div className="text-2xl font-fredoka font-bold text-foreground">{stats.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="mb-6">
              <h3 className="text-sm font-nunito text-muted-foreground mb-3">This Week</h3>
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyData.map((day, i) => (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center justify-end h-24">
                      <div
                        className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all duration-500"
                        style={{
                          height: `${(day.completedPomodoros / maxPomodoros) * 100}%`,
                          minHeight: day.completedPomodoros > 0 ? '8px' : '0px',
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{formatDate(day.date)}</span>
                    <span className="text-xs font-bold text-foreground">{day.completedPomodoros}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('Reset all statistics? This cannot be undone.')) {
                    onReset();
                  }
                }}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Reset Statistics
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsPanel;
