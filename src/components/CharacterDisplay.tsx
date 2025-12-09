import { useState, useEffect } from 'react';
import { SessionType } from '@/hooks/usePomodoroTimer';
import { Quote, workQuotes, breakQuotes, getRandomQuote } from '@/data/zootopiaQuotes';
import nickFocused from '@/assets/nick-focused.png';
import nickRelaxed from '@/assets/nick-relaxed.png';
import judyEnthusiastic from '@/assets/judy-enthusiastic.png';

interface CharacterDisplayProps {
  sessionType: SessionType;
  isRunning: boolean;
  position: 'left' | 'right';
}

const CharacterDisplay = ({ sessionType, isRunning, position }: CharacterDisplayProps) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const isNick = position === 'left';
  const isBreak = sessionType !== 'work';

  const getCharacterImage = () => {
    if (isNick) {
      return isBreak ? nickRelaxed : nickFocused;
    }
    return judyEnthusiastic;
  };

  const handleClick = () => {
    const quotes = isBreak ? breakQuotes : workQuotes;
    const filteredQuotes = quotes.filter(q => 
      isNick ? q.character === 'nick' : q.character === 'judy'
    );
    setQuote(getRandomQuote(filteredQuotes.length > 0 ? filteredQuotes : quotes));
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 4000);
  };

  // Show random quote when session changes
  useEffect(() => {
    const quotes = isBreak ? breakQuotes : workQuotes;
    const filteredQuotes = quotes.filter(q => 
      isNick ? q.character === 'nick' : q.character === 'judy'
    );
    if (filteredQuotes.length > 0) {
      setQuote(getRandomQuote(filteredQuotes));
      setShowQuote(true);
      const timer = setTimeout(() => setShowQuote(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [sessionType, isNick, isBreak]);

  return (
    <div 
      className={`relative flex flex-col items-center cursor-pointer group ${
        position === 'left' ? 'animate-wiggle' : 'animate-bounce-slow'
      }`}
      onClick={handleClick}
    >
      {/* Speech bubble */}
      {showQuote && quote && (
        <div 
          className={`absolute -top-4 ${position === 'left' ? 'left-0' : 'right-0'} 
            w-48 md:w-56 p-3 glass-card rounded-2xl animate-fade-in z-10
            ${position === 'left' ? 'rounded-bl-none' : 'rounded-br-none'}`}
        >
          <p className="text-xs md:text-sm text-foreground font-nunito leading-relaxed">
            "{quote.text}"
          </p>
          <div className={`absolute bottom-0 ${position === 'left' ? '-left-0' : '-right-0'} 
            w-0 h-0 border-l-8 border-r-8 border-t-8 
            border-l-transparent border-r-transparent border-t-card/40
            translate-y-full ${position === 'left' ? 'rotate-45 -translate-x-1' : '-rotate-45 translate-x-1'}`} 
          />
        </div>
      )}

      {/* Character image */}
      <div className={`relative w-32 h-40 md:w-40 md:h-52 transition-transform duration-300 
        group-hover:scale-105 ${isRunning && !isBreak ? 'opacity-90' : 'opacity-100'}`}>
        <img
          src={getCharacterImage()}
          alt={isNick ? 'Nick Wilde' : 'Judy Hopps'}
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        
        {/* Character glow effect */}
        <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 -z-10
          ${isNick ? 'bg-nick-orange' : 'bg-judy-lavender'}`} 
        />
      </div>

      {/* Character name */}
      <span className={`mt-2 text-xs font-fredoka tracking-wide
        ${isNick ? 'text-nick-orange' : 'text-judy-lavender'}`}>
        {isNick ? 'Nick Wilde' : 'Judy Hopps'}
      </span>

      {/* Click hint */}
      <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        Click for a quote!
      </span>
    </div>
  );
};

export default CharacterDisplay;
