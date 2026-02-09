import { OnboardingData } from "../HomeDepotOnboarding";
import { MapPin, Search, Home, ShoppingBag, User, Store, ChevronRight, Camera, ScanBarcode, Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { BrandKitConfig, VERTICAL_PRESETS } from '../../types/brandKit';

interface HomeScreenProps {
  data: OnboardingData;
  brandKit: BrandKitConfig;
}

// Verticals that have physical store locations
const STORE_BASED_VERTICALS = [
  'Retail',
  'Food & Beverage',
  'Finance',
  'Healthcare',
  'Automotive',
];

// Product data mapping
const productCategories = {
  "power-tools": [
    {
      name: "DEWALT 20V Cordless Drill",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGx8ZW58MXx8fHwxNzY5MDQzNzQwfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $20",
    },
    {
      name: "Milwaukee Impact Driver Kit",
      price: "$179.00",
      image: "https://images.unsplash.com/photo-1663948138866-cd74128c1b1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWx3YXVrZWUlMjBwb3dlciUyMHRvb2xzfGVufDF8fHx8MTc2OTA1NDM2OXww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  "garden-center": [
    {
      name: "Garden Tool Set (5-Piece)",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1537877853655-34bdcda5e833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29sc3xlbnwxfHx8fDE3Njg5NjAxMDR8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $10",
    },
    {
      name: "Raised Garden Bed Kit",
      price: "$89.00",
      image: "https://images.unsplash.com/photo-1683476500323-5e465eec6e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBiZWQlMjByYWlzZWR8ZW58MXx8fHwxNzY5MDU0MzcwfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  paint: [
    {
      name: "Premium Paint Roller Set",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1555942861-769f7774848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN1cHBsaWVzJTIwYnJ1c2h8ZW58MXx8fHwxNzY5MDQzNzQxfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $5",
    },
    {
      name: "Interior Paint (1 Gal)",
      price: "$34.98",
      image: "https://images.unsplash.com/photo-1629397545188-cf2da30db99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbiUyMHdoaXRlfGVufDF8fHx8MTc2OTAyNzE3NHww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  lighting: [
    {
      name: "LED Ceiling Light Fixture",
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1606170033648-5d55a3edf314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodGluZyUyMGZpeHR1cmVzfGVufDF8fHx8MTc2OTA0Mzc0M3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $15",
    },
    {
      name: "Smart Bulb 4-Pack",
      price: "$44.99",
      image: "https://images.unsplash.com/photo-1738045419183-79fd0707ffe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGxpZ2h0JTIwYnVsYnN8ZW58MXx8fHwxNzY5MDU0MzcxfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  "building-materials": [
    {
      name: "2x4x8 Lumber",
      price: "$7.98",
      image: "https://images.unsplash.com/photo-1634672652995-ee7525bce595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW1iZXIlMjB3b29kJTIwcGxhbmtzfGVufDF8fHx8MTc2ODk3ODI3Nnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
    {
      name: "Drywall Sheets (10-Pack)",
      price: "$149.00",
      image: "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzfGVufDF8fHx8MTc2OTA0Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $30",
    },
  ],
  "outdoor-power": [
    {
      name: "Gas Leaf Blower",
      price: "$189.00",
      image: "https://images.unsplash.com/photo-1537877853655-34bdcda5e833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29sc3xlbnwxfHx8fDE3Njg5NjAxMDR8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $40",
    },
    {
      name: "Electric Chainsaw",
      price: "$149.00",
      image: "https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGx8ZW58MXx8fHwxNzY5MDQzNzQwfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
};

const projectProducts = {
  kitchen: [
    {
      name: "Kitchen Cabinet Set",
      price: "$899.00",
      image: "https://images.unsplash.com/photo-1653087881002-071d4c840f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY2FiaW5ldHMlMjBtb2Rlcm58ZW58MXx8fHwxNzY5MDQzNzQxfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $100",
    },
    {
      name: "Stainless Steel Sink",
      price: "$249.00",
      image: "https://images.unsplash.com/photo-1609210884848-2d530cfb2a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwc2luayUyMHN0YWlubGVzc3xlbnwxfHx8fDE3NjkwNTQzNzF8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  bathroom: [
    {
      name: "Modern Vanity 48-inch",
      price: "$599.00",
      image: "https://images.unsplash.com/photo-1712214741533-3dd5b8013ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHZhbml0eXxlbnwxfHx8fDE3NjkwMTEzNjN8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $80",
    },
    {
      name: "Shower Head Set",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1682888818704-6dc91e9d7532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG93ZXIlMjBoZWFkJTIwbW9kZXJufGVufDF8fHx8MTc2OTA1NDM3Mnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  "living-room": [
    {
      name: "Floating Shelves Set",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2ODkyMjYwN3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $20",
    },
    {
      name: "Area Rug 8x10",
      price: "$299.00",
      image: "https://images.unsplash.com/photo-1645124057137-46fddef3f74d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmVhJTIwcnVnJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjkwNTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  bedroom: [
    {
      name: "Ceiling Fan with Light",
      price: "$149.00",
      image: "https://images.unsplash.com/photo-1606170033648-5d55a3edf314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodGluZyUyMGZpeHR1cmVzfGVufDF8fHx8MTc2OTA0Mzc0M3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $30",
    },
    {
      name: "Bedroom Lighting Fixture",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1738045419183-79fd0707ffe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGxpZ2h0JTIwYnVsYnN8ZW58MXx8fHwxNzY5MDU0MzcxfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  outdoor: [
    {
      name: "Patio Furniture Set",
      price: "$699.00",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2ODkyMjYwN3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $150",
    },
    {
      name: "Outdoor Grill",
      price: "$399.00",
      image: "https://images.unsplash.com/photo-1537877853655-34bdcda5e833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29sc3xlbnwxfHx8fDE3Njg5NjAxMDR8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $50",
    },
  ],
  garage: [
    {
      name: "Heavy Duty Storage Shelves",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzfGVufDF8fHx8MTc2OTA0Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
    {
      name: "Tool Chest Organizer",
      price: "$199.00",
      image: "https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGx8ZW58MXx8fHwxNzY5MDQzNzQwfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $40",
    },
  ],
  painting: [
    {
      name: "Paint Brush Set Pro",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1555942861-769f7774848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHN1cHBsaWVzJTIwYnJ1c2h8ZW58MXx8fHwxNzY5MDQzNzQxfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $10",
    },
    {
      name: "Paint Sprayer Kit",
      price: "$149.00",
      image: "https://images.unsplash.com/photo-1629397545188-cf2da30db99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGNhbiUyMHdoaXRlfGVufDF8fHx8MTc2OTAyNzE3NHww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  general: [
    {
      name: "Cordless Drill Set",
      price: "$99.00",
      image: "https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGx8ZW58MXx8fHwxNzY5MDQzNzQwfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
    {
      name: "Multi-Tool Kit",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzfGVufDF8fHx8MTc2OTA0Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $20",
    },
  ],
};

const homeTypeProducts = {
  "single-family": [
    {
      name: "Lawn Mower Gas Powered",
      price: "$399.00",
      image: "https://images.unsplash.com/photo-1537877853655-34bdcda5e833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29sc3xlbnwxfHx8fDE3Njg5NjAxMDR8MA&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $50",
    },
    {
      name: "Pressure Washer",
      price: "$249.00",
      image: "https://images.unsplash.com/photo-1755168648692-ef8937b7e63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRvb2xzJTIwZHJpbGx8ZW58MXx8fHwxNzY5MDQzNzQwfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  apartment: [
    {
      name: "Storage Solutions Organizer",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzfGVufDF8fHx8MTc2OTA0Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
    {
      name: "Compact Furniture Set",
      price: "$299.00",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2ODkyMjYwN3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $50",
    },
  ],
  townhouse: [
    {
      name: "Patio Furniture 3-Piece",
      price: "$449.00",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2ODkyMjYwN3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $100",
    },
    {
      name: "Outdoor Lighting Kit",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1606170033648-5d55a3edf314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodGluZyUyMGZpeHR1cmVzfGVufDF8fHx8MTc2OTA0Mzc0M3ww&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
  ],
  condo: [
    {
      name: "Compact Appliances Kit",
      price: "$299.00",
      image: "https://images.unsplash.com/photo-1653087881002-071d4c840f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY2FiaW5ldHMlMjBtb2Rlcm58ZW58MXx8fHwxNzY5MDQzNzQxfDA&ixlib=rb-4.1.0&q=80&w=400",
      discount: null,
    },
    {
      name: "Space-Saving Storage",
      price: "$149.00",
      image: "https://images.unsplash.com/photo-1540103711724-ebf833bde8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHRvb2xzfGVufDF8fHx8MTc2OTA0Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=400",
      discount: "Save $30",
    },
  ],
};

export function HomeScreen({ data, brandKit }: HomeScreenProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Get vertical preset for images
  const verticalPreset = VERTICAL_PRESETS[brandKit.vertical];
  const hasStore = STORE_BASED_VERTICALS.includes(verticalPreset?.category || '');
  
  // Get products based on user selections
  const savingsProducts = data.savingsCategories[0]
    ? productCategories[data.savingsCategories[0] as keyof typeof productCategories] || []
    : [];
  
  const projectProductsList = data.projects[0]
    ? projectProducts[data.projects[0] as keyof typeof projectProducts] || []
    : [];
  
  const homeProducts = data.homeType
    ? homeTypeProducts[data.homeType as keyof typeof homeTypeProducts] || []
    : [];

  // Mock weather based on zipcode (in real app, would call weather API)
  const getWeather = (zipcode: string) => {
    return "55°F"; // Mock temperature
  };

  // Get city name from zipcode
  const getCityFromZipcode = (zipcode: string) => {
    const zipcodeMap: Record<string, string> = {
      "60601": "Chicago",
      "60602": "Chicago",
      "60603": "Chicago",
      "60604": "Chicago",
      "60605": "Chicago",
      "60606": "Chicago",
      "60607": "Chicago",
      "60608": "Chicago",
      "60609": "Chicago",
      "60610": "Chicago",
      "60611": "Chicago",
      "60612": "Chicago",
      "60613": "Chicago",
      "60614": "Chicago",
      "60615": "Chicago",
      "10001": "New York",
      "10002": "New York",
      "10003": "New York",
      "90001": "Los Angeles",
      "90002": "Los Angeles",
      "90003": "Los Angeles",
      "75001": "Dallas",
      "75201": "Dallas",
      "33101": "Miami",
      "85001": "Phoenix",
      "19101": "Philadelphia",
      "78701": "Austin",
      "94101": "San Francisco",
      "98101": "Seattle",
    };
    return zipcodeMap[zipcode] || zipcode;
  };

  // Generate animated search placeholders based on user preferences
  const generateSearchPlaceholders = () => {
    const placeholders: string[] = [];
    
    // Add suggestions from home type
    if (data.homeType) {
      const homeTypeMap: Record<string, string> = {
        "single-family": "lawn mower",
        "apartment": "storage solutions",
        "townhouse": "patio furniture",
        "condo": "compact appliances",
      };
      if (homeTypeMap[data.homeType]) {
        placeholders.push(homeTypeMap[data.homeType]);
      }
    }
    
    // Add suggestions from projects
    data.projects.forEach((project) => {
      const projectMap: Record<string, string> = {
        "kitchen": "kitchen cabinets",
        "bathroom": "vanity",
        "living-room": "paint colors",
        "bedroom": "ceiling fan",
        "outdoor": "patio furniture",
        "garage": "storage shelves",
        "painting": "paint brushes",
        "general": "power drill",
      };
      if (projectMap[project]) {
        placeholders.push(projectMap[project]);
      }
    });
    
    // Add suggestions from savings categories
    data.savingsCategories.forEach((category) => {
      const categoryMap: Record<string, string> = {
        "power-tools": "cordless drill",
        "garden-center": "garden hose",
        "outdoor-power": "leaf blower",
        "building-materials": "lumber",
        paint: "interior paint",
        lighting: "LED bulbs",
      };
      if (categoryMap[category]) {
        placeholders.push(categoryMap[category]);
      }
    });
    
    // Default placeholders if none generated
    if (placeholders.length === 0) {
      return ["tools", "paint", "lighting", "flooring"];
    }
    
    return placeholders;
  };

  const searchPlaceholders = generateSearchPlaceholders();

  // Animate search placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [searchPlaceholders.length]);

  // Category labels
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "power-tools": "Power Tools",
      "garden-center": "Garden Center",
      "outdoor-power": "Outdoor Power Equipment",
      "building-materials": "Building Materials",
      paint: "Paint",
      lighting: "Lighting",
    };
    return labels[category] || category;
  };

  const getProjectLabel = (project: string) => {
    const labels: Record<string, string> = {
      kitchen: "Kitchen",
      bathroom: "Bathroom",
      "living-room": "Living Room",
      bedroom: "Bedroom",
      outdoor: "Outdoor",
      garage: "Garage",
      painting: "Painting",
      general: "General",
    };
    return labels[project] || project;
  };

  const getHomeTypeLabel = (homeType: string) => {
    const labels: Record<string, string> = {
      "single-family": "Single Family Home",
      apartment: "Apartment",
      townhouse: "Townhouse",
      condo: "Condo",
    };
    return labels[homeType] || homeType;
  };

  // Function to get vertical-specific tagline
  const getVerticalTagline = (vertical: string) => {
    const taglines: Record<string, string> = {
      "Retail": "Ready to shop?",
      "Food & Beverage": "Ready to order?",
      "Travel": "Ready to take your next trip?",
      "Finance": "Ready to manage your finances?",
      "Healthcare": "Ready to take care of your health?",
      "Education": "Ready to learn something new?",
      "Entertainment": "Ready to be entertained?",
      "Automotive": "Ready to hit the road?",
      "Real Estate": "Ready to find your dream home?",
      "Fashion": "Ready to upgrade your style?",
      "Technology": "Ready to innovate?",
      "Gaming": "Ready to game on?",
      "Fitness": "Ready to crush your goals?",
      "Beauty": "Ready to look your best?",
      "Home Services": "Ready to tackle your projects?",
    };
    return taglines[vertical] || "Ready to get started?";
  };

  // Function to get closest store based on zipcode
  const getClosestStore = (zipcode: string) => {
    const storeMap: Record<string, { name: string, hours: string, address: string }> = {
      "60601": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60602": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60603": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60604": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60605": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60606": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60607": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60608": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60609": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60610": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60611": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60612": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60613": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60614": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "60615": { name: "Cicero", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" },
      "10001": { name: "Manhattan", hours: "Open Until 10:00 PM", address: "123 Main St, Manhattan, NY 10001" },
      "10002": { name: "Manhattan", hours: "Open Until 10:00 PM", address: "123 Main St, Manhattan, NY 10001" },
      "10003": { name: "Manhattan", hours: "Open Until 10:00 PM", address: "123 Main St, Manhattan, NY 10001" },
      "90001": { name: "Los Angeles", hours: "Open Until 10:00 PM", address: "123 Main St, Los Angeles, CA 90001" },
      "90002": { name: "Los Angeles", hours: "Open Until 10:00 PM", address: "123 Main St, Los Angeles, CA 90001" },
      "90003": { name: "Los Angeles", hours: "Open Until 10:00 PM", address: "123 Main St, Los Angeles, CA 90001" },
      "75001": { name: "Dallas", hours: "Open Until 10:00 PM", address: "123 Main St, Dallas, TX 75001" },
      "75201": { name: "Dallas", hours: "Open Until 10:00 PM", address: "123 Main St, Dallas, TX 75001" },
      "33101": { name: "Miami", hours: "Open Until 10:00 PM", address: "123 Main St, Miami, FL 33101" },
      "85001": { name: "Phoenix", hours: "Open Until 10:00 PM", address: "123 Main St, Phoenix, AZ 85001" },
      "19101": { name: "Philadelphia", hours: "Open Until 10:00 PM", address: "123 Main St, Philadelphia, PA 19101" },
      "78701": { name: "Austin", hours: "Open Until 10:00 PM", address: "123 Main St, Austin, TX 78701" },
      "94101": { name: "San Francisco", hours: "Open Until 10:00 PM", address: "123 Main St, San Francisco, CA 94101" },
      "98101": { name: "Seattle", hours: "Open Until 10:00 PM", address: "123 Main St, Seattle, WA 98101" },
    };
    return storeMap[zipcode] || { name: "Store", hours: "Open Until 10:00 PM", address: "123 Main St, Cicero, IL 60601" };
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Hero Header with Background Image */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-[360px]">
          <img 
            src={verticalPreset?.heroImageUrl || brandKit.logoUrl}
            alt={brandKit.brandName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content Over Image */}
        <div className="relative z-10 px-4 pt-2 pb-6">
          {/* Logo */}
          <div className="flex items-center justify-center mb-3 mt-2">
            <img 
              src={brandKit.logoUrl} 
              alt={brandKit.brandName}
              className="w-20 h-20 object-contain"
            />
          </div>
          
          {/* Store Locator - Only for store-based verticals */}
          {hasStore && (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/20">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">Cicero</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
              <p className="text-white text-xs text-center mb-4 font-medium">Open Until 10:00 PM</p>
            </>
          )}

          {/* Search Bar */}
          <div className={`flex items-center gap-2 ${hasStore ? 'mb-4' : 'mb-6 mt-4'}`}>
            <div className="flex-1 bg-white rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-lg">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={displayedText}
                className="flex-1 text-base outline-none"
                readOnly
              />
            </div>
            <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <ScanBarcode className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Greeting with Weather - Inside Hero */}
          <div className="mt-2">
            <h1 className="text-2xl font-bold text-white">
              Hey, {data.firstName || "there"}! 👋
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Cloud className="w-5 h-5 text-white/90" />
              <div>
                <p className="text-white/90 text-sm font-medium">
                  {getWeather(data.zipcode)} in {getCityFromZipcode(data.zipcode)}
                </p>
                <p className="text-white/80 text-xs">
                  {getVerticalTagline(verticalPreset?.category || "Home Services")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Store Locator Card - Only for store-based verticals */}
        {hasStore && (
          <div className="px-4 mb-6 mt-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${brandKit.primaryColor}15` }}
                  >
                    <Store className="w-6 h-6" style={{ color: brandKit.primaryColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{getClosestStore(data.zipcode).name} Store</h3>
                    <p className="text-xs text-gray-600">{getClosestStore(data.zipcode).hours}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-600">{getClosestStore(data.zipcode).address}</p>
            </div>
          </div>
        )}

        {/* Vertical-Specific Banner Images */}
        {verticalPreset?.bannerImages.slice(0, 3).map((imageUrl, idx) => (
          <div key={idx} className={`px-4 mb-6 ${idx === 0 && hasStore ? '' : idx === 0 ? 'mt-4' : ''}`}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={imageUrl}
                alt={`${brandKit.brandName} Feature ${idx + 1}`}
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        ))}

        {/* Personalized Insights Card - Projects Selected */}
        {data.projects.length > 0 && verticalPreset?.onboardingQuestions[1] && (
          <div className="px-4 mb-6">
            <div 
              className="rounded-xl p-6 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${brandKit.primaryColor}15 0%, ${brandKit.secondaryColor}15 100%)`,
                border: `1px solid ${brandKit.primaryColor}30`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{verticalPreset.onboardingQuestions[1].title}</h3>
                  <p className="text-sm text-gray-600">
                    {data.projects.length} selected
                  </p>
                </div>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: brandKit.primaryColor }}
                >
                  <span className="text-white font-bold text-lg">{data.projects.length}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.projects.map((project, idx) => (
                  <div 
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: brandKit.primaryColor,
                      color: brandKit.primaryColor
                    }}
                  >
                    {getProjectLabel(project)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Personalized Insights Card - Savings Preferences */}
        {data.savingsCategories.length > 0 && verticalPreset?.onboardingQuestions[2] && (
          <div className="px-4 mb-6">
            <div 
              className="rounded-xl p-6 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${brandKit.secondaryColor}15 0%, ${brandKit.primaryColor}10 100%)`,
                border: `1px solid ${brandKit.secondaryColor}30`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{verticalPreset.onboardingQuestions[2].title}</h3>
                  <p className="text-sm text-gray-600">
                    {data.savingsCategories.length} selected
                  </p>
                </div>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: brandKit.secondaryColor }}
                >
                  SAVE
                </div>
              </div>
              <div className="space-y-2">
                {data.savingsCategories.slice(0, 3).map((category, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: brandKit.primaryColor }}
                    />
                    <p className="text-sm text-gray-700 font-medium">{getCategoryLabel(category)}</p>
                  </div>
                ))}
                {data.savingsCategories.length > 3 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{data.savingsCategories.length - 3} more
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* COMMENTED OUT - Personalized Section - Projects 
        {projectProductsList.length > 0 && (
          <div className="mb-8">
            <div className="px-4 mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                For Your {getProjectLabel(data.projects[0])} Project
              </h2>
              <button className="font-semibold text-sm" style={{ color: brandKit.primaryColor }}>See All</button>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto pb-2">
              {projectProductsList.map((product, idx) => (
                <div key={idx} className="flex-shrink-0 w-40 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <p className="text-xs text-gray-900 font-medium line-clamp-2 mb-1">{product.name}</p>
                    <p className="text-sm font-bold text-gray-900">{product.price}</p>
                    {product.discount && (
                      <p className="text-xs font-semibold mt-1" style={{ color: brandKit.primaryColor }}>{product.discount}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        */}

        {/* COMMENTED OUT - Personalized Section - Home Type 
        {homeProducts.length > 0 && (
          <div className="mb-8">
            <div className="px-4 mb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Perfect for Your {getHomeTypeLabel(data.homeType!)}
              </h2>
              <button className="font-semibold text-sm" style={{ color: brandKit.primaryColor }}>See All</button>
            </div>
            <div className="flex gap-3 px-4 overflow-x-auto pb-2">
              {homeProducts.map((product, idx) => (
                <div key={idx} className="flex-shrink-0 w-40 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <p className="text-xs text-gray-900 font-medium line-clamp-2 mb-1">{product.name}</p>
                    <p className="text-sm font-bold text-gray-900">{product.price}</p>
                    {product.discount && (
                      <p className="text-xs font-semibold mt-1" style={{ color: brandKit.primaryColor }}>{product.discount}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        */}

        {/* Personalized Profile Summary Card */}
        <div className="px-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Profile</h3>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1 py-2">
          <Home className="w-6 h-6" style={{ color: brandKit.primaryColor }} />
          <span className="text-xs font-semibold" style={{ color: brandKit.primaryColor }}>Home</span>
        </button>
      </div>
    </div>
  );
}