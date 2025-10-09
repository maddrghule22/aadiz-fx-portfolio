// Note: We're not importing data directly anymore to avoid circular dependencies
// The data is now only used as fallback in the apiCallWithFallback function

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to handle API calls with fallback
const apiCallWithFallback = async <T>(apiCall: () => Promise<T>, fallbackData: T): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn('API call failed, using fallback data:', error);
    return fallbackData;
  }
};

export const fetchProjects = async () => {
  return apiCallWithFallback(
    async () => {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    },
    [
      {
        id: 'bmw-x1-commercial',
        title: "BMW X1 Commercial",
        category: "Automotive",
        description: "High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements.",
        videoUrl: "/videos/bmw-x1.mp4",
        thumbnailUrl: "/images/projects/BMW.jpeg",
        year: 2024
      },
      {
        id: 'ducati-xdiavel',
        title: "Ducati Xdiavel Showcase",
        category: "Motorcycle",
        description: "Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.",
        videoUrl: "/videos/ducati-xdiavel.mp4",
        thumbnailUrl: "/images/projects/Ducati.jpeg",
        year: 2024
      },
      {
        id: 'fashion-editorial',
        title: "Fashion Editorial",
        category: "Fashion",
        description: "Stylish fashion video featuring contemporary fashion with artistic cinematography and advanced color grading.",
        videoUrl: "/videos/fashion-edit.mp4",
        thumbnailUrl: "/images/projects/Fashion studio.jpeg",
        year: 2024
      },
      {
        id: 'toyota-fortuner',
        title: "Toyota Fortuner Campaign",
        category: "Automotive",
        description: "Rugged SUV commercial highlighting the Toyota Fortuner's capabilities with adventure-focused storytelling.",
        videoUrl: "/videos/fortuner.mp4",
        thumbnailUrl: "/images/projects/toyato.jpeg",
        year: 2023
      },
      {
        id: 'ktm-performance',
        title: "KTM Performance Video",
        category: "Motorcycle",
        description: "High-energy motorcycle showcase featuring KTM bikes with fast-paced editing and dynamic angles.",
        videoUrl: "/videos/ktm-2.mp4",
        thumbnailUrl: "/images/projects/KTM.png",
        year: 2023
      },
      {
        id: 'zen-creative',
        title: "Zen Creative Project",
        category: "Experimental",
        description: "Artistic and meditative video project exploring themes of balance and tranquility through visual storytelling.",
        videoUrl: "/videos/zen.mp4",
        thumbnailUrl: "/images/projects/zen-thumbnail.jpg",
        year: 2022
      }
    ] // Fallback data
  );
};

export const fetchFeaturedProjects = async () => {
  return apiCallWithFallback(
    async () => {
      const response = await fetch(`${API_BASE_URL}/projects/featured`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    },
    [
      {
        id: 'bmw-x1-commercial',
        title: "BMW X1 Commercial",
        category: "Automotive",
        description: "High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements.",
        videoUrl: "/videos/bmw-x1.mp4",
        thumbnailUrl: "/images/projects/BMW.jpeg",
        year: 2024
      },
      {
        id: 'ducati-xdiavel',
        title: "Ducati Xdiavel Showcase",
        category: "Motorcycle",
        description: "Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.",
        videoUrl: "/videos/ducati-xdiavel.mp4",
        thumbnailUrl: "/images/projects/Ducati.jpeg",
        year: 2024
      },
      {
        id: 'ktm-performance',
        title: "KTM Performance Video",
        category: "Motorcycle",
        description: "High-energy motorcycle showcase featuring KTM bikes with fast-paced editing and dynamic angles.",
        videoUrl: "/videos/ktm-2.mp4",
        thumbnailUrl: "/images/projects/KTM.png",
        year: 2023
      }
    ] // Fallback data
  );
};

export const fetchTestimonials = async () => {
  return apiCallWithFallback(
    async () => {
      const response = await fetch(`${API_BASE_URL}/data/testimonials`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    },
    [
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
    ] // Fallback data
  );
};

export const fetchClients = async () => {
  return apiCallWithFallback(
    async () => {
      const response = await fetch(`${API_BASE_URL}/data/clients`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    },
    [
      { id: 'bmw', name: 'BMW', logo: '/images/projects/BMW.jpeg', website: 'https://bmw.in' },
      { id: 'ducati', name: 'Ducati', logo: '/images/projects/Ducati.jpeg', website: 'https://ducati.com' },
      { id: 'toyota', name: 'Toyota', logo: '/images/projects/toyato.jpeg', website: 'https://toyota.co.in' },
      { id: 'ktm', name: 'KTM', logo: '/images/projects/KTM.png', website: 'https://ktm.com' },
      { id: 'yamaha', name: 'Yamaha', logo: '/images/projects/yamaha.jpeg', website: 'https://yamaha-motor.co.in' },
      { id: 'audi', name: 'Audi', logo: '/images/projects/Audi.jpeg', website: 'https://audi.com' },
      { id: 'mercedes', name: 'Mercedes-Benz', logo: '/images/projects/Mercedes-Benz.jpeg', website: 'https://mercedes-benz.com' },
      { id: 'lamborghini', name: 'Lamborghini', logo: '/images/projects/Lamborghini.png', website: 'https://lamborghini.com' },
      { id: 'fashion-brand', name: 'Fashion Studio', logo: '/images/projects/Fashion studio.jpeg', website: '#' }
    ] // Fallback data
  );
};

export const fetchServices = async () => {
  return apiCallWithFallback(
    async () => {
      const response = await fetch(`${API_BASE_URL}/data/services`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    },
    [
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
    ] // Fallback data
  );
};

export const submitContactForm = async (formData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
};