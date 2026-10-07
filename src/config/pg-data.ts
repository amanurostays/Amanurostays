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
    name: "Amanora",
    displayName: "Amanora Stays",
    legalName: "Amanora Stays Men's PG & Coliving",
    tagline: "Premium & Budget Men's PG in Palayam, Trivandrum",
    shortDescription: "Quality living for gentlemen, students, and working professionals in the heart of Trivandrum. High-speed Wi-Fi, washing machine, 24/7 water & electricity, 3-times food arrangement, security, and regular housekeeping.",
    primaryPhone: "", // kept blank
    primaryPhoneClean: "",
    whatsappNumber: "", // kept blank
    email: "contact@amanorastays.in",
    city: "Trivandrum",
    state: "Kerala",
    startingPrice: 3499,
    startingPriceDisplay: "₹3,499",
    targetAudience: "Gents / Students & Working Professionals",
    logoPath: "/logo.png",
  },

  branches: [
    {
      id: "palayam-flagship",
      name: "Amanora Stays - Palayam (Main Hub)",
      locality: "Palayam",
      city: "Trivandrum",
      landmark: "Near University of Kerala, Saphalyam Complex & Secretariat, Palayam",
      address: "Palayam, Thiruvananthapuram, Kerala - 695034",
      phone: "",
      whatsapp: "",
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
      id: "technopark-expansion",
      name: "Amanora Stays - Kazhakkoottam / Technopark",
      locality: "Kazhakkoottam (Technopark Corridor)",
      city: "Trivandrum",
      landmark: "Near Technopark Main Gate, Kazhakkoottam",
      address: "Technopark Phase 1 & 3 Corridor, Kazhakkoottam, Trivandrum, Kerala",
      phone: "",
      whatsapp: "",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15779.489115291244!2d76.874136!3d8.558231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05befafcf7394d%3A0xf6509f7a55920a06!2sTechnopark%2C%20Thiruvananthapuram!5e0!3m2!1sen!2sin!4v1700000000000",
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
      id: "vazhuthacaud-expansion",
      name: "Amanora Stays - Vazhuthacaud",
      locality: "Vazhuthacaud / Women's College Jn",
      city: "Trivandrum",
      landmark: "Near Cotton Hill & Vazhuthacaud Junction",
      address: "Vazhuthacaud, Thiruvananthapuram, Kerala",
      phone: "",
      whatsapp: "",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.74312!2d76.96!3d8.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb00!2sVazhuthacaud!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Vazhuthacaud+Thiruvananthapuram",
      coordinates: {
        latitude: 8.498,
        longitude: 76.964,
      },
      totalBeds: 45,
      isFlagship: false,
      status: "Launching Soon",
    },
    {
      id: "karyavattom-expansion",
      name: "Amanora Stays - Karyavattom (Campus Hub)",
      locality: "Karyavattom (University Campus)",
      city: "Trivandrum",
      landmark: "Near Greenfield Stadium & Kerala University Campus",
      address: "Karyavattom, Thiruvananthapuram, Kerala",
      phone: "",
      whatsapp: "",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15780.0!2d76.88!3d8.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bf00!2sKariavattom!5e0!3m2!1sen!2sin!4v1700000000000",
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
        "High-speed Wi-Fi included",
        "24/7 Water & Electricity covered",
        "Regular housekeeping & washing machine access",
        "Optional 3-times daily food arrangement",
        "Round-the-clock CCTV security",
      ],
      specs: {
        washroom: "Attached Clean Washroom",
        ventilation: "Airy & bright room",
        powerBackup: true,
        storage: "Allocated Lockers/Shelves",
      },
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
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
        "Spacious attached washroom with running water",
        "Dedicated cupboards per resident",
        "High-speed Wi-Fi throughout the floor",
        "Water & electricity charges covered",
        "Housekeeping & washing machine facility",
        "3-times food arrangement available on request",
      ],
      specs: {
        washroom: "Spacious Attached",
        ventilation: "Wide airy windows",
        powerBackup: true,
        storage: "Dedicated Cupboards",
      },
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
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
        "Attached washroom with 24/7 running water",
        "High-speed Wi-Fi access",
        "Separate dedicated wardrobes with locks",
        "Water and electricity covered",
        "3-times food arrangement (optional for those who want it)",
        "Washing machine access & regular housekeeping",
      ],
      specs: {
        washroom: "Attached Washroom",
        ventilation: "Cross-ventilated room",
        powerBackup: true,
        storage: "Individual Wardrobes",
      },
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
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
        "Attached / dedicated washroom",
        "High-speed Wi-Fi router coverage",
        "Personal study table & chair",
        "Individual steel/wooden wardrobe with locker",
        "Water & electricity included",
        "3-times food arrangement available on request",
        "Regular housekeeping & washing machine access",
      ],
      specs: {
        washroom: "Attached / Private",
        ventilation: "Well-ventilated with window",
        powerBackup: true,
        storage: "Dedicated Wardrobe + Lock",
      },
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    },
  ] as RoomPlan[],

  dormitory: {
    title: "Executive Dormitory (Daily Basis)",
    subtitle: "Affordable daily stay pods for travelers, exam aspirants, and short-term visitors in Trivandrum",
    status: "Launching Soon",
    stayType: "Daily Basis Stay (Not Monthly)",
    badge: "Daily Basis Stay • Launching Soon",
    description: "Planned exclusively for daily basis guests—such as candidates writing PSC/university exams, job interviewees, transit travelers, and backpackers looking for comfortable short-term accommodation in Palayam.",
    highlights: [
      "Daily basis booking model (pay per day / flexible short stays)",
      "Individual bed pod with clean linen and charging points",
      "Secure individual luggage lockers",
      "High-speed Wi-Fi and clean washroom facilities",
      "24/7 Water & Electricity",
      "Walking distance to Palayam central bus hubs & exam centers",
    ],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },

  amenities: [
    {
      id: "wifi",
      title: "High-Speed Wi-Fi",
      description: "Fast, reliable internet across all floors and rooms, ideal for college study, IT work, and browsing.",
      category: "Essential Utilities",
      iconName: "Wifi",
      highlight: "Uncapped High Speed",
    },
    {
      id: "washing-machine",
      title: "Washing Machine",
      description: "Dedicated automatic washing machines for residents to do their laundry conveniently.",
      category: "Living Comfort",
      iconName: "Shirt",
      highlight: "Self-Service Laundry",
    },
    {
      id: "water-electricity",
      title: "Water & Electricity",
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
      description: "Premises protected with CCTV surveillance and secure entry management for resident safety.",
      category: "Safety & Cleanliness",
      iconName: "ShieldCheck",
      highlight: "Safe & Protected",
    },
    {
      id: "housekeeping",
      title: "Regular Housekeeping",
      description: "Scheduled cleaning of common areas, corridors, and washrooms to maintain high hygiene standards.",
      category: "Safety & Cleanliness",
      iconName: "Sparkles",
      highlight: "Clean & Sanitized",
    },
  ] as Amenity[],

  faqs: [
    {
      question: "Where is Amanora Stays located in Trivandrum?",
      answer: "Our main hub is situated in Palayam, Trivandrum—within walking distance of the University of Kerala, Government Secretariat, Saphalyam Complex, and Palayam bus junction. We are also planning 4 to 5 more PGs across Trivandrum soon.",
      category: "Location & Dormitory",
    },
    {
      question: "What is the starting price for rooms at Amanora Stays?",
      answer: "Our room stays start from ₹3,499 for four-sharing budget accommodations. For Single, Double, and Triple sharing options, please contact us directly for exact price details and availability.",
      category: "Pricing & Booking",
    },
    {
      question: "Is the Dormitory option available on a monthly or daily basis?",
      answer: "Our upcoming Dormitory option is being launched strictly on a daily basis (per-day stays), specifically tailored for exam aspirants, interview candidates, and short-term visitors in Trivandrum. It is not for monthly stays.",
      category: "Location & Dormitory",
    },
    {
      question: "How does the food arrangement work?",
      answer: "We offer an optional 3-times homestyle meal arrangement (Breakfast, Lunch, and Dinner) for those who want it. Residents who prefer eating outside or ordering can choose stay-only plans.",
      category: "Food & Meals",
    },
    {
      question: "Are water and electricity charges included?",
      answer: "Yes, 24/7 water and electricity coverage is fully provided for our residents along with high-speed Wi-Fi, washing machine access, and regular housekeeping.",
      category: "Amenities & Utilities",
    },
    {
      question: "How can I inquire about room availability or book a visit?",
      answer: "Click the 'Schedule Visit' or 'Contact Us' button anywhere on the page to submit your details. Our property team will promptly get in touch with you.",
      category: "Pricing & Booking",
    },
  ] as FaqItem[],

  seo: {
    siteUrl: "https://amanorastays.in",
    metaTitle: "Amanora Stays | Men's PG & Coliving in Palayam, Trivandrum",
    metaDescription: "Looking for a quality Gents PG in Palayam, Trivandrum? Amanora Stays offers Single, Double, Triple & Four sharing rooms starting from ₹3,499. High-speed Wi-Fi, washing machine, water & electricity, 3x food arrangement & security.",
    keywords: [
      "Amanora Stays",
      "Amanora PG Trivandrum",
      "Gents PG Palayam Trivandrum",
      "Men's PG in Palayam",
      "PG in Trivandrum for Gents",
      "Budget PG in Trivandrum",
      "Single room PG Palayam",
      "Four sharing PG Trivandrum",
      "Hostel near University of Kerala Palayam",
      "Daily stay dormitory Trivandrum",
    ],
  },
};
