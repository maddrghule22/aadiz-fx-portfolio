import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';
import Client from '../models/Client';
import Service from '../models/Service';
import cache from '../config/cache';
import { clearCache } from '../middleware/cache.middleware';

// Testimonial controllers
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cacheKey = 'all_testimonials';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true
      });
    }

    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    
    // Cache the result for 10 minutes
    cache.set(cacheKey, testimonials, 10 * 60 * 1000);
    
    return res.status(200).json({
      success: true,
      data: testimonials,
      fromCache: false
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = new Testimonial(req.body);
    const savedTestimonial = await testimonial.save();

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: savedTestimonial
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Client controllers
export const getAllClients = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cacheKey = 'all_clients';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true
      });
    }

    const clients = await Client.find().sort({ createdAt: -1 });
    
    // Cache the result for 15 minutes
    cache.set(cacheKey, clients, 15 * 60 * 1000);
    
    return res.status(200).json({
      success: true,
      data: clients,
      fromCache: false
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = new Client(req.body);
    const savedClient = await client.save();

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: savedClient
    });
  } catch (error) {
    console.error('Error creating client:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      data: client
    });
  } catch (error) {
    console.error('Error updating client:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Service controllers
export const getAllServices = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cacheKey = 'all_services';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true
      });
    }

    const services = await Service.find().sort({ createdAt: -1 });
    
    // Cache the result for 15 minutes
    cache.set(cacheKey, services, 15 * 60 * 1000);
    
    return res.status(200).json({
      success: true,
      data: services,
      fromCache: false
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: savedService
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};