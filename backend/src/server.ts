import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import connectDB from './config/db';
import { performanceMonitor, responseTimeHeader } from './middleware/performance.middleware';

import contactRoutes from './routes/contact.routes';
import projectRoutes from './routes/project.routes';
import authRoutes from './routes/auth.routes';
import dataRoutes from './routes/data.routes';
import uploadRoutes from './routes/upload.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002', 'http://127.0.0.1:3000', 'http://127.0.0.1:3002'],
  credentials: true
})); // Enable CORS with specific origins
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies
app.use(performanceMonitor); // Performance monitoring
app.use(responseTimeHeader); // Response time header

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbState = (mongoose as any).connection.readyState;
    const dbStatus = dbState === 1 ? 'Connected' : dbState === 2 ? 'Connecting' : dbState === 3 ? 'Disconnecting' : 'Disconnected';
    
    // Check cache status
    const cacheSize = require('./config/cache').default.size();
    
    res.status(200).json({ 
      status: 'OK', 
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        name: (mongoose as any).connection.name
      },
      cache: {
        size: cacheSize
      },
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: (error as Error).message
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;