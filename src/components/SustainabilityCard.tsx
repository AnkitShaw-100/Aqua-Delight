import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SustainabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  impact?: string;
  metric?: string;
  metricLabel?: string;
}

const SustainabilityCard = ({ icon: Icon, title, description, impact, metric, metricLabel }: SustainabilityCardProps) => {
  return (
    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            {metric && (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">{metric}</span>
                {metricLabel && <span className="text-sm text-muted-foreground">{metricLabel}</span>}
              </div>
            )}
            {impact && (
              <p className="text-primary font-medium text-sm">{impact}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SustainabilityCard;
