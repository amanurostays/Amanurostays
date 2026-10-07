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
  status: "Active" | "Opening Soon";
}

export interface RoomPlan {
  id: string;
  title: string;
  subtitle: string;
  pricePerMonth: number;
  originalPrice?: number;
  securityDeposit: string;
  sharingType: "Single Private" | "Double Sharing" | "Triple Sharing" | "Four Sharing";
  badge?: string;
  features: string[];
  specs: {
    roomSize: string;
    washroom: "Attached Private" | "Attached Dedicated";
    acAvailable: boolean;
    balcony: boolean;
    workDesk: boolean;
  };
  image: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  category: "Comfort & Living" | "Food & Dining" | "Work & Tech" | "Safety & Cleanliness";
  iconName: string;
  highlight?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  stayDuration: string;
  branch: string;
  rating: number;
  review: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "Pricing & Booking" | "Food & Meals" | "Amenities & Facilities" | "Rules & Safety";
}

export const PG_DATA = {
  brand: {
    name: "Zenith Living",
    legalName: "Zenith Living Luxury Men's PG & Coliving",
    tagline: "Premium Men's PG & Coliving Spaces Designed for Ambitious Minds",
    shortDescription: "Experience hassle-free coliving for gentlemen. Fully furnished premium rooms, 3-times homestyle meals, 300 Mbps Wi-Fi, daily housekeeping, and 24/7 biometric security.",
    primaryPhone: "+91 98765 43210",
    primaryPhoneClean: "+919876543210",
    whatsappNumber: "919876543210",
    whatsappDefaultMessage: "Hello Zenith Living, I'm interested in booking a room visit. Please share availability and current pricing.",
    email: "stay@zenithliving.in",
    establishedYear: "2024",
    overallRating: 4.9,
    totalReviewsCount: 380,
    googleReviewUrl: "https://maps.google.com",
    city: "Bangalore",
    targetAudience: "Gents / Working Professionals & Students",
  },

  branches: [
    {
      id: "koramangala-flagship",
      name: "Zenith Living - Koramangala (Flagship)",
      locality: "Koramangala 4th Block",
      city: "Bangalore",
      landmark: "Near Sony World Signal & Wipro Park",
      address: "Plot 42, 80 Feet Road, 4th Block, Koramangala, Bangalore, Karnataka - 560034",
      phone: "+91 98765 43210",
      whatsapp: "919876543210",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.276326162624!2d77.618645!3d12.934533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e54e4277b%3A0x6d9f7c0a6b986161!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      mapDirectionsUrl: "https://maps.google.com/?q=Koramangala+Bangalore",
      coordinates: {
        latitude: 12.9352,
        longitude: 77.6245,
      },
      totalBeds: 65,
      isFlagship: true,
      status: "Active",
    },
    {
      id: "hsr-layout",
      name: "Zenith Living - HSR Layout (Sector 2)",
      locality: "HSR Layout Sector 2",
      city: "Bangalore",
      landmark: "Opposite BDA Complex, near 27th Main",
      address: "Building 18, 27th Main Road, Sector 2, HSR Layout, Bangalore, Karnataka - 560102",
      phone: "+91 98765 43211",
      whatsapp: "919876543210",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15556.123456789!2d77.64!3d12.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1490!2sHSR+Layout!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=HSR+Layout+Bangalore",
      coordinates: {
        latitude: 12.9116,
        longitude: 77.6389,
      },
      totalBeds: 50,
      isFlagship: false,
      status: "Active",
    },
    {
      id: "electronic-city-phase1",
      name: "Zenith Living - Electronic City (Phase 1)",
      locality: "Electronic City Phase 1",
      city: "Bangalore",
      landmark: "Next to Infosys Gate 6 / Wipro Gate",
      address: "Tech Zone Avenue, Phase 1, Electronic City, Bangalore, Karnataka - 560100",
      phone: "+91 98765 43212",
      whatsapp: "919876543210",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15560!2d77.66!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c!2sElectronic+City!5e0!3m2!1sen!2sin!4v1700000000000",
      mapDirectionsUrl: "https://maps.google.com/?q=Electronic+City+Phase+1+Bangalore",
      coordinates: {
        latitude: 12.8452,
        longitude: 77.6602,
      },
      totalBeds: 80,
      isFlagship: false,
      status: "Opening Soon",
    },
  ] as Branch[],

  roomPlans: [
    {
      id: "single-private-ac",
      title: "Executive Single Room (Private)",
      subtitle: "Ultimate privacy & comfort for focused professionals & founders",
      pricePerMonth: 16500,
      originalPrice: 18000,
      securityDeposit: "1 Month Rent (100% Refundable)",
      sharingType: "Single Private",
      badge: "Most Popular for WFH",
      features: [
        "Private King Single Bed with Orthopedic Mattress",
        "Dedicated Attached Washroom with Hot Geyser",
        "Air Conditioner (Energy-Efficient Inverter AC)",
        "Spacious Ergonomic Work Desk + Mesh Chair",
        "3-Door Wardrobe with Digital Locker",
        "Private Balcony with City View",
        "High-Speed 300 Mbps Dedicated LAN & Wi-Fi",
      ],
      specs: {
        roomSize: "180 sq.ft.",
        washroom: "Attached Private",
        acAvailable: true,
        balcony: true,
        workDesk: true,
      },
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "double-sharing-luxury",
      title: "Premium Double Sharing",
      subtitle: "Spacious dual occupancy with balanced privacy and affordability",
      pricePerMonth: 10500,
      originalPrice: 12000,
      securityDeposit: "1 Month Rent (100% Refundable)",
      sharingType: "Double Sharing",
      badge: "Best Value",
      features: [
        "Two Independent Single Beds with Premium Mattresses",
        "Attached Modern Washroom with 24/7 Geyser",
        "Individual 2-Door Wardrobes with Key Locks",
        "Dual Workstations with Power Outlets",
        "AC & Non-AC Variants Available",
        "Weekly Linen & Bedding Change",
        "Daily Deep Room Sanitization",
      ],
      specs: {
        roomSize: "220 sq.ft.",
        washroom: "Attached Private",
        acAvailable: true,
        balcony: true,
        workDesk: true,
      },
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "triple-sharing-smart",
      title: "Smart Triple Sharing",
      subtitle: "Budget-friendly shared living with uncompromising amenities",
      pricePerMonth: 7800,
      originalPrice: 8900,
      securityDeposit: "1 Month Rent (100% Refundable)",
      sharingType: "Triple Sharing",
      badge: "High Demand",
      features: [
        "Individual Beds with Storage Drawers",
        "Spacious Attached Washroom with Western Fittings",
        "Separate Dedicated Cupboard per Resident",
        "High-Speed Wi-Fi on Every Floor",
        "3-Times Hygienic Meals Included",
        "Daily Housekeeping & Trash Disposal",
        "Access to Gym, Lounge & Gaming Zone",
      ],
      specs: {
        roomSize: "260 sq.ft.",
        washroom: "Attached Private",
        acAvailable: false,
        balcony: false,
        workDesk: true,
      },
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    },
  ] as RoomPlan[],

  amenities: [
    {
      id: "meals",
      title: "3x Nutritious Meals Daily",
      description: "Homestyle breakfast, lunch, and dinner prepared fresh in an in-house hygienic kitchen. Special Sunday non-veg / paneer feasts.",
      category: "Food & Dining",
      iconName: "Utensils",
      highlight: "Unlimited North & South Indian Menu",
    },
    {
      id: "wifi",
      title: "Ultra-Fast 300 Mbps Wi-Fi",
      description: "Dual-band enterprise mesh Wi-Fi with seamless roaming on every floor and zero dropouts for WFH, Zoom calls & gaming.",
      category: "Work & Tech",
      iconName: "Wifi",
      highlight: "Zero Lag WFH Ready",
    },
    {
      id: "housekeeping",
      title: "Daily Professional Housekeeping",
      description: "Daily room sweeping, mopping, bathroom scrubbing, and regular bed linen changes to keep your space spotless.",
      category: "Safety & Cleanliness",
      iconName: "Sparkles",
      highlight: "Hotel-Grade Hygiene",
    },
    {
      id: "security",
      title: "Biometric Access & 24/7 CCTV",
      description: "Multi-tier security with biometric fingerprint gates, 64+ HD CCTV cameras across common areas, and dedicated night security warden.",
      category: "Safety & Cleanliness",
      iconName: "ShieldCheck",
      highlight: "Resident Safety #1",
    },
    {
      id: "power-backup",
      title: "100% DG Power Backup",
      description: "Heavy-duty automatic diesel generator ensuring uninterrupted electricity for lights, fans, Wi-Fi, and work setups 24/7.",
      category: "Comfort & Living",
      iconName: "Zap",
      highlight: "Zero Power Cuts",
    },
    {
      id: "laundry",
      title: "Automatic Washing Machines",
      description: "Free access to commercial front-load washing machines with dedicated terrace drying racks and iron stations.",
      category: "Comfort & Living",
      iconName: "Shirt",
      highlight: "Self-Service Laundry",
    },
    {
      id: "water",
      title: "24/7 Hot Water & RO Drinking Water",
      description: "Solar & electric geysers in every washroom, plus multi-stage RO water purifiers with UV/UF filtration on each floor.",
      category: "Comfort & Living",
      iconName: "Droplets",
      highlight: "Tested Mineral Water",
    },
    {
      id: "gym-recreation",
      title: "Fitness Center & Game Lounge",
      description: "Modern fitness equipment, dumbbell rack, PS5 console, table tennis, foosball, and community screening lounge for weekend matches.",
      category: "Work & Tech",
      iconName: "Dumbbell",
      highlight: "Community & Wellness",
    },
  ] as Amenity[],

  foodDetails: {
    title: "Delicious, Fresh & Wholesome Meals",
    subtitle: "Prepared daily by professional in-house chefs with zero compromise on oil quality, hygiene, and taste.",
    highlights: [
      { label: "Breakfast (7:30 AM - 10:00 AM)", desc: "Idli Sambar, Dosa, Poha, Aloo Paratha, Upma, Boiled Eggs & Tea/Coffee" },
      { label: "Lunch (12:30 PM - 2:30 PM)", desc: "Roti, Rice, Dal Fry, Fresh Sabzi, Curd, Salad & Papad (Lunchbox packing available)" },
      { label: "Dinner (7:45 PM - 10:30 PM)", desc: "Hot Chapati, Paneer Curry, Chicken Biryani (Wed/Sun), Rajma/Chole, Jeera Rice & Sweet" },
    ],
    features: [
      "FSSAI-certified kitchen cleanliness protocol",
      "Fresh daily vegetables and farm-sourced ingredients",
      "RO purified water used exclusively for all cooking",
      "Special festival feasts & birthday community dinners",
    ],
  },

  comparisonTable: [
    { feature: "Brokerage / Commission", zenith: "₹0 (Zero Brokerage)", localPg: "Demands 15-30 days brokerage" },
    { feature: "Security Deposit", zenith: "Only 1 Month (100% Refundable)", localPg: "2 to 3 Months (Deductions frequent)" },
    { feature: "Food Quality & Cleanliness", zenith: "In-house Chef, FSSAI Certified", localPg: "Outsourced, repetitive & oily" },
    { feature: "Wi-Fi Stability", zenith: "300 Mbps Enterprise Mesh Router", localPg: "Single shared router with dropouts" },
    { feature: "Maintenance Turnaround", zenith: "Same-Day Resolution via Ticket", localPg: "Takes days or goes unanswered" },
    { feature: "Power & Water Backup", zenith: "100% Automatic Generator + RO", localPg: "Frequent outages, no generator" },
  ],

  testimonials: [
    {
      id: "t1",
      author: "Aditya Sharma",
      role: "Senior Software Engineer @ Flipkart",
      stayDuration: "Resident for 1.5 Years",
      branch: "Koramangala",
      rating: 5,
      review: "Moving to Bangalore was stressful until I found Zenith Living. The 300 Mbps Wi-Fi is flawless for remote work, rooms are cleaned every single day, and the food actually tastes like home. No crazy landlord restrictions either!",
      date: "August 2024",
    },
    {
      id: "t2",
      author: "Karthik Menon",
      role: "Product Manager @ Razorpay",
      stayDuration: "Resident for 11 Months",
      branch: "HSR Layout",
      rating: 5,
      review: "The transparent pricing with just 1 month deposit won me over immediately. The gym on the terrace and community gaming nights on weekends make it feel like a genuine home, not just a rented room.",
      date: "September 2024",
    },
    {
      id: "t3",
      author: "Rohan Verma",
      role: "Data Analyst @ Deloitte",
      stayDuration: "Resident for 8 Months",
      branch: "Koramangala",
      rating: 5,
      review: "Biometric access gives huge peace of mind. The management team handles any maintenance request within hours. By far the cleanest gents PG in Koramangala.",
      date: "October 2024",
    },
  ] as Review[],

  faqs: [
    {
      question: "What is the security deposit and notice period at Zenith Living?",
      answer: "We believe in complete transparency. We only charge 1 month rent as a security deposit, which is 100% refundable upon move-out. Our notice period is just 30 days.",
      category: "Pricing & Booking",
    },
    {
      question: "Are meals included in the monthly rent?",
      answer: "Yes! 3 nutritious homestyle meals (Breakfast, Lunch, and Dinner) along with evening tea are completely included in your monthly rent. On working days, we also provide lunchbox packing for office and college goers.",
      category: "Food & Meals",
    },
    {
      question: "Is high-speed Wi-Fi provided and is it suitable for Work From Home (WFH)?",
      answer: "Absolutely. We provide dedicated 300 Mbps enterprise dual-band mesh Wi-Fi with access points on every floor, ensuring zero dead zones and seamless video calls (Zoom, Teams, Google Meet) for IT professionals.",
      category: "Amenities & Facilities",
    },
    {
      question: "What are the check-in timings and security rules?",
      answer: "Residents have biometric fingerprint access 24/7 for seamless entry. While there is no restrictive curfew for working professionals with night shifts, we maintain strict visitor verification and zero illegal substance policy to guarantee safety.",
      category: "Rules & Safety",
    },
    {
      question: "Can I schedule a physical or virtual room visit before booking?",
      answer: "Yes, we encourage room visits! You can click the 'Schedule a Visit' button or message us directly on WhatsApp at +91 98765 43210. Our property manager will show you the available rooms, dining area, and facilities.",
      category: "Pricing & Booking",
    },
    {
      question: "Are there any hidden maintenance or utility charges?",
      answer: "No hidden charges whatsoever. High-speed Wi-Fi, 3 meals, daily housekeeping, RO water, and common area amenities are all bundled in your monthly rent. Individual room AC power consumption is metered transparently at official government unit rates.",
      category: "Pricing & Booking",
    },
    {
      question: "What items do I need to bring when moving in?",
      answer: "Your room comes fully furnished with a bed, premium mattress, clean bedsheet, wardrobe with locker, work desk, and chair. You only need to bring your personal clothes, toiletries, and laptop!",
      category: "Amenities & Facilities",
    },
  ] as FaqItem[],

  seo: {
    siteUrl: "https://zenithliving.in",
    metaTitle: "Zenith Living | Best Luxury Men's PG & Coliving in Bangalore",
    metaDescription: "Looking for the best Gents PG in Koramangala & HSR Layout, Bangalore? Zenith Living offers luxury single & shared rooms, 3-times homestyle meals, 300 Mbps Wi-Fi, biometric security, and zero brokerage. Book a free visit today!",
    keywords: [
      "Gents PG in Bangalore",
      "Men's PG Koramangala",
      "PG for Men HSR Layout",
      "Luxury Coliving for Gents Bangalore",
      "Single Room PG for Men",
      "Executive Paying Guest Bangalore",
      "Gents PG with food and wifi",
      "Best PG near Sony World Signal",
      "Zero brokerage PG Bangalore",
      "Men's hostel with AC and food",
    ],
  },
};
