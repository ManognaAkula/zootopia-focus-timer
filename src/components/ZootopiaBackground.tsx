import cityscape from '@/assets/zootopia-cityscape.png';

const ZootopiaBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-city-gradient" />
      
      {/* Cityscape image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${cityscape})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      
      {/* Animated city lights */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60 animate-pulse-slow"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${40 + Math.random() * 40}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(250 45% 8% / 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default ZootopiaBackground;
