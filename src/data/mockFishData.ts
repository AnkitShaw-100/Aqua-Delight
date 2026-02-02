export interface Fish {
  id: string;
  name: string;
  bengaliName: string;
  pricePerKg: number;
  availability: 'Fresh' | 'Limited' | 'Preorder';
  image: string;
  description: string;
  origin: string;
  catchDate: string;
}

export interface FisherCatch {
  id: string;
  fishName: string;
  quantity: number;
  pricePerKg: number;
  status: 'Listed' | 'Sold' | 'Pending';
  listedDate: string;
}

export const mockFishData: Fish[] = [
  {
    id: '1',
    name: 'Hilsa',
    bengaliName: 'ইলিশ',
    pricePerKg: 1200,
    availability: 'Fresh',
    image: '/placeholder.svg',
    description: 'The king of fish, prized for its rich, oily taste and silvery scales.',
    origin: 'Padma River, Bangladesh',
    catchDate: '2026-02-01',
  },
  {
    id: '2',
    name: 'Rohu',
    bengaliName: 'রুই',
    pricePerKg: 280,
    availability: 'Fresh',
    image: '/placeholder.svg',
    description: 'Popular freshwater carp with tender, flaky white meat.',
    origin: 'West Bengal Farms',
    catchDate: '2026-02-02',
  },
  {
    id: '3',
    name: 'Katla',
    bengaliName: 'কাতলা',
    pricePerKg: 320,
    availability: 'Fresh',
    image: '/placeholder.svg',
    description: 'Large freshwater fish known for its delicate flavor and firm texture.',
    origin: 'Hooghly River',
    catchDate: '2026-02-02',
  },
  {
    id: '4',
    name: 'Pabda',
    bengaliName: 'পাবদা',
    pricePerKg: 650,
    availability: 'Limited',
    image: '/placeholder.svg',
    description: 'Small catfish with buttery flesh, perfect for Bengali curries.',
    origin: 'Sundarbans',
    catchDate: '2026-02-01',
  },
  {
    id: '5',
    name: 'Bhetki',
    bengaliName: 'ভেটকি',
    pricePerKg: 850,
    availability: 'Fresh',
    image: '/placeholder.svg',
    description: 'Asian sea bass with mild, sweet flavor and meaty texture.',
    origin: 'Bay of Bengal',
    catchDate: '2026-02-02',
  },
  {
    id: '6',
    name: 'Chingri',
    bengaliName: 'চিংড়ি',
    pricePerKg: 750,
    availability: 'Fresh',
    image: '/placeholder.svg',
    description: 'Fresh Bengal prawns, perfect for curries and grilling.',
    origin: 'Digha Coast',
    catchDate: '2026-02-02',
  },
  {
    id: '7',
    name: 'Tengra',
    bengaliName: 'টেংরা',
    pricePerKg: 450,
    availability: 'Limited',
    image: '/placeholder.svg',
    description: 'Small mystus catfish with a distinctive taste.',
    origin: 'Local Ponds',
    catchDate: '2026-02-01',
  },
  {
    id: '8',
    name: 'Pomfret',
    bengaliName: 'পমফ্রেট',
    pricePerKg: 950,
    availability: 'Preorder',
    image: '/placeholder.svg',
    description: 'Silver pomfret with delicate, sweet flesh.',
    origin: 'Bay of Bengal',
    catchDate: '2026-02-03',
  },
];

export const mockFisherCatches: FisherCatch[] = [
  {
    id: '1',
    fishName: 'Hilsa',
    quantity: 25,
    pricePerKg: 1200,
    status: 'Listed',
    listedDate: '2026-02-02',
  },
  {
    id: '2',
    fishName: 'Rohu',
    quantity: 40,
    pricePerKg: 280,
    status: 'Sold',
    listedDate: '2026-02-01',
  },
  {
    id: '3',
    fishName: 'Katla',
    quantity: 30,
    pricePerKg: 320,
    status: 'Listed',
    listedDate: '2026-02-02',
  },
  {
    id: '4',
    fishName: 'Pabda',
    quantity: 15,
    pricePerKg: 650,
    status: 'Pending',
    listedDate: '2026-02-02',
  },
];

export const sustainabilityMetrics = {
  fishermenEmpowered: 2500,
  foodWasteReduced: 45,
  carbonReduction: 32,
  localSourcingRate: 94,
  freshDeliveryRate: 98,
  villagesConnected: 180,
};

export const fishTypes = ['All', 'Freshwater', 'Saltwater', 'Prawns', 'Crabs'];
export const locations = ['All Bengal', 'Kolkata', 'Digha', 'Sundarbans', 'Hooghly'];
export const priceRanges = ['All Prices', 'Under ₹300', '₹300-₹600', '₹600-₹1000', 'Above ₹1000'];
