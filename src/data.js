/* All page copy and links live here, so content edits never touch the components.
   Copy must stay factual: see CLAUDE.md "Content and facts" before changing anything. */

/* Images live in public/assets/img and keep their filenames, so TOTO's originals can be swapped in */
/* BASE_URL keeps whatever vite.config.js `base` says, which may lack a trailing slash (e.g. '/toto-global') */
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const img = (name) => `${BASE}assets/img/${name}`;

const IN = 'https://in.toto.com';


/* Products mega menu (after Carysil): Browse → Categories → Series → Preview.
   Every category, series and product link is taken from in.toto.com's own category pages. */
const cat = (path) => `${IN}/product-category/${path}/`;
const prod = (slug) => `${IN}/product/${slug}/`;
const series = (codes, base) => codes.map((c) => ({ label: `${c} Series`, href: cat(`${base}/${c.toLowerCase()}-series`) }));

export const megaMenu = [
  {
    label: 'WASHLET', href: cat('washlet'), preview: 'col-washlet.webp', pos: '50% 50%',
    categories: [
      {
        label: 'WASHLET', href: cat('washlet'), unit: 'models',
        series: [
          { label: 'WASHLET RW', href: prod('washlet-rw') },
          { label: 'WASHLET S2', href: prod('washlet-s2') },
          { label: 'WASHLET S7', href: prod('washlet-s7-2') },
          { label: 'WASHLET SW', href: prod('washlet-sw') },
          { label: 'WASHLET C2', href: prod('washlet-6') },
        ],
      },
      { label: 'ECOWASHER', href: cat('ecowasher'), note: 'Cleansing comfort that runs without electricity, with a self-cleaning wand and a soft-closing lid.' },
    ],
  },
  {
    label: 'Toilets', href: cat('toilets'), preview: 'col-neorest.webp', pos: '50% 60%',
    categories: [
      {
        label: 'Smart Toilet', href: cat('toilets/smart-toilet'), unit: 'NEOREST models',
        series: [
          { label: 'NEOREST AS', href: prod('neorest-as-s-trap') },
          { label: 'NEOREST LS', href: prod('neorest-ls-s-trap') },
          { label: 'NEOREST NX-I', href: prod('neorest-nx-i-s-trap') },
          { label: 'NEOREST WX I', href: prod('neorest-wx-i-silver') },
        ],
      },
      { label: 'Wall Hung Toilet', href: cat('toilets/wall-hung-toilet') },
      { label: 'One-Piece', href: cat('toilets/one-piece') },
      { label: 'Two Piece Toilet', href: cat('toilets/two-piece-toilet') },
      { label: 'Seat Cover', href: cat('toilets/seat-cover') },
    ],
  },
  {
    label: 'Faucets', href: cat('fittings'), preview: 'prod-faucet.webp', pos: '50% 50%',
    categories: [
      {
        label: 'Faucet series', href: cat('fittings'), unit: 'series',
        series: [
          ...series(['ZA', 'ZL', 'ZN', 'GE', 'GC', 'GM', 'GB', 'GF', 'GA', 'GO', 'GR', 'GT', 'GS', 'LB', 'LC', 'LF', 'LH', 'LN'], 'fittings'),
          { label: 'REI', href: cat('fittings/rei') },
        ],
      },
      { label: 'Pull-out Faucet', href: cat('fittings/pull-out-faucet') },
      { label: 'Touchless Faucet', href: cat('public/touchless-faucet') },
    ],
  },
  {
    label: 'Showers', href: cat('showers'), preview: 'prod-shower.webp', pos: '40% 50%',
    categories: [
      { label: 'G Selection Showers', href: cat('showers/g-selection-showers') },
      { label: 'Z Selection Showers', href: cat('showers/z-selection-showers') },
      { label: 'L Selection Showers', href: cat('showers/l-selection-fittings') },
      { label: 'Hand Showers', href: cat('showers/hand-showers') },
      { label: 'Overhead Shower', href: cat('showers/fixed-shower-head') },
    ],
  },
  {
    label: 'Washbasins', href: cat('washbasins'), preview: 'prod-basin.webp', pos: '45% 60%',
    categories: [
      { label: 'Console', href: cat('washbasins/console') },
      { label: 'Self Rimming', href: cat('washbasins/self-rimming') },
      { label: 'Semi Recessed', href: cat('washbasins/semi-recessed') },
      { label: 'Under Counter', href: cat('washbasins/under-counter') },
      { label: 'Wall Hung', href: cat('washbasins/wall-hung-washbasins') },
      { label: 'Floor Standing', href: cat('washbasins/floor-standing') },
      { label: 'Reinforced Marble', href: cat('washbasins/galalato') },
    ],
  },
  {
    label: 'Bathtubs', href: cat('bathtubs'), preview: 'col-tub.webp', pos: '50% 58%',
    categories: [
      { label: 'Flotation Tub', href: cat('bathtubs/flotation-tub') },
      { label: 'GALALATO', href: cat('bathtubs/galalato-bathtubs') },
      { label: 'Enameled Cast Iron', href: cat('bathtubs/enameled-cast-iron') },
      { label: 'Acrylic', href: cat('bathtubs/acrylic') },
      { label: 'Pearl Acrylic', href: cat('bathtubs/pearl-acrylic') },
    ],
  },
  {
    label: 'Accessories', href: cat('accessories'), preview: 'feat-design.webp', pos: '50% 40%',
    categories: [
      { label: 'G Selection', href: cat('accessories/g-selection-2') },
      { label: 'L Selection', href: cat('accessories/l-selection') },
      { label: 'Handrail', href: cat('accessories/handrail') },
      { label: 'Others', href: cat('accessories/others') },
    ],
  },
  {
    label: 'Public', href: cat('public'), preview: 'prod-public.webp', pos: '50% 50%',
    categories: [
      { label: 'Touchless Faucet', href: cat('public/touchless-faucet') },
      { label: 'Sensor Flush Valve', href: cat('public/sensor-flush-valve-2') },
      { label: 'Urinal', href: cat('public/urinal-2') },
      { label: 'Concealed Tank System', href: cat('public/concealed-tank-system') },
      { label: 'Soap Dispenser', href: cat('public/soapdispenser') },
      { label: 'Hand Dryer', href: cat('public/hand-dryer') },
    ],
  },
];

export const links = {
  whereToBuy: `${IN}/where-to-buy/`,
  search: `${IN}/?s=`,
  showroom: `${IN}/delhi-showroom/`,
  catalogue: `${IN}/catalogue/`,
  cleanovation: `${IN}/cleanovation/`,
  technology: `${IN}/technology/`,
  neorest: `${IN}/neorest/pure_luxury/`,
};

/* Header nav, in the order of toto.com/en's: Home … Professional enquiries. The Products mega menu sits between
   `before` and `after`. Professional enquiries goes to TOTO India's contact page (Global's goes to a Japanese form). */
export const primaryNav = {
  before: [
    { label: 'Home', href: '#top', current: true },
    { label: 'Company information', href: `${IN}/corporate/` },
    { label: 'Brand purpose', href: `${IN}/purpose/` },
  ],
  after: [
    { label: 'Design', href: `${IN}/design/` },
    { label: 'Reference', href: 'https://www.toto.com/en/project/' },
    { label: 'Professional enquiries', href: `${IN}/contact-us/` },
  ],
};

export const mobileNav = {
  big: [
    { label: 'Products', href: '#products' },
    { label: 'Company information', href: `${IN}/corporate/` },
    { label: 'Brand purpose', href: `${IN}/purpose/` },
    { label: 'Cleanovation', href: `${IN}/cleanovation/` },
    { label: 'Design', href: `${IN}/design/` },
    { label: 'Reference', href: 'https://www.toto.com/en/project/' },
    { label: 'Professional enquiries', href: `${IN}/contact-us/` },
    { label: 'Delhi Showroom', href: `${IN}/delhi-showroom/` },
  ],
  small: [
    { label: 'Toilets', href: `${IN}/product-category/toilets/` },
    { label: 'Washbasins', href: `${IN}/product-category/washbasins/` },
    { label: 'Fittings', href: `${IN}/product-category/fittings/` },
    { label: 'Showers', href: `${IN}/product-category/showers/` },
    { label: 'Bathtubs', href: `${IN}/product-category/bathtubs/` },
    { label: 'Accessories', href: `${IN}/product-category/accessories/` },
    { label: 'Inspiration', href: `${IN}/pages/inspiration/` },
    { label: 'Customer care', href: `${IN}/customer-care/` },
  ],
};

/* Hero. The panel's headline is fixed (it is the page <h1>); each slide adds a short label and its button.
   The artworks are TOTO Global's own key visuals (toto.com/en, 880×560, titles baked in), shown untouched. */
export const heroIntro = {
  eyebrow: 'TOTO India · Japanese since 1917',
  title: ['Pure luxury,', 'quietly engineered.'],
  lede: 'For more than a century, TOTO has shaped the bathroom around one belief: true comfort begins with clean.',
};

export const slides = [
  {
    label: 'Design philosophy', cta: 'TOTO design', href: `${IN}/design/`,
    src: 'kv-art-design.webp',
    alt: 'Close-up of the softly lit lid of a NEOREST, titled TOTO Design Philosophy: Understated Presence',
  },
  {
    label: 'NEOREST', cta: 'Discover NEOREST', href: `${IN}/neorest/pure_luxury/`,
    src: 'kv-art-neorest.webp',
    alt: 'The NEOREST range standing on a reflective terrace beside a lake and mountains, titled NEOREST',
  },
  {
    label: 'TORNADO FLUSH', cta: 'Our technology', href: `${IN}/technology/`,
    src: 'kv-art-tornado.webp',
    alt: 'Water swirling around a toilet bowl, titled TORNADO FLUSH: Remarkable flushing power',
  },
  {
    label: 'TOTO Cleanovation', cta: 'Explore Cleanovation', href: `${IN}/cleanovation/`,
    src: 'kv-art-cleanovation.webp',
    alt: 'A clear glass bowl holding blue water, titled TOTO Cleanovation: Enriching lives with innovative clean technology',
  },
  {
    label: 'Inspiration', cta: 'Get inspired', href: `${IN}/pages/inspiration/`,
    src: 'kv-art-inspiration.webp',
    alt: 'A stone bathroom with a freestanding bath and wall-hung toilet facing snowy mountains, titled Inspiration',
  },
  {
    label: 'Brand purpose', cta: 'Our purpose', href: `${IN}/purpose/`,
    src: 'kv-art-purpose.webp',
    alt: 'A laughing family outdoors, titled Brand Purpose: Create an enriched and more comfortable lifestyle and culture',
  },
];

export const featured = [
  {
    title: 'TOTO Stories', kicker: 'Brand purpose', pos: '62% 50%', text: 'Initiatives that put our brand purpose into practice, around the world.',
    more: 'Read the stories', href: 'https://www.toto.com/en/purpose/',
    src: 'feat-stories.webp', width: 810, height: 1080,
    alt: 'Cupped hands catching clear water from a river, with a line drawing of the globe above them',
  },
  {
    title: 'Inspiration', kicker: 'Bathrooms', pos: '50% 55%', text: 'Bathrooms designed in many styles, for ideas to take home.',
    more: 'Get inspired', href: `${IN}/pages/inspiration/`,
    src: 'col-neorest.webp', width: 886, height: 1182,
    alt: 'Wall-hung NEOREST toilet and freestanding bath in a warm, timber-floored bathroom with a fireplace',
  },
  {
    title: 'Global reference', kicker: 'Hotels & buildings', pos: '50% 35%', text: "TOTO is found in the world's renowned buildings, from Paris to Kyoto.",
    more: 'View projects', href: 'https://www.toto.com/en/project/',
    src: 'hotel-plaza.webp', width: 760, height: 1014,
    alt: 'The flower-lined balconies and red awnings of Hôtel Plaza Athénée in Paris',
  },
  {
    title: 'Design', kicker: 'Award-winning', pos: '50% 30%', text: "Award-winning products, created in pursuit of TOTO's design philosophy.",
    more: 'TOTO design', href: `${IN}/design/`,
    src: 'feat-design.webp', width: 812, height: 1082,
    alt: 'A matte black TOTO basin faucet against a dark, softly rippled background',
  },
];

export const about = {
  title: 'The most private room in the home deserves the most thought.',
  body: 'For more than a century TOTO has studied one space with unusual devotion. The result is a bathroom that helps keep itself clean, warms to your arrival and uses less water, without asking anything of you. Engineered in Japan, made in India.',
  rows: [
    { title: 'Brand purpose', text: 'Create an enriched and more comfortable lifestyle and culture.', href: `${IN}/purpose/`, src: 'about-purpose.webp', width: 333, height: 222 },
    { title: 'About TOTO Group', text: 'Who we are, and how we work around the world.', href: `${IN}/corporate/`, src: 'about-group.webp', width: 480, height: 360 },
    { title: 'Our journey', text: 'From Tōyō Tōki in 1917 to WASHLET and NEOREST.', href: `${IN}/journey/`, src: 'about-journey.webp', width: 333, height: 222 },
    { title: 'News & events', text: 'Launches, press and events from TOTO India.', href: `${IN}/news-events/`, src: 'about-news.webp', width: 333, height: 222 },
  ],
  /* TOTO-wide (global) milestones, in time order. Sources: CLAUDE.md "Content and facts"
     (NEOREST 4M+ as of Mar 2025; WASHLET 70M+ reached Nov 2025, TOTO press release) */
  milestones: [
    { tag: 'Founded', figure: '1917', cap: 'Founded as Tōyō Tōki in Kitakyushu, Japan' },
    { tag: 'WASHLET', figure: '1980', cap: 'The first WASHLET is introduced' },
    { tag: 'Mar 2025', figure: '4M+', cap: 'NEOREST units shipped worldwide' },
    { tag: 'Nov 2025', figure: '70M+', cap: 'WASHLET units shipped worldwide' },
  ],
};

/* TOTO Cleanovation, after Carysil's "Signature" band: four columns over one full-width photograph that changes
   with the column you hover. Band photos are landscape and at least ~1550px wide. */
export const cleanTiles = [
  { title: 'Cleanovation', text: 'Enriching lives with innovative clean technology, from the glaze to the flush.', href: `${IN}/cleanovation/`, src: 'kv-cleanovation.webp', width: 1550, height: 872, pos: '62% 50%', alt: 'A clear glass toilet bowl form holding a ribbon of blue water' },
  { title: 'WASHLET', text: "Let's wash with WASHLET: the original warm-water cleansing seat, refined since 1980.", href: `${IN}/washlet/`, src: 'kv-purpose.webp', width: 1920, height: 1080, pos: '50% 55%', alt: 'A person in white linen walking past a NEOREST toilet with an integrated WASHLET' },
  { title: 'Clean Synergy', text: 'Technology and design working as one, so the bowl keeps itself cleaner with less effort.', href: `${IN}/technology/`, src: 'band-synergy.webp', width: 1920, height: 1080, pos: '50% 50%', alt: 'Illustration of water flushing through a clear toilet bowl and trap' },
  { title: 'Touchless', text: 'Sensor faucets and hands-free operation, for fewer shared surfaces.', href: 'https://www.toto.com/en/cleanovation/touchless.htm', src: 'band-touchless.webp', width: 1551, height: 873, pos: '60% 50%', alt: 'A hand held under the stream of a touchless TOTO faucet' },
];

export const technologies = [
  { name: 'CEFIONTECT', text: 'An ultra-smooth, fired glaze that leaves waste almost nothing to cling to.' },
  { name: 'TORNADO FLUSH', text: 'Twin nozzles create a powerful swirling rinse that cleans the whole bowl, quietly and with less water.' },
  { name: 'EWATER+', text: 'Electrolyzed water cleans the wand and bowl after use, with no chemicals or detergents.' },
  { name: 'ACTILIGHT', text: 'A special glaze and a built-in clean light in the lid work together, so waste washes away more easily.' },
];


/* Product range, exactly toto.com/en's PRODUCT list and order (requested: Global, not India). Links are Global's own.
   Every photo is shown whole (requested): tiles take each photo's own proportions. `span` marks NEOREST, which gets
   a row to itself; `productRows` groups the rest into justified rows (equal heights, full width, no cropping). */
const GL = 'https://www.toto.com/en';
export const productRows = [[0], [1, 2, 3, 4], [5, 6, 7, 8]];
export const productRange = [
  { name: 'NEOREST', href: `${GL}/neorest/`, src: 'neorest-lineup.webp', width: 1920, height: 720, pos: '42% 60%', span: true, alt: 'The NEOREST range standing on a reflective terrace beside a lake' },
  { name: 'WASHLET+', href: `${GL}/washletplus/`, src: 'prod-washlet.webp', width: 1000, height: 667, pos: '50% 45%', alt: 'Two white toilets with WASHLET seats against pale blue walls' },
  { name: 'WASHLET', href: `${GL}/washlet/`, src: 'col-washlet.webp', width: 711, height: 948, pos: '50% 60%', alt: 'Wall-hung toilet with WASHLET seat beside a window onto a forest' },
  { name: 'Flotation Tub', href: `${GL}/neorest/pure_luxury/collections/flotationtub/`, src: 'col-tub.webp', width: 900, height: 1201, pos: '50% 58%', alt: 'A woman resting in a Flotation Tub at night, surrounded by candlelight' },
  { name: 'Faucet', href: `${GL}/gb_faucet/`, src: 'kv-design.webp', width: 1422, height: 800, pos: '55% 50%', alt: 'Slender TOTO faucets in different metal finishes standing in still, dark blue water' },
  { name: 'Touchless Faucet', href: `${GL}/gb_faucet/?anc=touchless-faucet`, src: 'clean-touchless.webp', width: 960, height: 1280, pos: '50% 45%', alt: 'A hand under the stream of a touchless TOTO faucet' },
  { name: 'Shower', href: `${GL}/gb_shower/`, src: 'prod-shower.webp', width: 1000, height: 667, pos: '40% 50%', alt: 'A woman with eyes closed under a warm, softly lit shower' },
  { name: 'Lavatory', href: `${GL}/gb_lavatory/`, src: 'prod-basin.webp', width: 1000, height: 666, pos: '45% 60%', alt: 'A grey rectangular basin and black faucet on a stone counter' },
  { name: 'Public Restrooms', href: `${GL}/public/`, src: 'prod-public.webp', width: 1000, height: 667, pos: '50% 50%', alt: 'A bright public restroom with a long white counter, mirrors and touchless faucets' },
];


/* Facility information: toto.com/en's three facilities, in its order. Photos are its own 420px thumbnails. */
export const facilities = [
  { title: 'TOTO Museum', badge: 'Virtual tour', text: 'In Kitakyushu, where TOTO began. Explore it from anywhere as a virtual tour.', href: 'https://jp.toto.com/pages/knowledge/visit/museum/en/vr/', src: 'visit-museum.webp', width: 420, height: 275, alt: 'The white, curved facade of the TOTO Museum' },
  { title: 'TOTO GALLERY·MA', text: "TOTO's gallery for architecture and design, in Tokyo.", credit: 'Photo © Nacasa & Partners Inc.', href: 'https://jp.toto.com/gallerma/index_e.htm', src: 'visit-gallery.webp', width: 420, height: 252, alt: 'An architecture exhibition at TOTO GALLERY·MA, with models on long tables and drawings on the walls' },
  { title: 'experience TOTO', text: 'A TOTO public restroom in the arrivals lobby of Narita Airport, Terminal 1.', href: 'https://www.toto.com/en/experiencetoto/', src: 'visit-experience.webp', width: 420, height: 275, alt: 'The entrance wall of the experience TOTO restroom in an airport arrivals hall' },
];



export const regions = [
  { label: 'Global', href: 'https://www.toto.com/en/index.htm' },
  { label: 'Americas', href: 'https://www.totousa.com/' },
  { label: 'Europe', href: 'https://eu.toto.com/en/' },
  { label: 'Japan', href: 'https://jp.toto.com/' },
  { label: 'China', href: 'https://www.toto.com.cn/' },
  { label: 'Hong Kong', href: 'http://hk.toto.com/' },
  { label: 'Taiwan', href: 'https://www.twtoto.com.tw/' },
  { label: 'Korea', href: 'https://kr.toto.com/' },
  { label: 'Asia', href: 'https://asia.toto.com/' },
  { label: 'Thailand', href: 'https://th.toto.com/' },
  { label: 'Vietnam', href: 'https://vn.toto.com/' },
  { label: 'Oceania', href: 'https://oceania.toto.com/' },
];

