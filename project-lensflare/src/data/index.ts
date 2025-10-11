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
    videoUrl: '/videos/bmw-m-series.mp4',
    thumbnailUrl: '/images/projects/BMW.jpeg',
    beforeAfter: {
      before: '/images/before-after/bmw-before.jpg',
      after: '/images/before-after/bmw-after.jpg'
    },
    images: [
      '/images/behind-the-scenes/bts-1.jpg',
      '/images/behind-the-scenes/bts-2.jpg',
      '/images/behind-the-scenes/bts-3.jpg'
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
    thumbnailUrl: '/images/projects/Ducati.jpeg',
    beforeAfter: {
      before: '/images/projects/ducati-1.jpg',
      after: '/images/projects/ducati-2.jpg'
    },
    images: [
      '/images/projects/bts-1.jpg',
      '/images/projects/bts-2.jpg',
      '/images/projects/bts-3.jpg'
    ],
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
    thumbnailUrl: '/images/projects/Fashion studio.jpeg',
    beforeAfter: {
      before: '/images/projects/Fashion studio.jpeg',
      after: '/images/projects/fashion-thumbnail.jpg'
    },
    images: [
      '/images/projects/bts-1.jpg',
      '/images/projects/bts-2.jpg',
      '/images/projects/bts-3.jpg'
    ],
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
    videoUrl: '/videos/toyota-hybrid.mp4',
    thumbnailUrl: '/images/projects/toyato.jpeg',
    beforeAfter: {
      before: '/images/projects/toyota-before.jpg',
      after: '/images/projects/toyota-after.jpg'
    },
    images: [
      '/images/projects/bts-1.jpg',
      '/images/projects/bts-2.jpg',
      '/images/projects/bts-3.jpg'
    ],
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
    thumbnailUrl: '/images/projects/KTM.png',
    beforeAfter: {
      before: '/images/projects/ktm-thumbnail.jpg',
      after: '/images/projects/KTM.png'
    },
    images: [
      '/images/projects/bts-1.jpg',
      '/images/projects/bts-2.jpg',
      '/images/projects/bts-3.jpg'
    ],
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
    thumbnailUrl: '/images/projects/yamaha.jpeg',
    beforeAfter: {
      before: '/images/projects/yamaha.jpeg',
      after: '/images/projects/yamaha-thumbnail.jpg'
    },
    images: [
      '/images/projects/bts-1.jpg',
      '/images/projects/bts-2.jpg',
      '/images/projects/bts-3.jpg'
    ],
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
    beforeAfter: {
      before: '/images/projects/zen-thumbnail.jpg',
      after: '/images/projects/zen-thumbnail.jpg'
    },
    images: [
      '/images/projects/bts-1.jpg',
      '/images/projects/bts-2.jpg',
      '/images/projects/bts-3.jpg'
    ],
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
    name: 'Michael Rodriguez',
    company: 'Zürich Automotive',
    role: 'CEO',
    content: 'Working with Aditya Shinde was a transformative experience for our luxury car brand. The cinematic commercial they created for our latest model launch captured the essence of Swiss precision and automotive excellence perfectly. The attention to detail and visual storytelling elevated our brand perception significantly. We saw a 60% increase in premium model inquiries after the campaign launch.',
    rating: 5,
    avatar: '/images/testimonials/zurich-automotive.jpg'
  },
  {
    id: 'testimonial-2',
    name: 'Sarah Johnson',
    company: 'Force Luxury Cars',
    role: 'Marketing Director',
    content: 'The collaboration with Aditya on our flagship vehicle campaign was exceptional. Their ability to blend luxury aesthetics with automotive performance in the visuals was unmatched. The commercial not only met but exceeded our expectations, resulting in record-breaking engagement across all our digital platforms. The cinematography and post-production work were truly world-class.',
    rating: 5,
    avatar: '/images/testimonials/force-luxury-cars.jpg'
  },
  {
    id: 'testimonial-3',
    name: 'David Chen',
    company: 'Ceramic Pro',
    role: 'Regional Manager',
    content: 'Aditya\'s expertise in creating compelling visual content for our protective coating services has been invaluable. The before/after showcase videos they produced clearly demonstrated the effectiveness of our products, leading to a 45% increase in conversion rates. Their understanding of our technical products and ability to translate them into engaging visual stories is remarkable.',
    rating: 5,
    avatar: '/images/testimonials/ceramic-pro.jpg'
  }
];

// Clients Data
export const clients: Client[] = [
  { id: 'bmw', name: 'BMW', logo: '/images/projects/BMW.jpeg', website: 'https://bmw.in' },
  { id: 'ducati', name: 'Ducati', logo: '/images/projects/Ducati.jpeg', website: 'https://ducati.com' },
  { id: 'toyota', name: 'Toyota', logo: '/images/projects/toyato.jpeg', website: 'https://toyota.co.in' },
  { id: 'ktm', name: 'KTM', logo: '/images/projects/KTM.png', website: 'https://ktm.com' },
  { id: 'yamaha', name: 'Yamaha', logo: '/images/projects/yamaha.jpeg', website: 'https://yamaha-motor.co.in' },
  { id: 'audi', name: 'Audi', logo: '/images/projects/Audi.jpeg', website: 'https://audi.com' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/images/projects/Mercedes-Benz.jpeg', website: 'https://mercedes-benz.com' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/images/projects/Lamborghini.png', website: 'https://lamborghini.com' },
  { id: 'fashion-brand', name: 'Fashion Studio', logo: '/images/projects/Fashion studio.jpeg', website: '#' }
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
  { platform: 'Instagram', url: 'https://www.instagram.com/aadiz.fx/', icon: 'instagram' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/adityashinde', icon: 'linkedin' },
  { platform: 'Careers', url: '/careers', icon: 'briefcase' }
];

// Site Metadata
export const siteMetadata = {
  title: 'Aadiz.FX - Professional Videographer & VFX Artist | Pune',
  description: 'Professional videographer and VFX artist from Pune, creating stunning automotive commercials, fashion editorials, and creative visual content for brands like BMW, Ducati, Toyota, KTM, and Yamaha.',
  keywords: ['videographer pune', 'VFX artist', 'automotive commercial', 'fashion video', 'BMW commercial', 'Ducati video', 'video editing pune', 'cinematography', 'post-production'],
  author: 'Aadiz.FX',
  siteUrl: 'https://aadiz.fx',
  ogImage: '/images/og-image.jpg'
};
