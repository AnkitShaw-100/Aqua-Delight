import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import FeatureCards from '@/components/FeatureCards';
import { Link } from 'react-router-dom';
import { ArrowRight, Fish, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <FeatureCards />
        
        {/* CTA Section */}
        <section className="py-20 gradient-ocean relative overflow-hidden">
          {/* Decorative waves */}
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
              <path fill="currentColor" className="text-background" d="M0,64L120,69.3C240,75,480,85,720,80C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"/>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-background mb-6">
                Ready to Experience Fresh Fish Like Never Before?
              </h2>
              <p className="text-lg text-background/80 mb-8">
                Join thousands of satisfied customers and local fishermen in Bengal's 
                most trusted fish marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/marketplace">
                  <Button 
                    size="lg" 
                    className="bg-background text-primary hover:bg-background/90 gap-2 group"
                  >
                    <Fish className="h-5 w-5" />
                    Browse Fresh Fish
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-background/30 text-background hover:bg-background/10 gap-2"
                  >
                    <Users className="h-5 w-5" />
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Leaf className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Eco-Certified</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Fish className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">100% Fresh Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">2,500+ Fishermen</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="h-5 w-5 text-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">4.9★ Customer Rating</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
