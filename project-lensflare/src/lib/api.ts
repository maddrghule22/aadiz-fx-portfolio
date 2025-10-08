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
        thumbnailUrl: "/images/projects/bmw-x1-thumbnail.jpg",
        year: 2024
      },
      {
        id: 'ducati-xdiavel',
        title: "Ducati Xdiavel Showcase",
        category: "Motorcycle",
        description: "Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.",
        videoUrl: "/videos/ducati-xdiavel.mp4",
        thumbnailUrl: "/images/projects/ducati-thumbnail.jpg",
        year: 2024
      },
      {
        id: 'fashion-editorial',
        title: "Fashion Editorial",
        category: "Fashion",
        description: "Stylish fashion video featuring contemporary fashion with artistic cinematography and advanced color grading.",
        videoUrl: "/videos/fashion-edit.mp4",
        thumbnailUrl: "/images/projects/fashion-thumbnail.jpg",
        year: 2024
      },
      {
        id: 'toyota-fortuner',
        title: "Toyota Fortuner Campaign",
        category: "Automotive",
        description: "Rugged SUV commercial highlighting the Toyota Fortuner's capabilities with adventure-focused storytelling.",
        videoUrl: "/videos/fortuner.mp4",
        thumbnailUrl: "/images/projects/fortuner-thumbnail.jpg",
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
        thumbnailUrl: "/images/projects/bmw-x1-thumbnail.jpg",
        year: 2024
      },
      {
        id: 'ducati-xdiavel',
        title: "Ducati Xdiavel Showcase",
        category: "Motorcycle",
        description: "Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.",
        videoUrl: "/videos/ducati-xdiavel.mp4",
        thumbnailUrl: "/images/projects/ducati-thumbnail.jpg",
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
      { id: 'bmw', name: 'BMW', logo: '/images/clients/bmw.svg', website: 'https://bmw.in' },
      { id: 'ducati', name: 'Ducati', logo: '/images/clients/ducati.svg', website: 'https://ducati.com' },
      { id: 'toyota', name: 'Toyota', logo: '/images/clients/toyota.svg', website: 'https://toyota.co.in' },
      { id: 'ktm', name: 'KTM', logo: '/images/projects/KTM.png', website: 'https://ktm.com' },
      { id: 'yamaha', name: 'Yamaha', logo: '/images/clients/yamaha.svg', website: 'https://yamaha-motor.co.in' },
      { id: 'audi', name: 'Audi', logo: '/images/clients/audi.svg', website: 'https://audi.com' },
      { id: 'mercedes', name: 'Mercedes-Benz', logo: '/images/clients/mercedes.svg', website: 'https://mercedes-benz.com' },
      { id: 'lamborghini', name: 'Lamborghini', logo: '/images/clients/lamborghini.svg', website: 'https://lamborghini.com' },
      { id: 'fashion-brand', name: 'Fashion Studio', logo: '/images/clients/fashion.svg', website: '#' }
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