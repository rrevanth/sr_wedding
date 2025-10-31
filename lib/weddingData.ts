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
    content: '',
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
        'On November\'s twenty-second bright morn,',
        'At eleven, a new joy will be born.',
        'With turmeric blessings, life we adorn,',
        'In yellow and green, let spirits be drawn.',
      ],
      details: 'Join us at 11:00 AM at the Pool Deck, Waltair Club, followed by lunch.',
    },
  },
  
  // Page 7: Vratham Image
  {
    type: 'image',
    content: '/assets/images/vratham.png',
    alt: 'Vratham Ceremony',
  },
  
  // Page 8: Vratham Details
  {
    type: 'verse',
    content: {
      lines: [
        'On the twenty-third, at seven in the eve,',
        'Sacred rituals, blessings we receive.',
        'With prayers and chants, our hearts believe,',
        'In love and faith, we shall achieve.',
      ],
      details: 'Join us at 7:00 PM at Waltair Club, followed by dinner.',
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
        'On November\'s twenty-fourth day so fine,',
        'At seven thirty, our hearts entwine.',
        'With sacred vows and blessings divine,',
        'Two souls as one, forever shine.',
      ],
      details: 'Join us at 7:30 AM at Waltair Club for the wedding ceremony.',
    },
  },
  
  // Page 11: Dinner Image
  {
    type: 'image',
    content: '/assets/images/dinner.png',
    alt: 'Dinner Reception',
  },
  
  // Page 12: Dinner Details
  {
    type: 'verse',
    content: {
      lines: [
        'As evening falls on this blessed day,',
        'At seven, we gather, come what may.',
        'With feast and joy, in grand array,',
        'Celebrate with us, in every way.',
      ],
      details: 'Join us at 7:00 PM at Waltair Club for the dinner reception.',
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
        'So come and join, with blessings bright,',
        'And fill our days with love and light.',
        'Your presence makes our future right,',
        'A truly unforgettable sight.',
      ],
    },
  },
];
