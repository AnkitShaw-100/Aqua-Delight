import { Users, Leaf, Globe, Truck } from 'lucide-react';
import { sustainabilityMetrics } from '@/data/mockFishData';

const stats = [
  {
    icon: Users,
    value: sustainabilityMetrics.fishermenEmpowered.toLocaleString() + '+',
    label: 'Fishermen Empowered',
    description: 'Local fishing families connected to digital markets',
  },
  {
    icon: Leaf,
    value: sustainabilityMetrics.foodWasteReduced + '%',
    label: 'Reduced Food Waste',
    description: 'Less spoilage through optimized supply chains',
  },
  {
    icon: Globe,
    value: sustainabilityMetrics.carbonReduction + '%',
    label: 'Carbon Reduction',
    description: 'Lower emissions via local-first logistics',
  },
  {
    icon: Truck,
    value: sustainabilityMetrics.freshDeliveryRate + '%',
    label: 'Fresh Delivery Rate',
    description: 'Fish delivered within 24 hours of catch',
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Making a Real Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our digital platform is transforming Bengal's fishing industry, 
            one catch at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6" />
                </div>
                
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                
                <div className="text-base font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
