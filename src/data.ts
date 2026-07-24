import { ProgramItem, ColorSwatch, GalleryPhoto } from './types';

export const WEDDING_DATE = new Date('2026-08-22T10:00:00+03:00'); // East Africa Time

export const WEDDING_DETAILS = {
  couple: {
    bride: 'Phylis',
    groom: 'Collins',
    brideFull: 'Phylis Nanyama Sifuna',
    groomFull: 'Collins Kimenye Mativo',
    nickname: 'PhilCollins',
    featureHeadline: 'Our love story at the altar',
  },
  families: {
    brideFamily: "the family of the Late His Worship the Mayor, Mr. James Barasa Sifuna & Mrs. Bennardate Nasambu Mwanguli",
    groomFamily: "Mr. Joseph Mativo Kitonga & Mrs. Annah Ndinda Mativo",
    invitationMessage: "With grateful hearts, our families' blessings, and after years of hearing \"So, when is the wedding?\", the family of the Late His Worship the Mayor, Mr. James Barasa Sifuna & Mrs. Bennardate Nasambu Mwanguli, together with Mr. Joseph Mativo Kitonga & Mrs. Annah Ndinda Mativo, joyfully invite you to witness as Phylis & Collins finally bring their love story to the altar."
  },
  ceremony: {
    time: '10:00 a.m.',
    venue: 'St Austin’s Catholic Church',
    address: 'Rhapta Rd, Westlands, Nairobi, Kenya',
    coordinates: { lat: -1.2618, lng: 36.7905 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=St.+Austin%27s+Catholic+Church,+Rhapta+Rd,+Westlands,+Nairobi&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '12:30 p.m. onwards',
    venue: 'St Mary’s Msongari Grounds',
    address: 'Msongari / Rhapta Rd, Westlands, Nairobi, Kenya',
    coordinates: { lat: -1.2625, lng: 36.7878 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=St.+Mary%27s+School+Msongari,+Westlands,+Nairobi&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  contacts: [
    { name: 'Phylis & Collins RSVP', phone: '0711910037' },
    { name: 'Alternative RSVP', phone: '0726580861' },
  ],
  registry: {
    tillNumber: '3480983',
    accountName: 'Collins Kimenye Mativo',
    note: 'Guests keep time and come with the dancing shoes on!'
  },
  dressCode: {
    theme: 'Burgundy (strawberrish), Navy Blue plus a touch of gold',
    guideline: 'Ladies outshine the decor',
    kidsNote: 'We kindly prefer kids from close family and friends.'
  },
  bibleVerses: [
    {
      text: 'What therefore God hath joined together, let not man put asunder.',
      reference: 'Mark 10:9 (KJV)',
    },
    {
      text: 'Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.',
      reference: '1 Corinthians 13:4,7',
    }
  ]
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    title: 'Holy Matrimony Nuptial Mass',
    description: 'The Sacrament of Holy Matrimony at St Austin’s Catholic Church, Rhapta Rd, Westlands.',
    bullets: [
      'Processional & Opening Hymn',
      'Liturgy of the Word & Homily',
      'Exchange of Vows & Ring Blessing',
      'Nuptial Mass & Holy Communion',
      'Signing of Marriage Register & Photo Session'
    ],
    isChurch: true,
  },
  {
    time: '12:00 PM - 12:45 PM',
    duration: '45 mins',
    title: 'Bridal Party Photography',
    description: 'Bridal party photoshoot in the church grounds as guests transition to St Mary’s Msongari Grounds.',
    isChurch: false,
  },
  {
    time: '12:45 PM - 1:15 PM',
    duration: '30 mins',
    title: 'Arrival & Welcoming of Guests',
    description: 'Guests arrive at St Mary’s Msongari Grounds, ushered to assigned tables with welcome refreshments.',
    isChurch: false,
  },
  {
    time: '1:15 PM - 2:30 PM',
    duration: '1 hr 15 mins',
    title: 'Grand Entrance & Festive Feast',
    description: 'Grand entrance of the bridal team and newly married couple Phylis & Collins, followed by opening prayers and lunch service.',
    bullets: [
      'Master of Ceremonies Welcome',
      'Opening Prayer & Blessing of the Meal',
      'Sumptuous Buffet Lunch Service',
      'Entertainment & Background Music'
    ],
    isChurch: false,
  },
  {
    time: '2:30 PM - 3:30 PM',
    duration: '1 hour',
    title: 'Speeches, Tributes & Family Blessings',
    description: 'Heartfelt speeches and wisdom from parents, family elders, church representatives, and friends.',
    bullets: [
      'Remarks from Sifuna & Mwanguli Family',
      'Remarks from Kitonga & Mativo Family',
      'Friends, Workmates & Special Guests',
      'Couples Response & Gratitude'
    ],
    isChurch: false,
  },
  {
    time: '3:30 PM - 4:15 PM',
    duration: '45 mins',
    title: 'Cake Cutting & Toast',
    description: 'Cutting of the wedding cake, champagne toast, and serving parents, best couple, and guests.',
    bullets: ['Cake Cutting Ceremony', 'Champagne Toast', 'Serving Parents & Family Representatives', 'Cake Distribution'],
    isChurch: false,
  },
  {
    time: '4:15 PM - 5:00 PM',
    duration: '45 mins',
    title: 'Gift Presentation & Bouquet Toss',
    description: 'Gifting session, bouquet toss, and vote of thanks.',
    bullets: ['Monetary & Gift Presentation', 'Bouquet & Garter Toss', 'Vote of Thanks'],
    isChurch: false,
  },
  {
    time: '5:00 PM onwards',
    duration: 'Evening',
    title: 'Dancing & Celebration',
    description: 'Put your dancing shoes on! High-energy music, celebration, and evening fellowship with #PhilCollins.',
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Strawberrish Burgundy',
    hex: '#8B1E3F',
    textColor: '#FFFFFF',
    description: 'A rich, vibrant strawberry burgundy representing deep passion and royalty.'
  },
  {
    name: 'Deep Navy Blue',
    hex: '#002147',
    textColor: '#FFFFFF',
    description: 'A classic, sophisticated navy tone reflecting strength, loyalty, and dignity.'
  },
  {
    name: 'Touch of Gold',
    hex: '#D4AF37',
    textColor: '#1A1A1A',
    description: 'An elegant champagne metallic gold accent symbolizing eternal love and grace.'
  }
];

export const INITIAL_GALLERY: GalleryPhoto[];
