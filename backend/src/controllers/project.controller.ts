import { Request, Response } from 'express';
import Project from '../models/Project';
import cache from '../config/cache';
import { clearCache } from '../middleware/cache.middleware';

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cacheKey = 'all_projects';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true
      });
    }

    const projects = await Project.find().sort({ year: -1, createdAt: -1 });
    
    // Cache the result for 5 minutes
    cache.set(cacheKey, projects, 5 * 60 * 1000);
    
    return res.status(200).json({
      success: true,
      data: projects,
      fromCache: false
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get featured projects
export const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    // Check cache first
    const cacheKey = 'featured_projects';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true
      });
    }

    const projects = await Project.find({ featured: true }).sort({ year: -1, createdAt: -1 });
    
    // Cache the result for 5 minutes
    cache.set(cacheKey, projects, 5 * 60 * 1000);
    
    return res.status(200).json({
      success: true,
      data: projects,
      fromCache: false
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get projects by category
export const getProjectsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ category }).sort({ year: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create a new project (admin only)
export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    
    // Check if project with this ID already exists
    const existingProject = await Project.findOne({ id: projectData.id });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project with this ID already exists'
      });
    }

    const project = new Project(projectData);
    const savedProject = await project.save();

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update a project (admin only)
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findOneAndUpdate({ id }, updateData, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete a project (admin only)
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findOneAndDelete({ id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Clear relevant caches
    clearCache(req, res, () => {});

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};