import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SustainabilityCard from '@/components/SustainabilityCard';
import { sustainabilityMetrics } from '@/data/mockFishData';
import { 
  MapPin, 
  Leaf, 
  Truck, 
  Recycle, 
  Droplets, 
  TreePine,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const sustainabilityFeatures = [
  {
    icon: MapPin,
    title: 'Local Sourcing',
    description: 'We partner exclusively with Bengal fishermen, ensuring short supply chains that minimize transportation emissions and support local communities.',
    metric: `${sustainabilityMetrics.localSourcingRate}%`,
    metricLabel: 'Locally sourced',
  },
  {
    icon: Recycle,
    title: 'Reduced Spoilage',
    description: 'AI-driven demand forecasting helps fishermen catch only what\'s needed, dramatically reducing fish waste and spoilage.',
    metric: `${sustainabilityMetrics.foodWasteReduced}%`,
    metricLabel: 'Less food waste',
  },
  {
    icon: Truck,
    title: 'Optimized Logistics',
    description: 'Smart routing and cold-chain logistics ensure fish reach customers quickly while minimizing fuel consumption and carbon emissions.',
    metric: `${sustainabilityMetrics.carbonReduction}%`,
    metricLabel: 'Carbon reduction',
  },
  {
    icon: Droplets,
    title: 'Ocean Conservation',
    description: 'We promote sustainable fishing practices and work with fishermen to protect breeding grounds and marine ecosystems.',
  },
  {
    icon: TreePine,
    title: 'Eco-Packaging',
    description: 'All our deliveries use biodegradable, recyclable packaging materials that minimize environmental impact.',
  },
  {
    icon: Leaf,
    title: 'Carbon Offset Program',
    description: 'We invest in mangrove restoration and coastal conservation projects to offset our remaining carbon footprint.',
  },
];

const impactMetrics = [
  { value: sustainabilityMetrics.fishermenEmpowered.toLocaleString() + '+', label: 'Fishermen Supported' },
  { value: sustainabilityMetrics.villagesConnected + '+', label: 'Villages Connected' },
  { value: sustainabilityMetrics.foodWasteReduced + '%', label: 'Waste Reduced' },
  { value: sustainabilityMetrics.carbonReduction + '%', label: 'Lower Emissions' },
];

const Sustainability = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Our Commitment to the Planet
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Sustainable Fishing for a{' '}
                <span className="text-gradient-ocean">Better Tomorrow</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                At Aquadelight, sustainability isn't just a buzzword — it's at the core of everything we do. 
                From ocean to table, we're building a fish supply chain that's good for people and the planet.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Reduce Carbon Footprint */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Aquadelight Reduces Carbon Footprint
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every step of our process is designed with sustainability in mind, 
                from catch to delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sustainabilityFeatures.map((feature) => (
                <SustainabilityCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  metric={feature.metric}
                  metricLabel={feature.metricLabel}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Sustainability Journey
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  { year: '2024', title: 'Founded with Purpose', description: 'Aquadelight launched with a mission to transform Bengal\'s fishing industry sustainably.' },
                  { year: '2025', title: 'Carbon Neutral Operations', description: 'Achieved carbon neutrality through renewable energy and offset programs.' },
                  { year: '2026', title: 'Ocean Conservation Partnership', description: 'Partnered with marine conservation organizations to protect Bengal\'s coastal ecosystems.' },
                ].map((milestone, index) => (
                  <div key={milestone.year} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                        {milestone.year}
                      </div>
                      {index < 2 && <div className="flex-1 w-0.5 bg-accent/20 mt-2" />}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-ocean">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-background mb-4">
                Join Our Sustainable Movement
              </h2>
              <p className="text-lg text-background/80 mb-8">
                Every purchase supports local fishermen and contributes to a healthier ocean.
              </p>
              <Link to="/marketplace">
                <Button size="lg" className="bg-background text-primary hover:bg-background/90 gap-2 group">
                  Shop Sustainable Fish
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sustainability;
