/**
 * All website content lives here.
 * To host images locally: download them into /public/images and set IMAGE_BASE = '/images'
 * (keep the same file names), or replace individual URLs below.
 */
import {
  Droplets, Grid3x3, Paintbrush, Sofa, Layers, Cpu, Wallpaper, PlugZap,
  ShowerHead, PanelsTopLeft, Hammer, Waves, Fan,
  ShieldCheck, HardHat, BadgePercent, Lock, Smile, Clock,
} from 'lucide-react';

export const IMAGE_BASE = 'https://www.optimastaruae.com/images';
const img = (name) => `${IMAGE_BASE}/${encodeURIComponent(name)}`;
const projectImg = (path) =>
  `https://www.optimastaruae.com/Project%20Images/${path.split('/').map(encodeURIComponent).join('/')}`;

export const company = {
  name: 'Optima Star Technical Services',
  legal: 'OPTIMA STAR TECHNICAL SERVICES L.L.C.',
  tagline: 'Built on expertise, driven by excellence',
  logo: img('logo-new.png'),
  logoDark: img('logo-dark-new.png'),
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
};

export const heroSlides = [
  img('carousel2.png'),
  img('carousel3.jpeg'),
  img('carousel4.jpeg'),
  img('carousel22.jpeg'),
  img('carousel23.jpeg'),
  img('carousel24.jpeg'),
  img('carousel17.jpeg'),
  img('carousel18.jpeg'),
  img('carousel19.jpeg'),
];

export const teamImage = img('Untitled design (6).png');

export const waterproofing = [
  {
    slug: 'sbs-membrane',
    title: 'SBS membrane waterproofing',
    short: 'Torch-applied modified bitumen for roofs and terraces.',
    text: 'Professional SBS membrane waterproofing for roofs and terraces, giving durable, long-lasting protection against water ingress.',
    image: img('sbs-membrane.jpg'),
  },
  {
    slug: 'wet-area',
    title: 'Wet area waterproofing',
    short: 'Bathrooms, kitchens and balconies sealed before tiling.',
    text: 'Specialised waterproofing for bathrooms, kitchens and wet areas using premium materials that stop moisture damage and leaks.',
    image: img('wet-area.jpg'),
  },
  {
    slug: 'combo',
    title: 'Combo waterproofing',
    short: 'Layered systems for structures that need more than one line of defence.',
    text: 'Combo systems combine several waterproofing techniques for maximum protection of your building structure.',
    image: img('combo-waterproofing.jpg'),
  },
  {
    slug: 'injection',
    title: 'Injection waterproofing',
    short: 'Cracks and joints sealed from inside the concrete.',
    text: 'Expert injection waterproofing seals cracks and joints in concrete structures and stops water seepage at the source.',
    image: img('injection-waterproofing.jpg'),
  },
  {
    slug: 'pile-head',
    title: 'Pile head treatment',
    short: 'Foundation junctions protected against groundwater.',
    text: 'Pile head treatment waterproofing gives complete protection at foundation junctions against groundwater penetration.',
    image: img('pile-head.jpg'),
  },
];

export const services = [
  { title: 'Waterproofing services', icon: Droplets, text: 'Our core specialisation: SBS membrane, wet area, injection, combo and pile head systems.', featured: true },
  { title: 'Tiling works', icon: Grid3x3, text: 'Floor and wall tiling laid true, level and properly sealed.' },
  { title: 'Painting services', icon: Paintbrush, text: 'Interior and exterior painting with surface preparation done right.' },
  { title: 'Interior services', icon: Sofa, text: 'Fit-out and interior works for homes, offices and retail.' },
  { title: 'Flooring solutions', icon: Layers, text: 'Durable flooring systems chosen for how the space is used.' },
  { title: 'Electromechanical services', icon: Cpu, text: 'Coordinated electrical and mechanical installation and maintenance.' },
  { title: 'HVAC systems', icon: Fan, text: 'Air-conditioning and ventilation installation and servicing.' },
  { title: 'Wallpaper fixing', icon: Wallpaper, text: 'Clean, seamless wallpaper installation on prepared walls.' },
  { title: 'Electrical fittings & fixtures', icon: PlugZap, text: 'Lighting, sockets, switches and fixtures installed safely.' },
  { title: 'Plumbing & sanitary installation', icon: ShowerHead, text: 'Water supply, drainage and sanitary ware installed and tested.' },
  { title: 'False ceiling & partitions', icon: PanelsTopLeft, text: 'Gypsum ceilings and partition walls that reshape a space.' },
  { title: 'Plaster works', icon: Hammer, text: 'Smooth, even plastering ready for paint or finish.' },
  { title: 'Swimming pool installation', icon: Waves, text: 'Pool construction with the waterproofing it depends on.' },
];

export const reasons = [
  { title: 'Quality materials', icon: ShieldCheck, text: 'We use only high-grade materials, because a waterproofing system is only as good as what goes into it.' },
  { title: 'Expert team', icon: HardHat, text: 'Experienced people from the office to the site, who take care over every detail of the work.' },
  { title: 'Reasonable cost', icon: BadgePercent, text: 'We find ways to reduce cost and energy use while keeping prices fair for clients across Dubai.' },
  { title: 'Safe and secure', icon: Lock, text: 'Work delivered by safe, competent hands, following site safety standards at every stage.' },
  { title: 'Customer satisfaction', icon: Smile, text: 'Your satisfaction is our first priority, and we aim to exceed expectations on every project.' },
  { title: 'Timely delivery', icon: Clock, text: 'We plan realistically and finish on schedule, because we know delays cost you money.' },
];

export const projects = [
  {
    id: 'wadi-al-safa',
    title: 'Substructure waterproofing for a residential building',
    location: 'Wadi Al Safa 5, Dubai',
    categories: ['Waterproofing', 'Villas', 'Technical Services'],
    scope: 'Substructure waterproofing works (Basements 1, 2 and 3)',
    system: 'RHEOSEAL FBW fully bonded waterproofing membrane',
    contractor: 'M/S Strongwalls Construction LLC',
    challenge:
      'Waterproofing a three-level basement for a residential building in Wadi Al Safa, where high groundwater threatened the integrity of the concrete foundations.',
    solution:
      'Meticulous surface preparation, then a high-performance RHEOSEAL FBW fully bonded membrane, pile head sealing and multi-injection hoses to protect the structure against water pressure.',
    images: [projectImg('Wadi Al Safa/Wadi Al Safa project.jpeg'), img('carousel22.jpeg'), img('pile-head.jpg')],
  },
  {
    id: 'jabal-ali',
    title: 'Substructure waterproofing for a residential development',
    location: 'Jabal Ali First, Dubai',
    categories: ['Waterproofing', 'Villas', 'Commercial', 'Technical Services'],
    scope: 'Substructure waterproofing and pile head treatment',
    system: 'Double-layer 4 mm SBS membrane and cementitious grout barrier',
    contractor: 'Main contractor / residential developer',
    challenge:
      'A deep foundation in Jabal Ali First, where high groundwater and corrosive soil chemicals threatened the concrete and its steel reinforcement.',
    solution:
      'Dewatering and surface preparation, then a double-layer 4 mm SBS modified bituminous tanking system, pile head sealing and heavy-duty protection boards against water pressure and chemical attack.',
    images: [projectImg('Jabal Ali project/Jabal Ali project.jpeg'), img('carousel23.jpeg'), img('sbs-membrane.jpg')],
  },
  {
    id: 'dubai-island',
    title: 'Substructure waterproofing and pile head treatment',
    location: 'Nakhlat Deira 101, Dubai Island',
    categories: ['Waterproofing', 'Commercial', 'Technical Services'],
    scope: 'Substructure waterproofing works and pile head treatment',
    system: 'SBS membrane and pile head treatment grout system',
    contractor: 'M/S Jaseera Building Contracting LLC',
    challenge:
      'Comprehensive substructure waterproofing and precise pile head treatment for a G+2P+Residential building on Dubai Island, with no margin for water ingress.',
    solution:
      'Rigorous surface preparation, an SBS modified bituminous tanking system, and high-strength Rheocrete MC non-shrink grout at the pile heads for a watertight foundation.',
    images: [projectImg('Dubai Island/WhatsApp Image 2026-07-23 at 10.05.55.jpeg'), img('carousel24.jpeg'), img('combo-waterproofing.jpg')],
  },
];

export const projectFilters = ['All', 'Waterproofing', 'Technical Services', 'Villas', 'Commercial'];

export const process = [
  { title: 'Site inspection', text: 'We visit, find the source of the problem and measure the area.' },
  { title: 'Written quotation', text: 'A clear scope, the system we recommend and a fixed price.' },
  { title: 'Surface preparation', text: 'Cleaning, repairs and priming. Most failures start here, so we take our time.' },
  { title: 'Application', text: 'The system is installed by our own trained team, layer by layer.' },
  { title: 'Testing and handover', text: 'Flood tests where applicable, then a clean handover.' },
];

export const about = {
  mission: [
    'To provide dependable, high-quality technical services through skilled workmanship, efficient project execution, and practical engineering solutions that meet client expectations, project specifications and industry standards.',
    'We are committed to continuous improvement, professional integrity, safety, and cost-effective solutions without compromising quality.',
  ],
  vision: [
    'To become a trusted name in waterproofing and technical contracting across the U.A.E. and international markets by consistently delivering quality workmanship, reliable service and sustainable solutions.',
    'Our vision is built on long-term client relationships, technical excellence, innovation and continuous growth within the construction industry.',
  ],
  chairman: [
    'At Optima Star Technical Services L.L.C., professionalism remains the foundation of our company. We believe that trust, commitment and consistency are essential to building strong relationships with our clients, partners and employees.',
    'The construction industry continues to evolve rapidly, requiring companies to adapt to changing technologies, project demands and quality expectations. Our focus is to continuously strengthen our capabilities, improve our services and maintain the standards required to deliver successful projects.',
    'Through dedication, technical expertise and a commitment to quality, we aim to contribute meaningfully to the growth of the construction sector while building a company known for reliability, integrity and professional execution.',
  ],
};
