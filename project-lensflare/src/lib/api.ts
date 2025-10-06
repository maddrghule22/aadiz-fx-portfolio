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
    [] // Empty array as fallback
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
    [] // Empty array as fallback
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
    [] // Empty array as fallback
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
    [] // Empty array as fallback
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
    [] // Empty array as fallback
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
};