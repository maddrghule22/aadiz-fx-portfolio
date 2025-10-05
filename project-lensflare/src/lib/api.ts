const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  const data = await response.json();
  return data.data;
};

export const fetchFeaturedProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/featured`);
  const data = await response.json();
  return data.data;
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${API_BASE_URL}/data/testimonials`);
  const data = await response.json();
  return data.data;
};

export const fetchClients = async () => {
  const response = await fetch(`${API_BASE_URL}/data/clients`);
  const data = await response.json();
  return data.data;
};

export const fetchServices = async () => {
  const response = await fetch(`${API_BASE_URL}/data/services`);
  const data = await response.json();
  return data.data;
};

export const submitContactForm = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  const data = await response.json();
  return data;
};