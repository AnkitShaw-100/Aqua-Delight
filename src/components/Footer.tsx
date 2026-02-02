import { Link } from 'react-router-dom';
import { Fish, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Wave SVG decoration */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Fish className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">Aquadelight</span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              Bringing Bengal's fresh catch to your doorstep. Supporting local fishermen, 
              reducing waste, and building a sustainable future for our oceans.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Marketplace', 'Sustainability', 'About Us', 'How It Works', 'Partner With Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Fishermen */}
          <div>
            <h4 className="font-semibold mb-4">For Fishermen</h4>
            <ul className="space-y-2">
              {['Join Our Network', 'Sell Your Catch', 'Fisher Dashboard', 'Training Programs', 'Success Stories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Salt Lake, Sector V, Kolkata, West Bengal 700091</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@aquadelight.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2026 Aquadelight. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
