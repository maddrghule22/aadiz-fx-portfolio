import { Project, Testimonial, Client, Service, Tool, SocialLink } from '@/types';

// Sample Projects Data
export const projects: Project[] = [
  {
    id: 'bmw-x1-commercial',
    title: 'BMW X1 Commercial',
    description: 'High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements. This project won the Best Automotive Commercial Award at the 2024 Global Cinematography Awards.',
    category: 'commercial',
    client: 'BMW',
    role: ['Director', 'Editor', 'Cinematographer'],
    videoUrl: '/videos/bmw-x1.mp4',
    thumbnailUrl: '/images/projects/bmw-x1-thumbnail.jpg',
    beforeAfter: {
      before: '/images/before-after/bmw-before.svg',
      after: '/images/before-after/bmw-after.svg'
    },
    images: [
      '/images/behind-the-scenes/bts-1.svg',
      '/images/behind-the-scenes/bts-2.svg',
      '/images/behind-the-scenes/bts-3.svg'
    ],
    tags: ['Automotive', 'Commercial', 'Cinematography', 'Luxury', 'Award Winner'],
    year: 2024,
    featured: true,
    duration: '1:30'
  },
  {
    id: 'ducati-xdiavel',
    title: 'Ducati Xdiavel Showcase',
    description: 'Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots. The commercial resulted in a 35% increase in showroom visits and was featured in multiple automotive magazines.',
    category: 'commercial',
    client: 'Ducati',
    role: ['Director', 'Editor', 'VFX Artist'],
    videoUrl: '/videos/ducati-xdiavel.mp4',
    thumbnailUrl: '/images/projects/ducati-thumbnail.jpg',
    beforeAfter: {
      before: '/images/before-after/bmw-before.svg',
      after: '/images/before-after/bmw-after.svg'
    },
    tags: ['Motorcycle', 'Commercial', 'Dynamic', 'Performance', 'VFX'],
    year: 2024,
    featured: true,
    duration: '0:45'
  },
  {
    id: 'fashion-edit',
    title: 'Fashion Editorial',
    description: 'Stylish fashion video featuring contemporary fashion with artistic cinematography and advanced color grading. This project was featured in Vogue India and received over 2 million views across social platforms.',
    category: 'commercial',
    client: 'Fashion Brand',
    role: ['Director', 'Editor', 'Colorist'],
    videoUrl: '/videos/fashion-edit.mp4',
    thumbnailUrl: '/images/projects/fashion-thumbnail.jpg',
    tags: ['Fashion', 'Editorial', 'Style', 'Color Grading', 'Social Media'],
    year: 2024,
    featured: true,
    duration: '2:00'
  },
  {
    id: 'fortuner-commercial',
    title: 'Toyota Fortuner Campaign',
    description: 'Rugged SUV commercial highlighting the Toyota Fortuner\'s capabilities with adventure-focused storytelling. The campaign increased brand engagement by 40% and won the Best Adventure Commercial Award.',
    category: 'commercial',
    client: 'Toyota',
    role: ['Director', 'Editor', 'Cinematographer'],
    videoUrl: '/videos/fortuner.mp4',
    thumbnailUrl: '/images/projects/fortuner-thumbnail.jpg',
    tags: ['Automotive', 'SUV', 'Adventure', 'Commercial', 'Award Winner'],
    year: 2024,
    featured: false,
    duration: '1:45'
  },
  {
    id: 'ktm-showcase',
    title: 'KTM Performance Video',
    description: 'High-energy motorcycle showcase featuring KTM bikes with fast-paced editing and dynamic angles. This video went viral with over 5 million views and significantly boosted KTM\'s social media following.',
    category: 'commercial',
    client: 'KTM',
    role: ['Director', 'Editor', 'VFX Artist'],
    videoUrl: '/videos/ktm-2.mp4',
    thumbnailUrl: '/images/projects/ktm-thumbnail.jpg',
    tags: ['Motorcycle', 'Performance', 'Action', 'Energy', 'Viral'],
    year: 2024,
    featured: false,
    duration: '1:20'
  },
  {
    id: 'yamaha-fz',
    title: 'Yamaha FZ Promotional',
    description: 'Sleek promotional video for Yamaha FZ featuring urban environments and modern cinematography. The campaign resulted in a 25% increase in sales inquiries and was praised for its innovative visual storytelling.',
    category: 'commercial',
    client: 'Yamaha',
    role: ['Director', 'Editor', 'Cinematographer'],
    videoUrl: '/videos/yamaha-fz.mp4',
    thumbnailUrl: '/images/projects/yamaha-thumbnail.jpg',
    tags: ['Motorcycle', 'Urban', 'Modern', 'Promotional', 'Sales'],
    year: 2024,
    featured: false,
    duration: '1:10'
  },
  {
    id: 'zen-creative',
    title: 'Zen Creative Project',
    description: 'Artistic and meditative video project exploring themes of balance and tranquility through visual storytelling. This experimental piece was featured in multiple film festivals and received critical acclaim for its innovative approach.',
    category: 'short-film',
    role: ['Director', 'Editor', 'Colorist'],
    videoUrl: '/videos/zen.mp4',
    thumbnailUrl: '/images/projects/zen-thumbnail.jpg',
    tags: ['Artistic', 'Creative', 'Meditation', 'Visual Story', 'Experimental'],
    year: 2024,
    featured: true,
    duration: '2:30'
  }
];

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Rajesh Sharma',
    company: 'BMW India',
    role: 'Marketing Director',
    content: 'Working with Aadiz.FX was extraordinary. They brought our BMW X1 campaign to life with stunning visuals and impeccable attention to detail. The commercial exceeded all expectations and resulted in a 45% increase in showroom visits. Their professionalism and creative vision made the entire process seamless.',
    rating: 5,
    avatar: '/images/testimonials/rajesh-sharma.svg'
  },
  {
    id: 'testimonial-2',
    name: 'Priya Patel',
    company: 'Fashion Brand Studio',
    role: 'Creative Director',
    content: 'The creative vision and technical expertise delivered exceeded all our expectations. The fashion editorial was absolutely breathtaking and received over 2 million views across our social platforms. Aadiz.FX understood our brand aesthetic perfectly and translated it into compelling visual content.',
    rating: 5,
    avatar: '/images/testimonials/priya-patel.svg'
  },
  {
    id: 'testimonial-3',
    name: 'Arjun Singh',
    company: 'Ducati India',
    role: 'Brand Manager',
    content: 'Professional, creative, and incredibly talented. They transformed our motorcycle showcase into a visual masterpiece that resonated with our audience. The commercial went viral and significantly boosted our brand engagement. We\'ve already booked them for our next campaign.',
    rating: 5,
    avatar: '/images/testimonials/arjun-singh.svg'
  }
];

// Clients Data
export const clients: Client[] = [
  { id: 'bmw', name: 'BMW', logo: '/images/clients/bmw.svg', website: 'https://bmw.in' },
  { id: 'ducati', name: 'Ducati', logo: '/images/clients/ducati.svg', website: 'https://ducati.com' },
  { id: 'toyota', name: 'Toyota', logo: '/images/clients/toyota.svg', website: 'https://toyota.co.in' },
  { id: 'ktm', name: 'KTM', logo: '/images/clients/ktm.svg', website: 'https://ktm.com' },
  { id: 'yamaha', name: 'Yamaha', logo: '/images/clients/yamaha.svg', website: 'https://yamaha-motor.co.in' },
  { id: 'audi', name: 'Audi', logo: '/images/clients/audi.svg', website: 'https://audi.com' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/images/clients/mercedes.svg', website: 'https://mercedes-benz.com' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/images/clients/lamborghini.svg', website: 'https://lamborghini.com' },
  { id: 'fashion-brand', name: 'Fashion Studio', logo: '/images/clients/fashion.svg', website: '#' }
];

// Services Data
export const services: Service[] = [
  {
    id: 'pre-production',
    title: 'Pre-Production',
    description: 'Concept development, storyboarding, and creative planning to establish the foundation of your project. Includes scriptwriting, location scouting, and talent coordination.',
    icon: 'film',
    features: ['Concept Development', 'Storyboarding', 'Shot Planning', 'Creative Consultation', 'Scriptwriting', 'Location Scouting'],
    tier: 'pre-production'
  },
  {
    id: 'production',
    title: 'Production',
    description: 'Professional filming with state-of-the-art equipment and experienced crew to capture your vision. Includes cinematography, lighting design, and audio recording.',
    icon: 'camera',
    features: ['Cinematography', 'Direction', 'Lighting Design', 'Audio Recording', 'Drone Footage', 'Stabilization Systems'],
    tier: 'production'
  },
  {
    id: 'post-production',
    title: 'Post-Production',
    description: 'Expert editing, color grading, and audio mixing to polish your project to perfection. Includes motion graphics and basic visual effects.',
    icon: 'edit',
    features: ['Video Editing', 'Color Grading', 'Audio Mixing', 'Motion Graphics', 'Basic VFX', 'Sound Design'],
    tier: 'post-production'
  },
  {
    id: 'vfx',
    title: 'VFX & Animation',
    description: 'Cutting-edge visual effects and 3D animation to bring impossible visions to life. Includes compositing, motion tracking, and digital matte painting.',
    icon: 'zap',
    features: ['3D Animation', 'Compositing', 'Motion Tracking', 'Digital Matte Painting', 'Particle Effects', 'Advanced Compositing'],
    tier: 'vfx'
  }
];

// Tools Data
export const tools: Tool[] = [
  { id: 'premiere', name: 'Adobe Premiere Pro', icon: '/icons/premiere.svg', category: 'editing', proficiency: 'expert' },
  { id: 'after-effects', name: 'After Effects', icon: '/icons/after-effects.svg', category: 'vfx', proficiency: 'expert' },
  { id: 'davinci', name: 'DaVinci Resolve', icon: '/icons/davinci.svg', category: 'color', proficiency: 'expert' },
  { id: 'cinema4d', name: 'Cinema 4D', icon: '/icons/cinema4d.svg', category: 'vfx', proficiency: 'advanced' },
  { id: 'blender', name: 'Blender', icon: '/icons/blender.svg', category: 'vfx', proficiency: 'advanced' },
  { id: 'photoshop', name: 'Photoshop', icon: '/icons/photoshop.svg', category: 'editing', proficiency: 'expert' },
  { id: 'audition', name: 'Adobe Audition', icon: '/icons/audition.svg', category: 'audio', proficiency: 'expert' },
  { id: 'fusion', name: 'Blackmagic Fusion', icon: '/icons/fusion.svg', category: 'vfx', proficiency: 'advanced' }
];

// Social Links
export const socialLinks: SocialLink[] = [
  { platform: 'Vimeo', url: 'https://vimeo.com/adityashinde', icon: 'vimeo' },
  { platform: 'Behance', url: 'https://behance.net/adityashinde', icon: 'behance' },
  { platform: 'Instagram', url: 'https://instagram.com/adityashinde', icon: 'instagram' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/adityashinde', icon: 'linkedin' },
  { platform: 'Careers', url: '/careers', icon: 'briefcase' }
];

// Site Metadata
export const siteMetadata = {
  title: 'Aadiz.FX - Professional Videographer & VFX Artist | Pirangut, Pune',
  description: 'Professional videographer and VFX artist from Pirangut, Pune, creating stunning automotive commercials, fashion editorials, and creative visual content for brands like BMW, Ducati, Toyota, KTM, and Yamaha.',
  keywords: ['videographer pune', 'VFX artist', 'automotive commercial', 'fashion video', 'BMW commercial', 'Ducati video', 'video editing pune', 'cinematography', 'post-production'],
  author: 'Aadiz.FX',
  siteUrl: 'https://aadiz.fx',
  ogImage: '/images/og-image.jpg'
};
