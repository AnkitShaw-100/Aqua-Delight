import { Network, Brain, Waves, Shield, Truck, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Network,
    title: 'Smart Supply Chain',
    description: 'Real-time tracking from catch to customer, ensuring freshness and transparency at every step.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Brain,
    title: 'AI-Driven Demand Insights',
    description: 'Predictive analytics help fishermen know what to catch, reducing waste and maximizing profits.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Waves,
    title: 'Sustainable Fishing Practices',
    description: 'Supporting responsible fishing methods that protect marine ecosystems for future generations.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every fish is quality-checked and certified fresh before reaching your doorstep.',
    color: 'bg-coral/10 text-coral',
  },
  {
    icon: Truck,
    title: 'Same-Day Delivery',
    description: 'Cold-chain logistics ensure your fish arrives fresh, within hours of being caught.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: BarChart3,
    title: 'Fair Pricing',
    description: 'Direct marketplace connecting fishermen to consumers, eliminating middlemen and ensuring fair prices.',
    color: 'bg-accent/10 text-accent',
  },
];

const FeatureCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Aquadelight?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Revolutionizing Bengal's Fish Market
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining technology with tradition to create a smarter, 
            more sustainable fishing ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl ${feature.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
