import { Link } from 'react-router-dom';
import { ArrowRight, Waves, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Animated wave patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-64 opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-background animate-wave"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-48 opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ animationDelay: '0.5s' }}
        >
          <path
            fill="currentColor"
            className="text-background animate-wave"
            d="M0,64L48,85.3C96,107,192,149,288,154.7C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,128C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 text-background/10 animate-float hidden lg:block">
        <Waves className="h-32 w-32" />
      </div>
      <div className="absolute bottom-40 left-20 text-background/10 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        <Anchor className="h-24 w-24" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-background/90 text-sm font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
            Empowering 2,500+ Local Fishermen
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-background leading-tight mb-6">
            Bringing Bengal's{' '}
            <span className="relative">
              Fresh Catch
              <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -z-10 rounded" />
            </span>{' '}
            to the Digital World
          </h1>

          <p className="text-lg md:text-xl text-background/80 mb-8 leading-relaxed max-w-2xl">
            Experience sustainable fishing with reduced waste and a lower carbon footprint. 
            Direct from local fishermen to your table — fresh, fair, and eco-friendly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/marketplace">
              <Button 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 text-base font-semibold px-8 gap-2 group"
              >
                Explore Marketplace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-background/30 text-background hover:bg-background/10 text-base font-semibold px-8"
              >
                Join as Fisherman
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8 text-background/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sustainable Sourcing</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Same Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fair Prices for Fishermen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
