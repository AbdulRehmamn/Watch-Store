export interface Product {
  id: number;
  name: string;
  category: 'men' | 'women' | 'limited';
  price: number;
  image: string;
  description: string;
  features?: string[];
  detailedDescription?: string;
  specifications?: {
    movement?: string;
    caseSize?: string;
    caseThickness?: string;
    dialColor?: string;
    crystal?: string;
    waterResistance?: string;
    powerReserve?: string;
    bandMaterial?: string;
    buckleType?: string;
  };
  materials?: string[];
  warranty?: string;
  limitedEdition?: {
    totalPieces: number;
    individualNumbering: boolean;
    certificate?: string;
    specialPackaging?: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chronograph Classic",
    category: "men",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "An elegant timepiece with precision engineering and classic styling. Features Swiss movement and sapphire crystal.",
    features: ["Swiss movement", "Sapphire crystal", "100m water resistance", "Stainless steel case"],
    detailedDescription: "The Chronograph Classic represents the pinnacle of traditional watchmaking excellence. Each timepiece is meticulously crafted by our master watchmakers using techniques passed down through generations. The dial features hand-applied indices and a date window at 3 o'clock for added functionality.",
    specifications: {
      movement: "Swiss Automatic ETA 2824-2",
      caseSize: "42mm",
      caseThickness: "12.5mm",
      dialColor: "Sunburst Black",
      crystal: "Scratch-resistant Sapphire with anti-reflective coating",
      waterResistance: "100 meters (330 feet)",
      powerReserve: "38 hours",
      bandMaterial: "Genuine Italian leather",
      buckleType: "Deployant clasp with push-button release"
    },
    materials: ["316L Stainless Steel", "Sapphire Crystal", "Italian Leather", "Luminous Hands and Markers"],
    warranty: "5 years international warranty"
  },
  {
    id: 2,
    name: "Ocean Diver",
    category: "men",
    price: 1899,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Professional diving watch with exceptional water resistance and luminous dial for underwater visibility.",
    features: ["300m water resistance", "Rotating bezel", "Luminous dial", "Rubber strap"]
  },
  {
    id: 3,
    name: "Executive Gold",
    category: "men",
    price: 4999,
    image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Luxury gold-plated watch that makes a statement. Perfect for the executive who demands the best.",
    features: ["18K gold plating", "Leather strap", "Date display", "Automatic winding"]
  },
  {
    id: 4,
    name: "Moonlight Pearl",
    category: "women",
    price: 3299,
    image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Elegant women's watch featuring a mother of pearl dial and diamond hour markers.",
    features: ["Mother of pearl dial", "Diamond markers", "Rose gold case", "50m water resistance"]
  },
  {
    id: 5,
    name: "Petite Rose",
    category: "women",
    price: 2199,
    image: "https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Delicate and beautiful timepiece with rose gold accents and a slim profile perfect for any occasion.",
    features: ["Rose gold accents", "Slim profile", "Quartz movement", "Stainless steel mesh band"],
    detailedDescription: "The Petite Rose epitomizes feminine elegance with its delicate proportions and exquisite details. The mother-of-pearl dial catches light at every angle, creating a subtle yet mesmerizing display of colors. Each timepiece features our signature rose motif subtly engraved on the crown, symbolizing eternal beauty.",
    specifications: {
      movement: "Swiss Quartz Ronda 1063",
      caseSize: "28mm",
      caseThickness: "7mm",
      dialColor: "Mother of Pearl",
      crystal: "Domed Sapphire",
      waterResistance: "50 meters (165 feet)",
      bandMaterial: "Mesh Stainless Steel with Rose Gold PVD coating",
      buckleType: "Butterfly clasp"
    },
    materials: ["316L Stainless Steel with Rose Gold PVD coating", "Mother of Pearl Dial", "Sapphire Crystal", "Diamond hour markers"],
    warranty: "3 years international warranty"
  },
  {
    id: 6,
    name: "Diamond Cascade",
    category: "women",
    price: 5499,
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Luxury watch featuring a cascade of diamonds around the bezel, creating a stunning visual effect.",
    features: ["Diamond-set bezel", "White gold case", "Sapphire crystal", "Leather strap"]
  },
  {
    id: 7,
    name: "Celestial Limited",
    category: "limited",
    price: 12999,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Limited edition celestial-themed watch with astronomical complications and hand-painted star map dial.",
    features: ["Limited to 100 pieces", "Astronomical complications", "Hand-painted dial", "Alligator strap"]
  },
  {
    id: 8,
    name: "Heritage Carbon",
    category: "limited",
    price: 8499,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Carbon fiber limited edition inspired by racing heritage, featuring chronograph function and tachymeter.",
    features: ["Carbon fiber case", "Tachymeter", "Chronograph", "Limited to 250 pieces"],
    detailedDescription: "The Heritage Carbon is a masterpiece of modern watchmaking, drawing inspiration from the golden era of motorsports. Each timepiece incorporates authentic carbon fiber from Formula 1 race cars, making every watch truly unique. The chronograph functions allow for precise timing with 1/10th second accuracy, while the tachymeter bezel enables speed calculations during races.",
    specifications: {
      movement: "In-house Caliber HC5500, Column-wheel Chronograph",
      caseSize: "44mm",
      caseThickness: "14mm",
      dialColor: "Carbon Fiber with Red Accents",
      crystal: "Box-shaped Sapphire with multi-layer anti-reflective coating",
      waterResistance: "100 meters (330 feet)",
      powerReserve: "65 hours",
      bandMaterial: "Perforated Calfskin Leather with Red Stitching",
      buckleType: "Deployant clasp with carbon fiber insert"
    },
    materials: ["Forged Carbon Fiber Case", "Ceramic Bezel", "Sapphire Crystal", "Titanium Pushers and Crown"],
    warranty: "10 years international warranty",
    limitedEdition: {
      totalPieces: 250,
      individualNumbering: true,
      certificate: "Hand-signed Certificate of Authenticity",
      specialPackaging: "Handcrafted wooden display box with racing-inspired interior"
    }
  },
  {
    id: 9,
    name: "Vintage Elegance",
    category: "men",
    price: 3799,
    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "A throwback to the golden age of watchmaking with modern reliability. Features hand-stitched leather strap.",
    features: ["Vintage design", "Automatic movement", "Exhibition case back", "Hand-stitched leather"]
  },
  {
    id: 10,
    name: "Urban Titanium",
    category: "men",
    price: 2899,
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Ultralight titanium watch designed for the modern urban explorer. Scratch-resistant and durable.",
    features: ["Titanium case", "Scratch-resistant coating", "Smart connectivity", "Stealth black design"]
  },
  {
    id: 11,
    name: "Royal Sapphire",
    category: "women",
    price: 4299,
    image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Exquisite women's watch with sapphire accents and precision Swiss movement for the discerning collector.",
    features: ["Sapphire accents", "18K white gold", "Diamond hour markers", "Genuine ostrich leather strap"]
  },
  {
    id: 12,
    name: "Twilight Opal",
    category: "women",
    price: 3899,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52622a611?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Striking opal dial that changes color in different light conditions, set in a rose gold case.",
    features: ["Opal dial", "Rose gold case", "Color-changing effect", "Swiss quartz movement"]
  },
  {
    id: 13,
    name: "Lunar Eclipse",
    category: "limited",
    price: 15999,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Ultra-rare limited edition with moonphase complication and meteorite dial. Only 50 pieces worldwide.",
    features: ["Meteorite dial", "Moonphase complication", "Limited to 50 pieces", "Certificate of authenticity"]
  },
  {
    id: 14,
    name: "Emperor's Tourbillon",
    category: "limited",
    price: 29999,
    image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Masterpiece of watchmaking featuring a hand-finished tourbillon movement visible through the skeleton dial.",
    features: ["Tourbillon movement", "Skeleton dial", "Rose gold case", "Limited to 25 pieces worldwide"]
  },
  {
    id: 15,
    name: "Voyager GMT",
    category: "men",
    price: 3499,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Designed for the global traveler, featuring dual time zones and date function with anti-reflective sapphire crystal.",
    features: ["GMT function", "42mm case size", "Anti-reflective coating", "Genuine leather strap"]
  },
  {
    id: 16,
    name: "Aquamarine Dive",
    category: "women",
    price: 2799,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    description: "Women's diving watch with vibrant aquamarine bezel and professional-grade water resistance for marine adventures.",
    features: ["200m water resistance", "Aquamarine bezel", "SuperLuminova indices", "Helium escape valve"]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
