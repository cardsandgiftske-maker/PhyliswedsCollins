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
    brideFamily: "The family of the Late His Worship the Mayor, Mr. James Barasa Sifuna & Mrs. Bennardate Nasambu Mwanguli",
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
    venue: "St Mary's Msongari main school rugby pitch",
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
    kidsNote: 'With love for all our little ones, we ask that this celebration be an adults-only occasion, except for close family and friends'
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
    time: '9:30 AM - 10:15 AM',
    duration: '45 mins',
    title: 'Arrival & Ushering of Guests',
    description: 'Guests arrive at St Austin’s Catholic Church, Rhapta Rd, Westlands, and are ushered into the sanctuary.',
    isChurch: true,
  },
  {
    time: '10:30 AM - 12:00 PM',
    duration: '1 hr 30 mins',
    title: 'Holy Matrimony Nuptial Mass',
    description: 'The Sacrament of Holy Matrimony at St Austin’s Catholic Church, commencing promptly at 10:30 AM.',
    isChurch: true,
  },
  {
    time: '12:00 PM - 12:45 PM',
    duration: '45 mins',
    title: 'Church Photo Session',
    description: 'Photo session with family, clergy, and guests at St Austin’s Catholic Church grounds following the Mass.',
    isChurch: true,
  },
  {
    time: '12:45 PM - 2:00 PM',
    duration: '1 hr 15 mins',
    title: 'Arboretum Shoot & Guest Cocktail Hour',
    description: 'Bridal party proceeds to Nairobi Arboretum for photography, while guests transition to St Mary’s Msongari for welcome cocktails and refreshments as they await the grand entrance once the bridal party returns.',
    isChurch: false,
  },
  {
    time: '2:00 PM - 3:15 PM',
    duration: '1 hr 15 mins',
    title: 'Grand Entrance & Festive Feast',
    description: 'Grand entrance of the bridal team and newly married couple Phylis & Collins upon return from the Arboretum, followed by opening prayers and lunch service.',
    isChurch: false,
  },
  {
    time: '3:15 PM - 4:15 PM',
    duration: '1 hour',
    title: 'Speeches, Tributes & Family Blessings',
    description: 'Heartfelt speeches and wisdom from parents, family elders, church representatives, and friends.',
    isChurch: false,
  },
  {
    time: '4:15 PM - 5:00 PM',
    duration: '45 mins',
    title: 'Cake Cutting & Toast',
    description: 'Cutting of the wedding cake, champagne toast, and serving parents, best couple, and guests.',
    isChurch: false,
  },
  {
    time: '5:00 PM - 5:45 PM',
    duration: '45 mins',
    title: 'Gift Presentation & Bouquet Toss',
    description: 'Gifting session, bouquet toss, and vote of thanks.',
    isChurch: false,
  },
  {
    time: '5:45 PM onwards',
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

export const INITIAL_GALLERY: GalleryPhoto[] = [];
