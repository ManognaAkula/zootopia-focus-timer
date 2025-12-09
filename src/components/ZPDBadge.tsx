import { Shield } from 'lucide-react';

const ZPDBadge = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full">
      <Shield className="w-5 h-5 text-zpd-gold" />
      <span className="text-sm font-fredoka tracking-wider text-foreground">
        <span className="text-zpd-gold">ZPD</span> Study Division
      </span>
    </div>
  );
};

export default ZPDBadge;
