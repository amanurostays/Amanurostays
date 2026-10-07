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
    subTagline: "Premium & Affordable Mens PG & Boys PG in Palayam, Trivandrum",
    shortDescription: "Amanuro Stays provides comfortable, affordable Mens PG, Paying Guest accommodation, and student stay in Palayam, Trivandrum starting from ₹3,499. Perfect boys lodge and homestay living with high-speed Wi-Fi, washing machine, 24/7 water & electricity, and 3-times food arrangement.",
    primaryPhone: "+91 6282830532",
    primaryPhoneClean: "+916282830532",
    callingNumber: "6282830532",
    whatsappNumber: "919048575403",
    whatsappDisplay: "+91 9048575403",
    email: "contact@amanurostays.in",
    city: "Trivandrum",
    state: "Kerala",
    startingPrice: 3499,
    startingPriceDisplay: "₹3,499",
    targetAudience: "Gents / Students & Working Professionals",
    logoPath: "/amanuro-brand-logo.jpg",
  },

  branches: [
    {
      id: "palayam-flagship",
      name: "Amanuro Stays - Palayam (Main Hub)",
      locality: "Palayam",
      city: "Trivandrum",
      landmark: "Near University of Kerala, Saphalyam Complex & Secretariat, Palayam",
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
      id: "technopark-expansion",
      name: "Amanuro Stays - Kazhakkoottam / Technopark",
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
      name: "Amanuro Stays - Vazhuthacaud",
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
      name: "Amanuro Stays - Karyavattom (Campus Hub)",
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
        "Clean, well-maintained washrooms with running water",
        "Round-the-clock CCTV security",
      ],
      specs: {
        washroom: "Clean & Maintained Washrooms",
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
        "Clean, hygienic washrooms with 24/7 running water",
        "Dedicated cupboards per resident",
        "High-speed Wi-Fi throughout the floor",
        "Water & electricity charges covered",
        "Housekeeping & washing machine facility",
        "3-times food arrangement available on request",
      ],
      specs: {
        washroom: "Clean & Maintained Washrooms",
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
        "Clean washrooms with 24/7 running water",
        "High-speed Wi-Fi access",
        "Separate dedicated wardrobes with locks",
        "Water and electricity covered",
        "3-times food arrangement (optional for those who want it)",
        "Washing machine access & regular housekeeping",
      ],
      specs: {
        washroom: "Clean & Maintained Washrooms",
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
        "Dedicated clean washroom facilities",
        "High-speed Wi-Fi router coverage",
        "Personal study table & chair",
        "Individual steel/wooden wardrobe with locker",
        "Water & electricity included",
        "3-times food arrangement available on request",
        "Regular housekeeping & washing machine access",
      ],
      specs: {
        washroom: "Dedicated Clean Washrooms",
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
      question: "Where is this Mens PG in Trivandrum located?",
      answer: "Amanuro Stays is centrally located in Palayam, Trivandrum—within walking distance of the University of Kerala, Government Secretariat, Central Library, Saphalyam Complex, and Palayam Central Bus Terminal. We are also planning 4 to 5 more PGs across Trivandrum soon (near Technopark, Kazhakkoottam, and Vazhuthacaud).",
      category: "Location & Dormitory",
    },
    {
      question: "Why is Amanuro Stays known as an affordable PG in Trivandrum?",
      answer: "We offer budget four-sharing rooms starting from just ₹3,499 per month, making it one of the most affordable PG options in Trivandrum. Single, Double, and Triple sharing options are also available. Contact us directly for customized packages.",
      category: "Pricing & Booking",
    },
    {
      question: "Do you offer a PG with food in Trivandrum?",
      answer: "Yes! Amanuro Stays provides an optional 3-times homestyle food arrangement (Breakfast, Lunch, and Dinner) for those who want it. If you prefer eating out or ordering, you can choose a stay-only plan with zero compulsory food charges.",
      category: "Food & Meals",
    },
    {
      question: "Is this a PG with Wi-Fi in Trivandrum suitable for remote work and online study?",
      answer: "Absolutely. We provide high-speed, uncapped Wi-Fi across all floors and rooms, making our boys PG ideal for IT professionals working from home and college students preparing for university or competitive exams.",
      category: "Amenities & Utilities",
    },
    {
      question: "Do you provide a PG with washing machine in Trivandrum?",
      answer: "Yes, dedicated automatic washing machines and laundry drying areas are fully accessible for our residents so you can do your weekly laundry conveniently without extra fees.",
      category: "Amenities & Utilities",
    },
    {
      question: "Is Amanuro Stays suitable as a student PG and working men's PG in Trivandrum?",
      answer: "Yes, our premises cater specifically to college students (University of Kerala, civil service & PSC aspirants) and working gentlemen (Technopark engineers, bank officers, corporate professionals) with peaceful study hours and round-the-clock CCTV security.",
      category: "Location & Dormitory",
    },
    {
      question: "How does the upcoming daily basis Dormitory stay in Trivandrum work?",
      answer: "Our executive Dormitory pods are launching soon specifically on a daily basis (per-day stays), designed for students taking exams, job interviewees, transit travelers, and short-term backpackers in Trivandrum. It is not for monthly stays.",
      category: "Location & Dormitory",
    },
  ] as FaqItem[],

  seo: {
    siteUrl: "https://amanurostays.in",
    metaTitle: "Mens PG Trivandrum | Paying Guest, Student Stay & Lodge | Amanuro Stays",
    metaDescription: "Looking for a PG, Paying Guest, Homestay, or Lodge in Trivandrum? Amanuro Stays in Palayam offers budget stays from ₹3,499. Premier Mens PG, Boys Lodge & Student Stay with Wi-Fi, washing machine, 24/7 power, water & food arrangement.",
    keywords: [
      "PG in Trivandrum",
      "Mens PG Trivandrum",
      "Boys PG Trivandrum",
      "PG with food Trivandrum",
      "Affordable PG Trivandrum",
      "Working men's PG Trivandrum",
      "Student PG Trivandrum",
      "PG with Wi-Fi Trivandrum",
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
    ],
  },
};
