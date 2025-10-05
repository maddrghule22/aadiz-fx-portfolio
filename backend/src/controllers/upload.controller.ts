import { Request, Response } from 'express';
import { upload, uploadMultiple } from '../utils/fileUpload';
import path from 'path';

// Single file upload
export const uploadSingleFile = (req: Request, res: Response) => {
  upload.single('file')(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    });
  });
};

// Multiple file upload
export const uploadMultipleFiles = (req: Request, res: Response) => {
  uploadMultiple(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const files = (req.files as Express.Multer.File[]).map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: `/uploads/${file.filename}`
    }));

    return res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      data: files
    });
  });
};

// Serve uploaded files
export const serveFile = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../uploads', filename);
  
  return res.sendFile(filePath, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    // Return is handled by sendFile, but TypeScript needs assurance
    return res.status(200); // This line satisfies TypeScript but won't be reached
  });
};