import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FishCard from '@/components/FishCard';
import { mockFishData, fishTypes, locations, priceRanges } from '@/data/mockFishData';
import { Search, SlidersHorizontal, Fish } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Bengal');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');

  // Filter fish based on search (UI only, no actual filtering logic required)
  const filteredFish = mockFishData.filter(fish =>
    fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fish.bengaliName.includes(searchQuery)
  );

  const FilterControls = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Fish Type</label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {fishTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {locations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
        <Select value={selectedPrice} onValueChange={setSelectedPrice}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {priceRanges.map(range => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full mt-4" onClick={() => {
        setSelectedType('All');
        setSelectedLocation('All Bengal');
        setSelectedPrice('All Prices');
      }}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-background mb-4">
                Fresh Fish Marketplace
              </h1>
              <p className="text-lg text-background/80">
                Browse our selection of fresh, sustainably-sourced fish from local Bengal fishermen.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-6 border-b border-border bg-card sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for fish (e.g., Hilsa, Rohu, রুই)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue placeholder="Fish Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {fishTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {priceRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterControls />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </section>

        {/* Fish Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredFish.length}</span> fresh catches
              </p>
            </div>

            {/* Grid */}
            {filteredFish.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFish.map((fish) => (
                  <FishCard key={fish.id} fish={fish} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Fish className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No fish found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
