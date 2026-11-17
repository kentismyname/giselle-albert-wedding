
/* =========================================
   GISELLE & ALBERT
   WEDDING INVITATION DATA
========================================= */

/* =========================================
   ASSET URL HELPER

   Supports:
   - Local Vite development
   - GitHub Pages project hosting
   - Production builds

   Assets must be stored in:
   public/images/
   public/audio/
========================================= */

export const assetUrl = (path) => {
  if (!path) return "";

  const cleanPath = String(path).replace(/^\/+/, "");

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

/* =========================================
   MAIN WEDDING INFORMATION
========================================= */

export const wedding = {
  bride: "Giselle",
  groom: "Albert",

  // Placeholder: confirm actual wedding date.
  date: "2026-11-17",
  time: "10:00",

  location: "The Philippines",

  heroImage: assetUrl("images/couple-hero.jpg"),

  musicFile: assetUrl("audio/wedding-music.mp3"),
};

/* =========================================
   WEDDING DATE
   PHILIPPINE TIME (UTC+08:00)
========================================= */

export const weddingDate = new Date(
  `${wedding.date}T${wedding.time}:00+08:00`
);

/* =========================================
   FORMATTED WEDDING DATE
========================================= */

export const formattedDate =
  weddingDate.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/* =========================================
   ENVELOPE ANIMATION TIMINGS
========================================= */

export const ANIMATION_TIMINGS = {
  flap: 800,
  letter: 1400,
  reveal: 1600,
  finish: 1200,
};

/* =========================================
   FLOATING NAVIGATION
========================================= */

export const navigation = [
  { label: "Home", id: "home" },
  { label: "Countdown", id: "countdown" },
  { label: "Save the Date", id: "save-date" },
  { label: "Our Love Story", id: "love-story" },
  { label: "Gallery", id: "gallery" },
  { label: "Wedding Details", id: "wedding-details" },
  { label: "Entourage", id: "entourage" },
  { label: "RSVP", id: "rsvp" },
  { label: "Confirmed Guests", id: "confirmed-guests" },
  { label: "Guest Information", id: "guest-information" },
];

/* =========================================
   PHASE 04 — OUR LOVE STORY
========================================= */

export const loveStory = [
  {
    id: "how-we-met",

    label: "CHAPTER ONE",
    title: "How We Met",

    date: "",

    image: assetUrl("images/love-story-1.jpg"),

    imageAlt: "Giselle and Albert together",

    description:
      "Every beautiful story has a beginning. " +
      "Ours started with a simple moment that " +
      "would eventually change our lives forever.",
  },

  {
    id: "falling-in-love",

    label: "CHAPTER TWO",
    title: "Falling in Love",

    date: "",

    image: assetUrl("images/love-story-2.jpg"),

    imageAlt:
      "A special memory of Giselle and Albert",

    description:
      "Through countless conversations, shared " +
      "laughter, and unforgettable memories, " +
      "we discovered that the most beautiful " +
      "part of life was sharing it together.",
  },

  {
    id: "the-proposal",

    label: "CHAPTER THREE",
    title: "The Proposal",

    date: "",

    image: assetUrl("images/love-story-3.jpg"),

    imageAlt:
      "A romantic moment from Giselle and Albert's journey",

    description:
      "One question, one beautiful answer, " +
      "and a promise to choose each other " +
      "through every chapter of life. " +
      "The beginning of our forever.",
  },
];

/* =========================================
   PHASE 05 — WEDDING PHOTO GALLERY
========================================= */

export const galleryPhotos = [
  {
    id: "gallery-01",
    src: assetUrl("images/gallery/gallery-01.jpg"),
    alt: "Giselle and Albert together",
    caption: "The Beginning of Us",
    size: "large",
  },

  {
    id: "gallery-02",
    src: assetUrl("images/gallery/gallery-02.jpg"),
    alt: "A beautiful memory together",
    caption: "Beautiful Moments",
    size: "normal",
  },

  {
    id: "gallery-03",
    src: assetUrl("images/gallery/gallery-03.jpg"),
    alt: "Giselle and Albert enjoying a special day",
    caption: "Love & Laughter",
    size: "tall",
  },

  {
    id: "gallery-04",
    src: assetUrl("images/gallery/gallery-04.jpg"),
    alt: "A romantic couple portrait",
    caption: "Forever Together",
    size: "normal",
  },

  {
    id: "gallery-05",
    src: assetUrl("images/gallery/gallery-05.jpg"),
    alt: "A memorable day with Giselle and Albert",
    caption: "Our Favorite Memories",
    size: "wide",
  },

  {
    id: "gallery-06",
    src: assetUrl("images/gallery/gallery-06.jpg"),
    alt: "A special romantic moment",
    caption: "Only You",
    size: "normal",
  },

  {
    id: "gallery-07",
    src: assetUrl("images/gallery/gallery-07.jpg"),
    alt: "Giselle and Albert celebrating their love",
    caption: "The Best Is Yet to Come",
    size: "tall",
  },

  {
    id: "gallery-08",
    src: assetUrl("images/gallery/gallery-08.jpg"),
    alt: "A cherished memory of the couple",
    caption: "Our Journey",
    size: "normal",
  },

  {
    id: "gallery-09",
    src: assetUrl("images/gallery/gallery-09.jpg"),
    alt: "A beautiful moment from their love story",
    caption: "Always & Forever",
    size: "wide",
  },
];

/* =========================================
   PHASE 06 — WEDDING DETAILS
========================================= */

export const weddingDetails = [
  {
    id: "ceremony",
    type: "ceremony",

    label: "THE SACRED UNION",
    title: "The Ceremony",

    name: "",
    time: "",
    address: "",

    mapUrl:
      "https://maps.app.goo.gl/FQK1e6ibnXhhpSoP7",

    image: assetUrl("images/wedding-ceremony.jpg"),

    description:
      "Where two hearts become one, and a lifetime of love begins.",
  },

  {
    id: "reception",
    type: "reception",

    label: "THE CELEBRATION OF LOVE",
    title: "The Reception",

    name: "",
    time: "",
    address: "",

    mapUrl:
      "https://maps.app.goo.gl/fU81ShddcPzoXhye8",

    image: assetUrl("images/wedding-reception.jpg"),

    description:
      "Join us for a joyful celebration filled with love, laughter, and memories.",
  },
];

/* =========================================
   PHASE 07 — WEDDING ENTOURAGE
   MOCK DATA ONLY
========================================= */

export const entourage = {
  principalSponsors: {
    title: "Principal Sponsors",
    subtitle: "Our beloved Ninongs & Ninangs",

    pairs: [
      {
        id: "principal-01",
        male: "Mr. Roberto Santos",
        female: "Mrs. Elena Santos",
      },
      {
        id: "principal-02",
        male: "Mr. Antonio Reyes",
        female: "Mrs. Maria Reyes",
      },
      {
        id: "principal-03",
        male: "Mr. Fernando Cruz",
        female: "Mrs. Patricia Cruz",
      },
      {
        id: "principal-04",
        male: "Mr. Eduardo Garcia",
        female: "Mrs. Cristina Garcia",
      },
      {
        id: "principal-05",
        male: "Mr. Ricardo Mendoza",
        female: "Mrs. Teresa Mendoza",
      },
      {
        id: "principal-06",
        male: "Mr. Gabriel Flores",
        female: "Mrs. Isabel Flores",
      },
    ],
  },

  honorAttendants: [
    {
      id: "maid-of-honor",
      role: "Maid of Honor",
      name: "Sophia Reyes",
    },
    {
      id: "best-man",
      role: "Best Man",
      name: "Daniel Santos",
    },
  ],

  bridesmaids: [
    "Isabella Cruz",
    "Camila Garcia",
    "Olivia Mendoza",
    "Andrea Flores",
    "Gabriella Ramos",
  ],

  groomsmen: [
    "Nathan Reyes",
    "Joshua Cruz",
    "Ethan Garcia",
    "Liam Mendoza",
    "Miguel Ramos",
  ],

  secondarySponsors: [
    {
      id: "candle",
      title: "Candle Sponsors",
      subtitle: "To light our path together",
      names: ["Adrian Lopez", "Bianca Torres"],
    },
    {
      id: "veil",
      title: "Veil Sponsors",
      subtitle: "To symbolize our unity",
      names: ["Christian Rivera", "Danica Morales"],
    },
    {
      id: "cord",
      title: "Cord Sponsors",
      subtitle: "To bind our hearts as one",
      names: ["Francis Navarro", "Angela Castillo"],
    },
  ],

  littleEntourage: [
    {
      id: "ring-bearer",
      role: "Ring Bearer",
      names: ["Lucas Santos"],
    },
    {
      id: "coin-bearer",
      role: "Coin Bearer",
      names: ["Noah Reyes"],
    },
    {
      id: "bible-bearer",
      role: "Bible Bearer",
      names: ["Ethan Cruz"],
    },
    {
      id: "flower-girls",
      role: "Flower Girls",
      names: [
        "Mia Garcia",
        "Ella Mendoza",
        "Sofia Flores",
      ],
    },
  ],
};

/* =========================================
   PHASE 08 — CONFIRMED GUESTS
   MOCK DATA ONLY
========================================= */

export const mockConfirmedGuests = [
  {
    id: "mock-001",
    fullName: "Maria Santos",
    guestCount: 2,
    attendance: "accept",
  },
  {
    id: "mock-002",
    fullName: "Juan Dela Cruz",
    guestCount: 1,
    attendance: "accept",
  },
  {
    id: "mock-003",
    fullName: "Sofia Reyes",
    guestCount: 2,
    attendance: "accept",
  },
  {
    id: "mock-004",
    fullName: "Daniel Cruz",
    guestCount: 1,
    attendance: "accept",
  },
  {
    id: "mock-005",
    fullName: "Isabella Garcia",
    guestCount: 1,
    attendance: "accept",
  },
  {
    id: "mock-006",
    fullName: "Miguel Mendoza",
    guestCount: 2,
    attendance: "accept",
  },
  {
    id: "mock-007",
    fullName: "Camila Flores",
    guestCount: 1,
    attendance: "accept",
  },
  {
    id: "mock-008",
    fullName: "Gabriel Reyes",
    guestCount: 2,
    attendance: "accept",
  },
];

/* =========================================
   PHASE 09 — GUEST INFORMATION
   MOCK DATA ONLY
========================================= */

export const guestInformation = {
  dressCode: {
    title: "Dress Code",
    eyebrow: "DRESS TO CELEBRATE",
    heading: "Formal & Elegant",

    description:
      "We would love to see our guests dressed in elegant formal attire. " +
      "To complement our wedding celebration, we encourage you to " +
      "wear colors inspired by our chosen palette.",

    colors: [
      {
        id: "emerald",
        name: "Emerald Green",
        hex: "#0B5D46",
      },
      {
        id: "sage",
        name: "Sage Green",
        hex: "#A3B899",
      },
      {
        id: "champagne",
        name: "Champagne",
        hex: "#E8D5B5",
      },
      {
        id: "beige",
        name: "Warm Beige",
        hex: "#D9C6A5",
      },
      {
        id: "gold",
        name: "Soft Gold",
        hex: "#C9A961",
      },
    ],

    gentlemen:
      "Formal suits, long-sleeved polo, or barong-inspired attire.",

    ladies:
      "Elegant gowns, formal dresses, or sophisticated evening attire.",

    note:
      "Kindly reserve white and ivory for the bride.",
  },

  giftGuide: {
    eyebrow: "WITH LOVE & GRATITUDE",
    title: "Gift Guide",

    description:
      "Your presence at our wedding is the greatest gift we could ask for. " +
      "Should you wish to honor us with a gift, a monetary contribution " +
      "toward our future together would be sincerely appreciated.",

    closing:
      "Above all, your love, prayers, and presence mean the world to us.",
  },

  reminders: [
    {
      id: "arrival",
      title: "Arrive Early",

      description:
        "We kindly encourage guests to arrive at least " +
        "30 minutes before the ceremony begins.",

      icon: "clock",
    },
    {
      id: "unplugged",
      title: "Unplugged Ceremony",

      description:
        "We invite you to be fully present during our vows. " +
        "Please keep your phones silent and allow our " +
        "photographers to capture the moment.",

      icon: "camera",
    },
    {
      id: "seating",
      title: "Reserved Seating",

      description:
        "Please follow the seating arrangements prepared " +
        "for our guests at the reception.",

      icon: "users",
    },
    {
      id: "rsvp",
      title: "RSVP Confirmation",

      description:
        "Kindly confirm your attendance through our RSVP " +
        "section so we can prepare for your arrival.",

      icon: "heart",
    },
  ],

  faqs: [
    {
      id: "faq-01",
      question: "Can I bring a plus-one?",

      answer:
        "We kindly request that only guests included " +
        "in the invitation attend our celebration. " +
        "Thank you for understanding.",
    },
    {
      id: "faq-02",
      question: "Can I bring my children?",

      answer:
        "We love your little ones! However, our celebration " +
        "will be reserved for invited guests, including " +
        "children specifically named in the invitation.",
    },
    {
      id: "faq-03",
      question: "What time should I arrive?",

      answer:
        "We recommend arriving at least 30 minutes " +
        "before the ceremony to allow enough time " +
        "for seating and preparation.",
    },
    {
      id: "faq-04",
      question: "Can I take photos during the ceremony?",

      answer:
        "We kindly ask everyone to keep their phones " +
        "away during the ceremony. You're welcome " +
        "to take photos during the reception.",
    },
    {
      id: "faq-05",
      question: "What if I cannot attend?",

      answer:
        "We completely understand. Please let us know " +
        "through our RSVP section so we can finalize " +
        "the guest arrangements.",
    },
    {
      id: "faq-06",
      question: "Is there a parking area?",

      answer:
        "Parking information will be provided once " +
        "the ceremony and reception venues are finalized.",
    },
  ],
};
