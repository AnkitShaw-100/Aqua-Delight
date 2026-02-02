import { Fish as FishIcon, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Fish } from '@/data/mockFishData';

interface FishCardProps {
  fish: Fish;
}

const FishCard = ({ fish }: FishCardProps) => {
  const availabilityStyles = {
    Fresh: 'bg-fresh/10 text-fresh border-fresh/20',
    Limited: 'bg-limited/10 text-limited border-limited/20',
    Preorder: 'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <Card className="group overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <FishIcon className="h-20 w-20 text-primary/30 group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        {/* Availability Badge */}
        <Badge 
          variant="outline" 
          className={`absolute top-3 right-3 ${availabilityStyles[fish.availability]} font-medium`}
        >
          {fish.availability}
        </Badge>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {fish.name}
            </h3>
            <span className="text-sm text-muted-foreground">{fish.bengaliName}</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">₹{fish.pricePerKg}</div>
            <span className="text-xs text-muted-foreground">per kg</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {fish.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{fish.origin}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{fish.catchDate}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          size="sm"
        >
          {fish.availability === 'Preorder' ? 'Preorder Now' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FishCard;
