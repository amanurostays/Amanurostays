export interface Branch {
  id: string;
  name: string;
  locality: string;
  city: string;
  landmark: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  totalBeds: number;
  isFlagship: boolean;
  status: "Active" | "Launching Soon";
}

export interface RoomPlan {
  id: string;
  title: string;
  subtitle: string;
  tier: "Budget" | "Premium";
  startingPriceText: string;
  hasStartingRate?: boolean;
  sharingType: "Single" | "Double" | "Triple" | "Four";
  badge?: string;
  features: string[];
  specs: {
    washroom: string;
    ventilation: string;
    powerBackup: boolean;
    storage: string;
  };
  image: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  category: "Essential Utilities" | "Food & Dining" | "Living Comfort" | "Safety & Cleanliness";
  iconName: string;
  highlight?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "Pricing & Booking" | "Food & Meals" | "Amenities & Utilities" | "Location & Dormitory";
}

export const PG_DATA = {
  brand: {
    name: "Amanuro",
    displayName: "Amanuro Stays",
    legalName: "Amanuro Stays Men's PG & Coliving",
    tagline: "Comfort. Living. Belonging.",
    subTagline: "Premier & Affordable Mens PG & Boys PG across Trivandrum",
    shortDescription: "Amanuro Stays provides comfortable, affordable Mens PG, Paying Guest accommodation, sharing rooms, and student stay across Trivandrum (Palayam, Pattom, Edappazhanji, and upcoming Technopark) starting from ₹3,499. Safe, alcohol-free, drug-free & disturbance-free environment with high speed 5G Wi-Fi, washing machine, 24/7 water & electricity, and 3-times food arrangement.",
    primaryPhone: "+91 6282830532",
    primaryPhoneClean: "+916282830532",
    callingNumber: "6282830532",
    whatsappNumber: "919048575403",
    whatsappDisplay: "+91 9048575403",
    email: "contact@amanuro.in",
    city: "Trivandrum",
    state: "Kerala",
    startingPrice: 3499,
    startingPriceDisplay: "₹3,499",
    targetAudience: "Gents / Students & Working Professionals",
    logoPath: "/amanuro-brand-logo.jpg",
  },

  hubs: [
    "Palayam",
    "Pattom",
    "Statue",
    "Thampanoor",
    "Panavila",
    "Museum",
    "Nanthencode",
    "Vellayambalam",
    "Vazhuthacaud",
    "Upcoming Technopark",
  ],

  branches: [
    {
      id: "palayam-hub",
      name: "Amanuro Stays - Palayam (Open)",
      locality: "Palayam",
      city: "Trivandrum",
      landmark: "Near Sanskrit College, RBI (Reserve Bank of India), University of Kerala & Secretariat",
      address: "Palayam, Thiruvananthapuram, Kerala - 695034",
      phone: "+91 6282830532",
      whatsapp: "+91 9048575403",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Palayam+Thiruvananthapuram",
      coordinates: {
        latitude: 8.5029,
        longitude: 76.9535,
      },
      totalBeds: 50,
      isFlagship: true,
      status: "Active",
    },
    {
      id: "pattom-hub",
      name: "Amanuro Stays - Pattom (Open)",
      locality: "Pattom",
      city: "Trivandrum",
      landmark: "Near Pattom Junction, Statue Corridor & PSC Office",
      address: "Pattom, Thiruvananthapuram, Kerala - 695004",
      phone: "+91 6282830532",
      whatsapp: "+91 9048575403",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Pattom+Thiruvananthapuram",
      coordinates: {
        latitude: 8.5241,
        longitude: 76.9416,
      },
      totalBeds: 45,
      isFlagship: false,
      status: "Active",
    },
    {
      id: "edappazhanji-hub",
      name: "Amanuro Stays - Edappazhanji (Open)",
      locality: "Edappazhanji",
      city: "Trivandrum",
      landmark: "Near Edappazhanji Junction, Vazhuthacaud & Pangode",
      address: "Edappazhanji, Thiruvananthapuram, Kerala - 695014",
      phone: "+91 6282830532",
      whatsapp: "+91 9048575403",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Edappazhanji+Thiruvananthapuram",
      coordinates: {
        latitude: 8.5042,
        longitude: 76.9712,
      },
      totalBeds: 40,
      isFlagship: false,
      status: "Active",
    },
    {
      id: "kazhakkoottam-expansion",
      name: "Amanuro Stays - Kazhakkoottam (Coming Soon)",
      locality: "Kazhakkoottam",
      city: "Trivandrum",
      landmark: "Near Technopark Main Gate & NH Bypass Corridor",
      address: "Technopark Phase 1 & 3 Corridor, Kazhakkoottam, Trivandrum, Kerala",
      phone: "+91 6282830532",
      whatsapp: "+91 9048575403",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Technopark+Trivandrum",
      coordinates: {
        latitude: 8.5582,
        longitude: 76.8812,
      },
      totalBeds: 60,
      isFlagship: false,
      status: "Launching Soon",
    },
    {
      id: "karyavattom-expansion",
      name: "Amanuro Stays - Karyavattom (Coming Soon)",
      locality: "Karyavattom",
      city: "Trivandrum",
      landmark: "Near Kerala University Campus & Greenfield Stadium",
      address: "Karyavattom, Thiruvananthapuram, Kerala",
      phone: "+91 6282830532",
      whatsapp: "+91 9048575403",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.567300713506!2d76.945532!3d8.502941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb6a27e025d%3A0xbcfc11267b14d246!2sPalayam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Karyavattom+Thiruvananthapuram",
      coordinates: {
        latitude: 8.567,
        longitude: 76.892,
      },
      totalBeds: 50,
      isFlagship: false,
      status: "Launching Soon",
    },
  ] as Branch[],

  roomPlans: [
    {
      id: "four-sharing",
      title: "Four Sharing Room",
      subtitle: "Our most economical living option with zero compromise on cleanliness",
      tier: "Budget",
      startingPriceText: "Starting from ₹3,499",
      hasStartingRate: true,
      sharingType: "Four",
      badge: "Best Economy Stay",
      features: [
        "Starting from ₹3,499 / month",
        "Individual cot and mattress for each resident",
        "High speed 5G Wi-Fi included",
        "24/7 Water & Electricity covered",
        "Scheduled cleaning & washing machine access",
        "Optional 3-times daily food arrangement",
        "Clean, well-maintained washrooms with running water",
        "Alcohol-free, drug-free & disturbance-free safe environment",
      ],
      specs: {
        washroom: "Clean & Maintained Washrooms",
        ventilation: "Airy & bright room",
        powerBackup: true,
        storage: "Allocated Lockers/Shelves",
      },
      image: "/images/rooms/four-sharing.jpg",
    },
    {
      id: "triple-sharing",
      title: "Triple Sharing Room",
      subtitle: "Spacious shared living offering great comfort at affordable rates",
      tier: "Budget",
      startingPriceText: "Contact us for price details",
      sharingType: "Triple",
      badge: "Budget Friendly",
      features: [
        "Three individual beds with clean setups",
        "Clean, hygienic washrooms with 24/7 running water",
        "Dedicated cupboards per resident",
        "High speed 5G Wi-Fi throughout the floor",
        "Water & electricity charges covered",
        "Scheduled cleaning & washing machine facility",
        "Optional 3-times food arrangement available",
        "Alcohol-free, drug-free & calm study atmosphere",
      ],
      specs: {
        washroom: "Clean & Maintained Washrooms",
        ventilation: "Wide airy windows",
        powerBackup: true,
        storage: "Dedicated Cupboards",
      },
      image: "/images/rooms/triple-sharing.jpg",
    },
    {
      id: "double-sharing",
      title: "Double Sharing Room",
      subtitle: "Comfortable dual-occupancy with balanced space and privacy",
      tier: "Premium",
      startingPriceText: "Contact us for price details",
      sharingType: "Double",
      badge: "Most Popular",
      features: [
        "Two separate comfortable beds with quality mattresses",
        "Clean washrooms with 24/7 running water",
        "High speed 5G Wi-Fi access",
        "Separate dedicated wardrobes with locks",
        "Water and electricity covered",
        "Optional 3-times food arrangement",
        "Washing machine access & scheduled cleaning",
        "Disciplined, disturbance-free secure setup",
      ],
      specs: {
        washroom: "Clean & Maintained Washrooms",
        ventilation: "Cross-ventilated room",
        powerBackup: true,
        storage: "Individual Wardrobes",
      },
      image: "/images/rooms/double-sharing.jpg",
    },
    {
      id: "single-premium",
      title: "Single Room",
      subtitle: "Personal private sanctuary for students & focused professionals",
      tier: "Premium",
      startingPriceText: "Contact us for price details",
      sharingType: "Single",
      badge: "Maximum Privacy",
      features: [
        "Private individual room with single bed & mattress",
        "Dedicated clean washroom facilities",
        "High speed 5G Wi-Fi router coverage",
        "Personal study table & chair",
        "Individual steel/wooden wardrobe with locker",
        "Water & electricity included",
        "Optional 3-times food arrangement",
        "Scheduled cleaning & washing machine access",
      ],
      specs: {
        washroom: "Dedicated Clean Washrooms",
        ventilation: "Well-ventilated with window",
        powerBackup: true,
        storage: "Dedicated Wardrobe + Lock",
      },
      image: "/images/rooms/single-room.jpg",
    },
  ] as RoomPlan[],

  dormitory: {
    title: "Executive Dormitory (Monthly Basis)",
    subtitle: "Pod stays for exam students with study rooms and calm environment",
    status: "Launching Soon",
    stayType: "Monthly / Daily",
    badge: "Monthly / Daily • Launching Soon",
    description: "Executive Dormitory pod stays designed for exam students, competitive exam aspirants, and focused individuals with dedicated study rooms, high speed 5G Wi-Fi, and a calm, disturbance-free environment across Trivandrum.",
    highlights: [
      "Stay model: Monthly / Daily flexible options",
      "Pod stays for exam students with study rooms & calm environment",
      "High speed 5G Wi-Fi for uninterrupted online study & work",
      "Strictly alcohol-free, drug-free & disturbance-free safe environment",
      "Individual bed pod with clean linen, reading lights & charging points",
      "Secure individual luggage lockers and scheduled cleaning",
      "Quick access to all parts of the city and all-time availability",
    ],
    image: "/images/rooms/dormitory-pods.jpg",
  },

  amenities: [
    {
      id: "wifi",
      title: "High Speed 5G Wi-Fi",
      description: "Fast, reliable high speed 5G Wi-Fi across all floors and rooms, ideal for college study, IT work, and browsing.",
      category: "Essential Utilities",
      iconName: "Wifi",
      highlight: "High Speed 5G Wi-Fi Included",
    },
    {
      id: "washing-machine",
      title: "Washing Machine Facility",
      description: "Dedicated automatic washing machines for residents to do their laundry conveniently with drying area.",
      category: "Living Comfort",
      iconName: "Shirt",
      highlight: "Washing Machine Facility",
    },
    {
      id: "water-electricity",
      title: "24/7 Water & Electricity",
      description: "24/7 continuous running water supply and electricity coverage to ensure you never face utility disruptions.",
      category: "Essential Utilities",
      iconName: "Zap",
      highlight: "24/7 Continuous Supply",
    },
    {
      id: "food-arrangement",
      title: "3 Times Food Arrangement",
      description: "Hygienic 3-times homestyle meal arrangement (Breakfast, Lunch & Dinner) available for those who want it.",
      category: "Food & Dining",
      iconName: "Utensils",
      highlight: "Optional For Those Who Want It",
    },
    {
      id: "security",
      title: "Round-the-Clock Security",
      description: "Premises protected with CCTV surveillance, disciplined entry, and strictly alcohol-free & drug-free rules.",
      category: "Safety & Cleanliness",
      iconName: "ShieldCheck",
      highlight: "Safe & Alcohol/Drug-Free",
    },
    {
      id: "housekeeping",
      title: "Scheduled Cleaning",
      description: "Scheduled cleaning of common areas, corridors, and washrooms to maintain high hygiene standards.",
      category: "Safety & Cleanliness",
      iconName: "Sparkles",
      highlight: "Scheduled Cleaning",
    },
  ] as Amenity[],

  faqs: [
    {
      question: "Where are your Mens PG branches located in Trivandrum?",
      answer: "Amanuro Stays has sufficient branches across Trivandrum with quick access to all parts of the city and all-time availability. Currently Open: Palayam (near Sanskrit College, RBI, Secretariat & University), Pattom (near Statue corridor), and Edappazhanji. Coming Soon: Kazhakkoottam (Technopark corridor) and Karyavattom (Campus Hub).",
      category: "Location & Dormitory",
    },
    {
      question: "Why is Amanuro Stays known as an affordable PG in Trivandrum?",
      answer: "We offer budget sharing rooms starting from just ₹3,499 per month, making it one of the most affordable PG options across Trivandrum. Single rooms and sharing rooms are available. Contact us directly for customized packages.",
      category: "Pricing & Booking",
    },
    {
      question: "Do you offer a PG with food in Trivandrum?",
      answer: "Yes! Amanuro Stays provides an optional 3-times homestyle food arrangement (Breakfast, Lunch, and Dinner) for those who want it. If you prefer eating out or ordering, you can choose Option A: Stay-only living with zero compulsory food charges.",
      category: "Food & Meals",
    },
    {
      question: "Is high speed 5G Wi-Fi available for study and remote work?",
      answer: "Yes! We provide high speed 5G Wi-Fi across all floors and rooms, making our PG ideal for IT professionals working remotely and college students preparing for competitive or university exams.",
      category: "Amenities & Utilities",
    },
    {
      question: "Do you provide washing machine facilities?",
      answer: "Yes, dedicated automatic washing machines and drying areas are accessible for residents so you can do your weekly laundry conveniently without extra fees.",
      category: "Amenities & Utilities",
    },
    {
      question: "Is the environment safe, disciplined, and peaceful?",
      answer: "Absolutely. Amanuro Stays is strictly an alcohol-free, drug-free, and disturbance-free safe and secure environment—not the typical old lodge setup. We cater to focused students, exam aspirants, and working gentlemen with round-the-clock CCTV surveillance.",
      category: "Safety & Cleanliness",
    },
    {
      question: "How does the upcoming Executive Dormitory stay work?",
      answer: "Our Executive Dormitory is launching soon on a monthly / daily basis, designed specifically as pod stays for exam students with dedicated study rooms and a calm, quiet environment across Trivandrum.",
      category: "Location & Dormitory",
    },
  ] as FaqItem[],

  seo: {
    siteUrl: "https://amanuro.in",
    metaTitle: "Affordable PG in the heart of Trivandrum | Amanuro Stays",
    metaDescription: "Looking for a PG, Paying Guest, Homestay, or Lodge in Trivandrum? Amanuro Stays offers budget sharing rooms across Trivandrum from ₹3,499. Premier Mens PG, Boys Lodge & Student Stay with high speed 5G Wi-Fi, washing machine, 24/7 power, water & food arrangement.",
    keywords: [
      "PG in Trivandrum",
      "Mens PG Trivandrum",
      "Boys PG Trivandrum",
      "Dormitory Trivandrum",
      "Executive Dormitory Trivandrum",
      "Dormitory in Trivandrum",
      "Sharing rooms in Trivandrum",
      "Sharing rooms PG Palayam",
      "Single room PG Trivandrum",
      "Budget sharing rooms Trivandrum",
      "PG with food Trivandrum",
      "Affordable PG Trivandrum",
      "Working men's PG Trivandrum",
      "Student PG Trivandrum",
      "PG with high speed 5G Wi-Fi Trivandrum",
      "PG with washing machine Trivandrum",
      "Paying Guest Trivandrum",
      "Paying Guest in Trivandrum",
      "Paying Guest Palayam",
      "Gents Paying Guest Trivandrum",
      "Boys Paying Guest Trivandrum",
      "Stay in Trivandrum",
      "Men's Stay Trivandrum",
      "Student Stay Trivandrum",
      "Budget Stay Trivandrum",
      "Homestay Trivandrum",
      "Gents Homestay Trivandrum",
      "Homestay in Trivandrum for Gents",
      "Lodge in Trivandrum",
      "Boys Lodge Trivandrum",
      "Lodge near Palayam Trivandrum",
      "Gents Lodge Palayam",
      "Amanuro Stays",
      "Amanuro PG",
      "PG in Palayam Trivandrum",
      "PG in Pattom Trivandrum",
      "PG in Edappazhanji Trivandrum",
    ],
  },
};
