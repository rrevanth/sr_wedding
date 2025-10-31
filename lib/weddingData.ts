export interface WeddingPage {
  type: 'image' | 'intro' | 'verse' | 'outro';
  content: string | {
    title?: string;
    subtitle?: string;
    lines?: string[];
    details?: string;
  };
  alt?: string;
}

export const weddingPages: WeddingPage[] = [
  // Page 0: Blank cover (hidden)
  {
    type: 'image',
    content: '/assets/images/cover.png',
    alt: 'Cover',
  },
  
  // Page 1: Intro Image (Left)
  {
    type: 'image',
    content: '/assets/images/intro.png',
    alt: 'Wedding Invitation',
  },
  
  // Page 2: Intro Text (Right)
  {
    type: 'intro',
    content: {
      title: 'Revoori',
      subtitle: 'Wedding Invitation',
    },
  },
  
  // Page 3: Our Story Image
  {
    type: 'image',
    content: '/assets/images/intro2.png',
    alt: 'Our Story',
  },
  
  // Page 4: Our Story Verse
  {
    type: 'verse',
    content: {
      lines: [
        "Sharabesham and Vasantha's dear son, Revanth,",
        'With Sravya, Vidyasagar and Rama\'s grant,',
        'A new life\'s journey they have now begun,',
        'Join us for joy, with love\'s sweet chant.',
      ],
    },
  },
  
  // Page 5: Haldi Image
  {
    type: 'image',
    content: '/assets/images/haldi.png',
    alt: 'Haldi Ceremony',
  },
  
  // Page 6: Haldi Details
  {
    type: 'verse',
    content: {
      lines: [
        'A splash of yellow, a sacred embrace,',
        'Turmeric blessings light each face.',
        'With joy and hues of green so bright,',
        'We gather to bathe the bride and groom in light.',
      ],
      details: '(22nd Nov 2025, 11:00 AM ? Haldi at Pool Deck, Waltair Club. Lunch follows. Attire: Yellows and Greens.)',
    },
  },
 
  // Page 7: Evening Dinner Image
  {
    type: 'image',
    content: '/assets/images/dinner.png',
    alt: 'Evening Dinner',
  },
  
  // Page 8: Evening Dinner Details
  {
    type: 'verse',
    content: {
      lines: [
        'As twilight falls, the royal hues bloom,',
        'With laughter and warmth in every room.',
        'At The Crown, under chandeliers\' gleam,',
        'We dine and rejoice, living the dream.',
      ],
      details: '(22nd Nov 2025, 7:00 PM ? Venue: The Crown, Welcome Hotel. Attire: Royal Hues. Followed by dinner.)',
    },
  },
  
  // Page 9: Wedding Image
  {
    type: 'image',
    content: '/assets/images/wedding.png',
    alt: 'Wedding Ceremony',
  },
  
  // Page 10: Wedding Details
  {
    type: 'verse',
    content: {
      lines: [
        'Amid blooming flowers, vows are made,',
        'Promises whispered, traditions displayed.',
        'At Sai Priya\'s embrace so true,',
        'Two souls unite, old made anew.',
      ],
      details: '(23rd Nov 2025, 10:58 AM ? Venue: Sai Priya Resorts, Vizag. Attire: Traditional. Followed by lunch.)',
    },
  },
  
  // Page 11: Vratham Image
  {
    type: 'image',
    content: '/assets/images/vratham.png',
    alt: 'Sri Satyanarayana Vratham',
  },
  
  // Page 12: Vratham Details
  {
    type: 'verse',
    content: {
      lines: [
        'In prayerful calm beneath mango\'s shade,',
        'Blessings unfold, memories made.',
        'With hearts aligned and spirits free,',
        'We seek blessings for prosperity.',
      ],
      details: '(25th Nov 2025, 10:30 AM ? Venue: Mango Meadows, Gowrelly, Hyderabad. Attire: Traditional. Followed by lunch.)',
    },
  },
 
  // Page 13: End Image
  {
    type: 'image',
    content: '/assets/images/end.png',
    alt: 'Thank You',
  },
  
  // Page 14: Outro Verse with Start Over
  {
    type: 'outro',
    content: {
      lines: [
        'Peacocks dance as flowers fall,',
        'Love and joy embrace us all.',
        'Come bless the pair with heartfelt cheer,',
        'As they step forward, year to year.',
      ],
      details: '(We warmly invite family and friends to join in love, tradition, and celebration. Your presence will make these moments truly special.)',
    },
  },
];
