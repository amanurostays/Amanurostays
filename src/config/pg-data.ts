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
  startingPrice: number;
  priceDisplay: string;
  sharingType: "Single" | "Double" | "Triple" | "Four" | "Dormitory";
  badge?: string;
  features: string[];
  specs: {
    washroom: string;
    ventilation: string;
    powerBackup: boolean;
    storage: string;
  };
  image: string;
  isLaunchingSoon?: boolean;
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
  category: "Pricing & Booking" | "Food & Mess" | "Amenities & Utilities" | "Location & Rules";
}

export const PG_DATA = {
  brand: {
    name: "Amanora",
    displayName: "Amanora Stays",
    legalName: "Amanora Stays Men's PG & Coliving",
    tagline: "Premium & Budget Men's PG in Palayam, Trivandrum",
    shortDescription: "Quality living for gentlemen, students, and working professionals in the heart of Trivandrum. High-speed Wi-Fi, washing machine, 24/7 water & electricity, 3-times food arrangement, security, and regular housekeeping.",
    primaryPhone: "", // kept blank as requested
    primaryPhoneClean: "",
    whatsappNumber: "", // kept blank as requested
    email: "contact@amanorastays.in",
    city: "Trivandrum",
    state: "Kerala",
    startingPrice: 3499,
    targetAudience: "Gents / Students & Working Professionals",
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
      id: "single-premium",
      title: "Single Room",
      subtitle: "Personal private sanctuary for students & focused professionals",
      tier: "Premium",
      startingPrice: 6999,
      priceDisplay: "Starts from ₹6,999",
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
    {
      id: "double-sharing",
      title: "Double Sharing Room",
      subtitle: "Comfortable dual-occupancy with balanced space and privacy",
      tier: "Premium",
      startingPrice: 4999,
      priceDisplay: "Starts from ₹4,999",
      sharingType: "Double",
      badge: "Most Popular",
      features: [
        "Two separate comfortable beds with quality mattresses",
        "Attached washroom with 24/7 running water",
        "High-speed Wi-Fi access",
        "Separate dedicated wardrobes with locks",
        "Water and electricity covered",
        "3 times food arrangement (optional for those who want it)",
        "Washing machine access & housekeeping",
        "CCTV security and peaceful atmosphere",
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
      id: "triple-sharing",
      title: "Triple Sharing Room",
      subtitle: "Spacious shared living offering premium amenities at affordable rates",
      tier: "Budget",
      startingPrice: 3999,
      priceDisplay: "Starts from ₹3,999",
      sharingType: "Triple",
      badge: "Budget Friendly",
      features: [
        "Three individual beds with clean bed setups",
        "Spacious attached washroom with running water",
        "Dedicated cupboards/shelves per resident",
        "High-speed Wi-Fi throughout the floor",
        "Water & electricity charges included",
        "Housekeeping & washing machine facility",
        "3-times food arrangement (optional add-on)",
        "Secure premises with CCTV coverage",
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
      id: "four-sharing",
      title: "Four Sharing Room",
      subtitle: "Our most economical living option with zero compromise on cleanliness",
      tier: "Budget",
      startingPrice: 3499,
      priceDisplay: "Starts from ₹3,499",
      sharingType: "Four",
      badge: "Best Economy Stay",
      features: [
        "Individual cot and mattress for each resident",
        "Unbeatable entry price starting from ₹3,499",
        "High-speed Wi-Fi for study & work",
        "Water & electricity included",
        "Regular housekeeping of room and washrooms",
        "Washing machine facility for clothes",
        "Optional 3-times daily meals available",
        "Round-the-clock security surveillance",
      ],
      specs: {
        washroom: "Attached Clean Washroom",
        ventilation: "Airy & bright room",
        powerBackup: true,
        storage: "Allocated Lockers/Shelves",
      },
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    },
  ] as RoomPlan[],

  dormitory: {
    title: "Executive Dormitory Stays",
    subtitle: "Ultra-flexible, pocket-friendly capsule & pod-style community living in Trivandrum",
    startingPrice: 2999,
    status: "Launching Soon",
    badge: "Coming Soon to Palayam & Technopark",
    description: "Designed for job aspirants, exam candidates, interns, and backpackers looking for short or medium-term stays with individual privacy curtains, personal charging ports, Wi-Fi, and clean washrooms.",
    highlights: [
      "Custom privacy curtains and reading lamp per pod",
      "Individual secure luggage locker",
      "High-speed Wi-Fi and common study zone",
      "24/7 Water, Electricity & Housekeeping",
      "Washing machine and optional meal arrangement",
      "Prime Palayam center location - walkable to coaching centers & bus hubs",
    ],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },

  amenities: [
    {
      id: "wifi",
      title: "High-Speed Wi-Fi",
      description: "Fast, reliable internet across all floors and rooms, ideal for college study, IT work, and video streaming.",
      category: "Essential Utilities",
      iconName: "Wifi",
      highlight: "Uncapped High Speed",
    },
    {
      id: "washing-machine",
      title: "Washing Machine",
      description: "Dedicated automatic washing machines for residents to do their laundry hassle-free, with drying area.",
      category: "Living Comfort",
      iconName: "Shirt",
      highlight: "Self-Service Laundry",
    },
    {
      id: "water-electricity",
      title: "24/7 Water & Electricity",
      description: "Continuous running water supply and electricity coverage to ensure you never face utility disruptions.",
      category: "Essential Utilities",
      iconName: "Zap",
      highlight: "Continuous Supply",
    },
    {
      id: "food-arrangement",
      title: "3 Times Food Arrangement",
      description: "Hygienic 3-times homestyle meal arrangements (Breakfast, Lunch & Dinner) available for residents who want it.",
      category: "Food & Dining",
      iconName: "Utensils",
      highlight: "Optional Meal Service",
    },
    {
      id: "security",
      title: "Round-the-Clock Security",
      description: "Premises protected with CCTV surveillance and secure entry management to ensure resident safety at all times.",
      category: "Safety & Cleanliness",
      iconName: "ShieldCheck",
      highlight: "Safe & Protected",
    },
    {
      id: "housekeeping",
      title: "Regular Housekeeping",
      description: "Scheduled cleaning of common areas, corridors, and washrooms to maintain high hygiene and cleanliness standards.",
      category: "Safety & Cleanliness",
      iconName: "Sparkles",
      highlight: "Clean & Sanitized",
    },
  ] as Amenity[],

  faqs: [
    {
      question: "Where is Amanora Stays located in Trivandrum?",
      answer: "Our main hub is situated in Palayam, Trivandrum—within walking distance of the University of Kerala, Government Secretariat, Saphalyam Complex, and Palayam bus junction. We are also expanding to Kazhakkoottam (near Technopark), Vazhuthacaud, and Karyavattom.",
      category: "Location & Rules",
    },
    {
      question: "What are the available room types and starting prices?",
      answer: "We offer Single, Double, Triple, and Four sharing rooms in both Premium and Budget categories starting from ₹3,499. Exact monthly pricing varies based on room type and amenities. Contact us for current price details and package options.",
      category: "Pricing & Booking",
    },
    {
      question: "Is food mandatory or optional at Amanora Stays?",
      answer: "Food is flexible! We provide 3-times homestyle meal arrangements (breakfast, lunch, and dinner) specifically for those residents who want it. If you prefer eating outside or ordering, you can opt for stay-only plans.",
      category: "Food & Mess",
    },
    {
      question: "What utilities are included in the stay?",
      answer: "High-speed Wi-Fi, 24/7 water and electricity, regular housekeeping, washing machine access, and security surveillance are fully provided for residents.",
      category: "Amenities & Utilities",
    },
    {
      question: "When is the Dormitory option launching?",
      answer: "Our executive Dormitory stay option is Launching Soon in Trivandrum. It is designed for students, exam aspirants, and short-term visitors who want ultra-budget capsule beds with all standard amenities.",
      category: "Pricing & Booking",
    },
    {
      question: "How can I book a room visit or get exact price details?",
      answer: "You can click the 'Contact Us' or 'Schedule a Visit' button on the website and submit your inquiry form. Our team will promptly get in touch with available bed options and customized pricing.",
      category: "Pricing & Booking",
    },
  ] as FaqItem[],

  seo: {
    siteUrl: "https://amanorastays.in",
    metaTitle: "Amanora Stays | Best Men's PG & Coliving in Palayam, Trivandrum",
    metaDescription: "Looking for a quality Gents PG in Palayam, Trivandrum? Amanora Stays offers Single, Double, Triple & Four sharing rooms (Budget & Premium) starting from ₹3,499. High-speed Wi-Fi, washing machine, 24/7 water & power, 3x food arrangement & security.",
    keywords: [
      "Amanora Stays",
      "Amanora PG Trivandrum",
      "Gents PG Palayam Trivandrum",
      "Men's PG in Palayam",
      "PG in Trivandrum for Gents",
      "Budget PG in Trivandrum",
      "Single room PG Palayam",
      "Hostel near University of Kerala Palayam",
      "PG near Secretariat Trivandrum",
      "Paying guest accommodation Trivandrum",
      "Technopark PG Trivandrum",
    ],
  },
};
