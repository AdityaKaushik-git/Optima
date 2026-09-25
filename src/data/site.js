/**
 * All website content lives here.
 * Local photos live in /public/images and are referenced through `local()` so they
 * work with the GitHub Pages base path (/Optima/).
 */
import {
  Layers, ShowerHead, Sun, Syringe, Container,
  ShieldCheck, HardHat, BadgeCheck, ClipboardCheck, FileCheck2, Clock,
} from 'lucide-react';

const BASE = import.meta.env.BASE_URL;
export const local = (name) => `${BASE}images/${name}`;
const remote = (name) => `https://www.optimastaruae.com/images/${encodeURIComponent(name)}`;

export const company = {
  name: 'Optima Star Technical Services',
  legal: 'OPTIMA STAR TECHNICAL SERVICES L.L.C.',
  tagline: 'Waterproofing specialists in Dubai',
  logo: local('logo-new.png'),
  logoDark: local('logo-dark-new.png'),
  phones: [
    { label: 'Office', display: '+971 4 392 3663', tel: '+97143923663' },
    { label: 'Mobile', display: '+971 56 818 0793', tel: '+971568180793' },
    { label: 'Mobile', display: '+971 55 182 8836', tel: '+971551828836' },
  ],
  whatsapp: '971568180793',
  email: 'info@optimastaruae.com',
  address:
    'Office No. 29, 9th Floor, Creek Tower Car Parking Building, Riggat Al Buteen, Deira, Dubai, U.A.E',
  mapEmbed:
    'https://www.google.com/maps?q=Creek+Tower+Car+Parking+Building+Riggat+Al+Buteen+Deira+Dubai&output=embed',
  hours: 'Saturday to Thursday, 8:00 AM – 6:00 PM',
  licence: '1480963',
  chamber: '604011',
};

export const heroSlides = [
  local('sbs-torch-applied.jpg'),
  local('pile-head-treatment.jpg'),
  local('roof-coating-crew.jpg'),
  local('membrane-roll.jpg'),
  local('combo-roof-foam.jpg'),
];

export const teamImage = local('pile-cap-membrane.jpg');

/* ---------- Waterproofing services (the only services we offer) ---------- */
export const services = [
  {
    slug: 'substructure',
    title: 'Substructure waterproofing',
    icon: Layers,
    short: 'Basements, rafts, pile caps and strap beams sealed against groundwater.',
    text: 'Torch-applied SBS membrane tanking for everything below ground, including pile head treatment, detailed to the consultant’s shop drawings.',
    image: local('pile-cap-membrane.jpg'),
    gallery: [local('pile-head-treatment.jpg'), local('sbs-membrane-laying.jpg'), local('block-work.jpg')],
    intro:
      'Below ground, a building sits in groundwater for its whole life. We tank the substructure with two layers of 4 mm SBS modified bitumen membrane, starting at the pile heads and wrapping every pile cap, strap beam, raft and retaining wall in one continuous barrier.',
    usedFor: ['Pile caps and pile heads', 'Raft and isolated foundations', 'Strap and tie beams', 'Basement walls and retaining walls', 'Lift pits and sump pits'],
    steps: [
      'Pile head treatment: 15–20 mm epoxy grout on the top and sides of each pile head',
      'Block work built around the pile cap as a permanent shutter',
      'One coat of bitumen primer on blinding and block work',
      'Two layers of 4 mm SBS membrane, torch-applied with lapped joints',
      '6 mm protection board on walls, protection screed over polythene on the base',
      'Concrete poured for the pile cap, beam or raft',
    ],
    materials: ['Petrozo Rheoseal 4S, Rheoprime D41, Rheoboard', 'Soprema torch-applied systems', 'Polybit Bituplus E4180, Bituboard', 'Geobit Betoflex 4S, Betogrout EP 102', 'Rheocrete MC and Rheogrout EP 102 pile head grouts'],
    warranty: true,
  },
  {
    slug: 'wet-area',
    title: 'Wet area waterproofing',
    icon: ShowerHead,
    short: 'Bathrooms, kitchens and balconies sealed before screed and tiles.',
    text: 'Flexible cementitious coatings with reinforced corners and pipe collars, flood tested before the tiler starts.',
    image: remote('wet-area.jpg'),
    gallery: [],
    intro:
      'Most leaks inside a building start in a bathroom corner or around a floor drain. We apply a flexible two-component cementitious membrane, reinforce every junction with fabric, and flood test the area before it is handed to the tiling team.',
    usedFor: ['Bathrooms and shower areas', 'Kitchens and pantries', 'Balconies and terraces', 'Laundry and plant rooms'],
    steps: [
      'MEP clearance and surface preparation',
      'Reinforcing fabric at wall-to-floor corners, drains and pipe penetrations',
      'First coat of flexible cementitious membrane',
      'Second coat applied at right angles to the first, with upturns on the walls',
      'Flood test and consultant inspection before screed and tiling',
    ],
    materials: ['Fosroc Nitocote CM210', 'Mapei Mapelastic Smart with Mapetex Sel N', 'Corrotech waterproofing range'],
  },
  {
    slug: 'combo-roof',
    title: 'Combo roof waterproofing',
    icon: Sun,
    short: 'Waterproofing, insulation and falls to drains in one roof system.',
    text: 'A layered roof that keeps water out, cuts heat gain and drains properly, built as one warranted system.',
    image: local('combo-roof-buildup.jpg'),
    gallery: [local('combo-roof-foam.jpg'), local('roof-coating-crew.jpg')],
    intro:
      'In the UAE a roof has two jobs: stop the rain that does come, and stop the heat that always comes. A combo roof layers the waterproofing membrane, thermal insulation and a sloped screed together so the roof drains to its outlets and the floor below stays cooler.',
    usedFor: ['Flat concrete roofs', 'Villa and building terraces', 'Podium and parking decks', 'Roof re-waterproofing and upgrades'],
    steps: [
      'Surface preparation and priming',
      'Waterproofing membrane with upturns at parapets and outlets',
      'Thermal insulation boards or sprayed PU foam',
      'Geotextile separation layer',
      'Foam concrete and screed laid to falls towards the drains',
      'Flood test and final finish',
    ],
    materials: ['Royal Industries Neo Combo roofing system', 'Innochem combo roof systems', 'Geobit Betoflex and Betofoam range'],
    warranty: true,
  },
  {
    slug: 'injection',
    title: 'Injection treatment',
    icon: Syringe,
    short: 'Active leaks and cracks sealed from inside the concrete.',
    text: 'Polyurethane and epoxy injection that stops water at the crack or joint, even while it is still leaking.',
    image: remote('injection-waterproofing.jpg'),
    gallery: [],
    intro:
      'When water is already coming through a basement wall, a construction joint or a crack, we seal it from inside the concrete. Resin is pumped under pressure through packers until it fills the crack and cuts off the water path.',
    usedFor: ['Leaking cracks in basements and tanks', 'Construction and cold joints', 'Pipe and sleeve penetrations', 'Honeycombed concrete'],
    steps: [
      'Locate and mark the leak path',
      'Drill angled holes alongside the crack and fix injection packers',
      'Inject polyurethane resin for water-stopping, or epoxy for structural bonding',
      'Remove packers, seal the holes and finish the surface',
    ],
    materials: ['Polyurethane injection resins', 'Epoxy injection resins', 'Injection hose systems for construction joints'],
  },
  {
    slug: 'grp-lining',
    title: 'GRP lining',
    icon: Container,
    short: 'Seamless glass-reinforced lining for water tanks and pools.',
    text: 'Glass fibre and resin laminated into a seamless, hygienic lining for tanks, pools and water features.',
    image: local('grp-lining.jpg'),
    gallery: [],
    intro:
      'Concrete water tanks need a lining that is watertight, easy to clean and safe for the water it holds. GRP (glass reinforced plastic) is laminated in place as one seamless skin with no joints for water or bacteria to get into.',
    usedFor: ['Potable and firefighting water tanks', 'Swimming pools and balancing tanks', 'Fountains and water features', 'Chemical and effluent containment'],
    steps: [
      'Grind and clean the concrete, repair defects',
      'Prime the surface with resin',
      'Laminate chopped strand glass mat with resin, layer by layer',
      'Seal corners and penetrations',
      'Apply the final gel coat or topcoat suited to the water it will hold',
    ],
    materials: ['Isophthalic polyester and vinyl ester resins', 'Chopped strand glass mat', 'Potable-water-grade topcoats where required'],
  },
];

export const warranty = {
  min: 10,
  max: 20,
  title: 'Up to 20 years’ warranty on SBS membrane systems',
  text: 'Every SBS membrane system we install carries a written warranty starting at 10 years and extending up to 20 years, depending on the structure, the system specified and its exposure.',
};

export const reasons = [
  { title: 'Manufacturer-approved applicator', icon: BadgeCheck, text: 'Certified by Soprema, Mapei, Petrozo, Geobit, Royal Industries, Corrotech and Innochem to install their systems.' },
  { title: 'Consultant approved', icon: FileCheck2, text: 'Pre-qualified on projects reviewed by EDMAC, NEB, AREC, BDA and FACE Architecture.' },
  { title: 'Written warranty', icon: ShieldCheck, text: 'SBS membrane systems covered from 10 up to 20 years, depending on the structure.' },
  { title: 'Supervised by engineers', icon: HardHat, text: 'A non-working superintendent for every 5–10 applicators, so every lap and upturn gets checked.' },
  { title: 'Inspected at every stage', icon: ClipboardCheck, text: 'MIR for each delivery, WIR before each layer is covered, and flood tests before handover.' },
  { title: 'On programme', icon: Clock, text: 'We plan around the main contractor’s schedule so waterproofing never holds up the concrete pour.' },
];

/* ---------- Case studies (Projects page) ---------- */
export const projects = [
  {
    id: 'wadi-al-safa',
    title: 'Substructure waterproofing for a residential building',
    location: 'Wadi Al Safa 5, Dubai',
    categories: ['Substructure'],
    scope: 'Substructure waterproofing works (Basements 1, 2 and 3)',
    system: 'RHEOSEAL FBW fully bonded waterproofing membrane',
    contractor: 'M/S Strongwalls Construction LLC',
    challenge:
      'Waterproofing a three-level basement for a residential building in Wadi Al Safa, where high groundwater threatened the integrity of the concrete foundations.',
    solution:
      'Meticulous surface preparation, then a high-performance RHEOSEAL FBW fully bonded membrane, pile head sealing and multi-injection hoses to protect the structure against water pressure.',
    images: [local('pile-cap-membrane.jpg'), local('sbs-membrane-laying.jpg'), local('pile-head-treatment.jpg')],
  },
  {
    id: 'jabal-ali',
    title: 'Substructure waterproofing for a residential development',
    location: 'Jebel Ali First, Dubai',
    categories: ['Substructure', 'Pile head treatment'],
    scope: 'Substructure waterproofing and pile head treatment',
    system: 'Double-layer 4 mm SBS membrane and cementitious grout barrier',
    contractor: 'M/S Strongwalls Construction LLC',
    challenge:
      'A deep foundation in Jebel Ali First, where high groundwater and corrosive soil chemicals threatened the concrete and its steel reinforcement.',
    solution:
      'Dewatering and surface preparation, then a double-layer 4 mm SBS modified bituminous tanking system, pile head sealing and heavy-duty protection boards against water pressure and chemical attack.',
    images: [local('sbs-torch-applied.jpg'), local('block-work.jpg'), local('membrane-roll.jpg')],
  },
  {
    id: 'dubai-island',
    title: 'Substructure waterproofing and pile head treatment',
    location: 'Nakhlat Deira 101, Dubai Islands',
    categories: ['Substructure', 'Pile head treatment'],
    scope: 'Substructure waterproofing works and pile head treatment',
    system: 'Two layers Rheoseal 4S 4 mm SBS membrane, Rheocrete MC pile head grout',
    contractor: 'M/S Jaseera Building Contracting LLC',
    challenge:
      'Comprehensive substructure waterproofing and precise pile head treatment for a G+2P+8 residential building on Dubai Islands, with no margin for water ingress.',
    solution:
      'Epoxy grout on the top and sides of every pile head, block work shutters, primer, two layers of 4 mm SBS membrane and 6 mm protection board, all to the consultant-approved shop drawing.',
    images: [local('pile-head-treatment.jpg'), local('pile-cap-membrane.jpg'), local('block-work.jpg')],
  },
];

export const projectFilters = ['All', 'Substructure', 'Pile head treatment'];

/* ---------- Recent projects (table page) ---------- */
export const recentProjects = [
  { project: 'B+G+3P+13 residential building', plot: 'Plot 648-8737, Wadi Al Safa 5', contractor: 'JKS Hills Construction Co. LLC', consultant: 'EDMAC Engineering Consultant', client: 'AG Properties', scope: 'Substructure', status: 'Completed' },
  { project: 'B+G+3P+13 residential building', plot: 'Plot 648-8598, Wadi Al Safa 5', contractor: 'JKS Hills Construction Co. LLC', consultant: 'EDMAC Engineering Consultant', client: 'AG Properties', scope: 'Wet area', status: 'Running' },
  { project: 'B+G+1 private villa', plot: 'Dubai', contractor: 'Chairwell Interior Decoration LLC', consultant: 'Urban Habitat Architectural Consultant', client: 'Private client', scope: 'Wet area', status: 'Completed' },
  { project: 'Sobha Heartland II, Central Cooling Plant CCP-2', plot: 'Sobha Heartland II', contractor: 'Sobha', consultant: 'ACE International Consultant Engineers', client: 'Sobha Energy Solution', scope: 'Substructure', status: 'Completed' },
  { project: 'B+G+9P+58+Roof commercial, retail and residential development', plot: 'Dubai', contractor: 'Sobha', consultant: 'PNC Investment', client: 'PNC Investment', scope: 'Substructure', status: 'Completed' },
  { project: 'G+P+10+R residential building', plot: 'Plot AFRA039A, Al Furjan', contractor: 'Adnan Contracting LLC', consultant: 'EDMAC Engineering Consultant', client: 'Anax Estate LLC', scope: 'Wet area', status: 'Running' },
  { project: 'G+2P+12F+Roof residential building', plot: 'Jebel Ali Village', contractor: 'Team Engineering Enterprises Ltd', consultant: 'Buro Kling', client: 'JAG Development LLC', scope: 'Substructure', status: 'Completed' },
  { project: 'Hills View, G+1P+14F+Roof residential', plot: 'Plot 5919566, Jebel Ali First', contractor: 'Strongwalls Constructions LLC', consultant: 'National Engineering Bureau', client: 'Suncrest Hills Property LLC', scope: 'Superstructure', status: 'Running' },
  { project: 'G+P+5F+R residential building', plot: 'Plot JVC13RMRA002, JVC', contractor: 'Strongwalls Constructions LLC', consultant: 'FACE Architecture + Design', client: 'M N Vision Real Estate Development LLC', scope: 'Wet area', status: 'Running' },
  { project: '2B+G+15F+Roof residential and commercial', plot: 'Plot 682-1376-02, Dubai Sports City', contractor: 'Strongwalls Constructions LLC', consultant: 'National Engineering Bureau', client: 'Urban Ventures Real Estate', scope: 'Wet area', status: 'Running' },
  { project: 'Fairway Residence, G+1P+14F+R', plot: 'Plot 6820154, Dubai Sports City', contractor: 'Strongwalls Constructions LLC', consultant: 'National Engineering Bureau', client: 'Prescott Real Estate Development LLC', scope: 'Wet area', status: 'Running' },
  { project: 'Mashreq Elite Residence, 3B+G+13F+Roof', plot: 'Plot 6489019, Wadi Al Safa 5', contractor: 'Strongwalls Constructions LLC', consultant: 'AREC Engineering Consultant', client: 'Mashriq Elite Developments', scope: 'Substructure', status: 'Running' },
  { project: 'B+G+3P+13+R residential building', plot: 'Dubai Land Residence Complex', contractor: 'JKS Hills Construction Co. LLC', consultant: 'EDMAC Engineering Consultant', client: 'Private client', scope: 'Wet area', status: 'Running' },
  { project: 'G+2P+8 residential building', plot: 'Plot DIA-RE-0220, Nakhlat Deira 101, Dubai Islands', contractor: 'Jaseera Building Contracting LLC', consultant: 'EDMAC Engineering Consultant', client: 'Private client', scope: 'Substructure', status: 'Running' },
  { project: 'B+G+4F+R residential building', plot: 'Plot JVC11PMRP004, JVC', contractor: 'ZB Construction LLC', consultant: 'EDMAC Engineering Consultant', client: 'Al Nashif Jiwa & Ramayana Trading LLC', scope: 'Substructure', status: 'Running' },
  { project: 'B+G+2+R commercial building', plot: 'Plot 6731206, Arjan', contractor: 'AUM Contracting LLC', consultant: 'EDMAC Engineering Consultant', client: 'AUM Development', scope: 'Substructure', status: 'Running' },
  { project: 'Green Horizon, G+2P+8+R residential', plot: 'Plot DIA-RE-0141, Nakhlat Deira', contractor: 'Strongwalls Constructions LLC', consultant: 'EDMAC Engineering Consultant', client: 'Green Horizon Real Estate Development', scope: 'Substructure', status: 'Running' },
];

/* ---------- Credentials ---------- */
export const approvals = [
  { name: 'Soprema', scope: 'Conventional torch-applied waterproofing systems' },
  { name: 'Mapei', scope: 'Mapelastic Smart, Mapetex Sel N' },
  { name: 'Petrozo Energy', scope: 'Rheoseal membranes, primers and boards' },
  { name: 'Geobit', scope: 'Betoflex, Betocoat and Betogrout range' },
  { name: 'Royal Industries', scope: 'Neo combo roofing and membrane waterproofing' },
  { name: 'Corrotech', scope: 'All waterproofing materials' },
  { name: 'Innochem', scope: 'Combo roof systems and wet area applications' },
];

export const consultants = ['EDMAC Engineering Consultant', 'National Engineering Bureau', 'AREC Engineering Consultant', 'BDA Engineering Consultants', 'FACE Architecture + Design', 'Buro Kling'];

export const registrations = [
  { label: 'Dubai DET commercial licence', value: 'No. 1480963' },
  { label: 'Dubai Chamber of Commerce', value: 'Member 604011' },
  { label: 'Federal Tax Authority', value: 'VAT registered' },
];

/* ---------- Team (About page) ----------
 * ✏️ EDIT BEFORE PUBLISHING: add real experience and a real headshot for each partner.
 * Put photos in /public/images/team/ and set `photo: local('team/rameez.jpg')`.
 * Until `photo` is set, a monogram portrait is shown instead.
 */
export const team = [
  {
    name: 'Rameez Ahmad',
    fullName: 'Rameez Ahmad Sajid Ahmad',
    role: 'Managing Partner',
    experience: 'XX+ years in waterproofing and construction', // ✏️ EDIT
    bio: 'Leads operations, client relationships and site delivery, and signs off every system before it is handed over.', // ✏️ EDIT
    photo: '',
  },
  {
    name: 'Waziha Ahmad',
    fullName: 'Waziha Ahmad Tausif Ahmad',
    role: 'Partner',
    experience: 'XX+ years in business and project administration', // ✏️ EDIT
    bio: 'Oversees commercial, procurement and documentation, from pre-qualification submittals to warranty certificates.', // ✏️ EDIT
    photo: '',
  },
];

export const process = [
  { title: 'Site inspection', text: 'We review drawings, visit site and confirm the right system for the structure.' },
  { title: 'Submittals', text: 'Pre-qualification, material submittals, method statement and shop drawings to the consultant.' },
  { title: 'Surface preparation', text: 'Cleaning, repairs and priming. Most failures start here, so we take our time.' },
  { title: 'Application', text: 'Installed by our own trained applicators, with WIR inspection at each layer.' },
  { title: 'Testing and warranty', text: 'Flood tests where applicable, then handover with a written warranty.' },
];

export const about = {
  mission: [
    'To protect every structure we work on with waterproofing systems that are specified correctly, installed carefully and inspected at every layer.',
    'We are committed to safe sites, honest advice and workmanship that meets the manufacturer’s specification and the consultant’s approval.',
  ],
  vision: [
    'To be the waterproofing contractor that consultants and main contractors across the U.A.E. approve first, because our work passes inspection the first time.',
    'We grow through long-term relationships, trained applicators and continuous investment in better systems.',
  ],
  chairman: [
    'At Optima Star Technical Services L.L.C., professionalism is the foundation of everything we do. Waterproofing is hidden once the concrete is poured, so the only proof of quality is how carefully it was done.',
    'That is why we work only with approved materials, submit every method statement and shop drawing for review, and supervise every layer on site before it is covered.',
    'Our aim is simple: a dry building for the life of the structure, and a client who calls us again for the next one.',
  ],
};
