import { type LucideIcon } from 'lucide-react';

interface SustainabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

const SustainabilityCard = ({ 
  icon: Icon, 
  title, 
  description, 
  metric, 
  metricLabel 
}: SustainabilityCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-accent/10 text-accent mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        {/* Metric (optional) */}
        {metric && (
          <div className="pt-4 border-t border-border/50">
            <div className="text-2xl font-bold text-accent">{metric}</div>
            {metricLabel && (
              <span className="text-sm text-muted-foreground">{metricLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainabilityCard;
