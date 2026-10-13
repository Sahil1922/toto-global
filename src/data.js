/* All page copy and links live here, so content edits never touch the components.
   Copy must stay factual: see CLAUDE.md "Content and facts" before changing anything. */

/* Images live in public/assets/img and keep their filenames, so TOTO's originals can be swapped in */
export const img = (name) => `${import.meta.env.BASE_URL}assets/img/${name}`;

const IN = 'https://in.toto.com';

export const categories = [
  { label: 'WASHLET', href: `${IN}/product-category/washlet/` },
  { label: 'ECOWASHER', href: `${IN}/product-category/ecowasher/` },
  { label: 'Toilets', href: `${IN}/product-category/toilets/` },
  { label: 'Fittings', href: `${IN}/product-category/fittings/` },
  { label: 'Showers', href: `${IN}/product-category/showers/` },
  { label: 'Washbasins', href: `${IN}/product-category/washbasins/` },
  { label: 'Bathtubs', href: `${IN}/product-category/bathtubs/` },
  { label: 'Accessories', href: `${IN}/product-category/accessories/` },
  { label: 'Public', href: `${IN}/product-category/public/` },
];

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

export const primaryNav = [
  { label: 'Brand purpose', href: `${IN}/purpose/` },
  { label: 'Cleanovation', href: `${IN}/cleanovation/` },
  { label: 'Design', href: `${IN}/design/` },
  { label: 'Showroom', href: `${IN}/delhi-showroom/` },
];

export const mobileNav = {
  big: [
    { label: 'Products', href: '#products' },
    { label: 'NEOREST', href: `${IN}/neorest/pure_luxury/` },
    { label: 'WASHLET', href: `${IN}/washlet/` },
    { label: 'Cleanovation', href: `${IN}/cleanovation/` },
    { label: 'Brand purpose', href: `${IN}/purpose/` },
    { label: 'Design', href: `${IN}/design/` },
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

/* Key visuals. The first slide's title is the page <h1>. `light` slides use ink text. */
export const slides = [
  {
    tab: 'NEOREST', tabLabel: 'NEOREST',
    eyebrow: 'NEOREST · Pure luxury',
    title: ['Pure luxury,', 'quietly engineered.'],
    lede: "TOTO's flagship, with toilet, bath and basin designed as one quiet expression of comfort.",
    cta: 'Discover NEOREST', href: `${IN}/neorest/pure_luxury/`,
    src: 'hero.webp', width: 1920, height: 922, pos: '58% 60%', posSm: '62% 60%',
    alt: 'A NEOREST toilet and freestanding bath on a timber deck, surrounded by a glass pavilion and a lily pond',
  },
  {
    tab: 'Cleanovation', tabLabel: 'TOTO Cleanovation', long: true,
    eyebrow: 'TOTO Cleanovation',
    title: ['Enriching lives with innovative clean technology.'],
    cta: 'Explore Cleanovation', href: `${IN}/cleanovation/`,
    src: 'kv-cleanovation.webp', width: 1550, height: 872, pos: '50% 50%', posSm: '72% 40%',
    alt: 'A clear glass toilet bowl form holding a ribbon of blue water, against a pale grey background',
  },
  {
    tab: 'Brand purpose', tabLabel: 'Brand purpose', long: true,
    eyebrow: 'Brand purpose',
    title: ['Create an enriched and more comfortable lifestyle and culture.'],
    cta: 'Our purpose', href: `${IN}/purpose/`,
    src: 'kv-purpose.webp', width: 1920, height: 1080, pos: '50% 60%', posSm: '22% 50%',
    alt: 'A person in white linen walking past a NEOREST toilet in a bright, white bathroom',
  },
  {
    tab: 'Design', tabLabel: 'Design philosophy',
    eyebrow: 'Design philosophy',
    title: ['Understated presence.'],
    lede: 'Forms that step back, so the experience can come forward.',
    cta: 'TOTO design', href: `${IN}/design/`,
    src: 'kv-design.webp', width: 1422, height: 800, pos: '50% 50%', posSm: '44% 50%',
    alt: 'Five slender TOTO faucets in different metal finishes standing in still, dark blue water',
  },
];

export const featured = [
  {
    title: 'TOTO Stories', text: 'Initiatives that put our brand purpose into practice, around the world.',
    more: 'Read the stories', href: 'https://www.toto.com/en/purpose/',
    src: 'feat-stories.webp', width: 810, height: 1080,
    alt: 'Cupped hands catching clear water from a river, with a line drawing of the globe above them',
  },
  {
    title: 'Inspiration', text: 'Bathrooms designed in many styles, for ideas to take home.',
    more: 'Get inspired', href: `${IN}/pages/inspiration/`,
    src: 'col-neorest.webp', width: 886, height: 1182,
    alt: 'Wall-hung NEOREST toilet and freestanding bath in a warm, timber-floored bathroom with a fireplace',
  },
  {
    title: 'Global reference', text: "TOTO is found in the world's renowned buildings, from Paris to Kyoto.",
    more: 'View projects', href: 'https://www.toto.com/en/project/',
    src: 'hotel-plaza.webp', width: 760, height: 1014,
    alt: 'The flower-lined balconies and red awnings of Hôtel Plaza Athénée in Paris',
  },
  {
    title: 'Design', text: "Award-winning products, created in pursuit of TOTO's design philosophy.",
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
  stats: [
    { term: 'Founded', num: '1917', cap: 'Founded in Kitakyushu, Japan' },
    { term: 'WASHLET introduced', num: '1980', cap: 'The first WASHLET is introduced' },
    { term: 'WASHLET units shipped', num: '70M+', cap: 'WASHLET units shipped worldwide' },
    { term: 'Made in India since', num: '2014', cap: 'Made in India at our Halol, Gujarat plant' },
  ],
};

export const cleanTiles = [
  { title: 'TOTO Cleanovation', text: 'Clean innovation, from the glaze to the flush.', href: `${IN}/cleanovation/`, src: 'clean-cleanovation.webp', width: 960, height: 1280, alt: 'A drop of water falling into a toilet bowl lit with a soft blue glow' },
  { title: "Let's wash with WASHLET", text: 'The original warm-water cleansing seat, since 1980.', href: `${IN}/washlet/`, src: 'col-washlet.webp', width: 711, height: 948, alt: 'Wall-hung toilet with WASHLET seat beside a floor-to-ceiling window onto a forest' },
  { title: 'CLEAN SYNERGY', text: 'Technology and design, working as one.', href: `${IN}/technology/`, src: 'clean-synergy.webp', width: 408, height: 544, alt: 'Illustration of water swirling around the inside of a toilet bowl' },
  { title: 'The security of touchless', text: 'Sensor faucets and hands-free operation, for fewer shared surfaces.', href: 'https://www.toto.com/en/cleanovation/touchless.htm', src: 'clean-touchless.webp', width: 960, height: 1280, alt: 'A hand under the stream of a touchless TOTO faucet' },
];

export const technologies = [
  { name: 'CEFIONTECT', text: 'An ultra-smooth, fired glaze that leaves waste almost nothing to cling to.' },
  { name: 'TORNADO FLUSH', text: 'Twin nozzles create a powerful swirling rinse that cleans the whole bowl, quietly and with less water.' },
  { name: 'EWATER+', text: 'Electrolyzed water cleans the wand and bowl after use, with no chemicals or detergents.' },
  { name: 'ACTILIGHT', text: 'A special glaze and a built-in clean light in the lid work together, so waste washes away more easily.' },
];

export const neorestFeature = {
  text: "A sanctuary, engineered. NEOREST brings TOTO's most advanced comfort and cleaning technologies together in a form that is almost sculptural. More than four million have been shipped worldwide.",
  models: ['AS', 'LS', 'NX', 'WX'],
  href: `${IN}/neorest/pure_luxury/`,
  src: 'neorest-lineup.webp', width: 1920, height: 720,
  alt: 'The NEOREST range standing on a reflective terrace overlooking a calm lake and mountains',
};

export const products = [
  { title: 'WASHLET', text: 'Warm-water cleansing, refined continuously since 1980.', href: `${IN}/washlet/`, src: 'prod-washlet.webp', width: 1000, height: 667, alt: 'Two white toilets with WASHLET seats against pale blue walls' },
  { title: 'Flotation Tub', text: 'A reclined, near-weightless posture that lets the whole body rest.', href: `${IN}/recline-comfort/`, src: 'col-tub.webp', width: 900, height: 1201, pos: '50% 58%', alt: 'A woman resting in a Flotation Tub at night, surrounded by candlelight' },
  { title: 'Faucets', text: 'Precise, generous water, including touchless models.', href: `${IN}/faucet/`, src: 'prod-faucet.webp', width: 1000, height: 666, alt: 'A brushed gold faucet over a white vessel basin on a marble counter' },
  { title: 'Showers', text: 'From G Selection showers to everyday hand showers.', href: `${IN}/shower/`, src: 'prod-shower.webp', width: 1000, height: 667, alt: 'A woman with eyes closed under a warm, softly lit shower' },
  { title: 'Washbasins', text: 'Basins in calm, considered forms, made to pair with TOTO faucets.', href: `${IN}/product-category/washbasins/`, src: 'prod-basin.webp', width: 1000, height: 666, alt: 'A grey rectangular basin and black faucet on a stone counter, under slim pendant lights' },
  { title: 'Public restrooms', text: 'Hygienic, accessible restrooms for airports, offices and hotels.', href: `${IN}/public-restroom/`, src: 'prod-public.webp', width: 1000, height: 667, alt: 'A bright public restroom with a long white counter, mirrors and touchless faucets' },
];

export const showroom = {
  lede: 'Sit on a heated WASHLET seat, feel the flow of a G Selection shower and see NEOREST up close. Our flagship in New Delhi brings more than 800 products under one roof, with specialists on hand to help you plan.',
  facts: [
    { term: 'Where', value: 'New Delhi' },
    { term: 'For', value: 'Homeowners, architects and designers' },
    { term: 'On display', value: 'NEOREST, WASHLET, bathtubs, faucets and showers' },
  ],
  alt: 'Inside the TOTO Delhi Showroom: a freestanding bath on a lit platform, a shower display and a lounge with bookshelves',
};

export const facilities = [
  { title: 'TOTO Museum', text: 'In Kitakyushu, where TOTO began. Explore it as a virtual tour.', href: 'https://jp.toto.com/pages/knowledge/visit/museum/en/vr/', src: 'visit-museum.webp', width: 420, height: 275, alt: 'The white, curved facade of the TOTO Museum' },
  { title: 'TOTO GALLERY·MA', text: "TOTO's gallery for architecture and design, in Tokyo.", credit: 'Photo © Nacasa & Partners Inc.', href: 'https://jp.toto.com/gallerma/index_e.htm', src: 'visit-gallery.webp', width: 420, height: 252, alt: 'An architecture exhibition at TOTO GALLERY·MA, with models on long tables and drawings on the walls' },
  { title: 'experience TOTO', text: 'A TOTO public restroom at Narita Airport, Terminal 1.', href: 'https://www.toto.com/en/experiencetoto/', src: 'visit-experience.webp', width: 420, height: 275, alt: 'The entrance wall of the experience TOTO restroom in an airport arrivals hall' },
];

export const support = [
  { title: 'Where to buy', text: 'Authorised TOTO dealers across India.', href: `${IN}/where-to-buy/` },
  { title: 'Catalogue', text: 'The complete range, ready to download.', href: `${IN}/catalogue/` },
  { title: 'Customer care', text: 'Service, installation and support.', href: `${IN}/customer-care/` },
  { title: 'Product FAQs', text: 'Clear answers to common questions.', href: `${IN}/product-faqs/` },
];

export const footerColumns = [
  {
    title: 'Products',
    links: [
      { label: 'NEOREST', href: `${IN}/neorest/pure_luxury/` },
      { label: 'NEOREST Collections', href: `${IN}/neorest-collections/` },
      { label: 'WASHLET', href: `${IN}/washlet/` },
      { label: 'Faucets', href: `${IN}/faucet/` },
      { label: 'Showers', href: `${IN}/shower/` },
      { label: 'Flotation Tub', href: `${IN}/recline-comfort/` },
      { label: 'Public restrooms', href: `${IN}/public-restroom/` },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Brand purpose', href: `${IN}/purpose/` },
      { label: 'About TOTO Group', href: `${IN}/corporate/` },
      { label: 'Our journey', href: `${IN}/journey/` },
      { label: 'TOTO Cleanovation', href: `${IN}/cleanovation/` },
      { label: 'Factory information', href: `${IN}/factory/` },
      { label: 'News & events', href: `${IN}/news-events/` },
      { label: 'Blog', href: `${IN}/blog/` },
      { label: 'Careers', href: 'https://totoindia.darwinbox.in/ms/candidate/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Where to buy', href: `${IN}/where-to-buy/` },
      { label: 'Catalogue', href: `${IN}/catalogue/` },
      { label: 'Customer care', href: `${IN}/customer-care/` },
      { label: 'Contact', href: `${IN}/contact-us/` },
      { label: 'Product FAQs', href: `${IN}/product-faqs/` },
      { label: 'Warranty policy', href: `${IN}/warranty-policy/` },
    ],
  },
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

export const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/TOTOIndiaPvtLtd' },
  { name: 'X', href: 'https://twitter.com/TOTOIndiaPvtLtd' },
  { name: 'Instagram', href: 'https://www.instagram.com/totoindiapvtltd/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/toto-india-pvt-ltd/' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCY9Kyv7faw7in6FxpdrWS2w' },
];
